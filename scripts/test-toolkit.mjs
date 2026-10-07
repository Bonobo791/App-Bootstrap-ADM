import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(root, 'skills/app-bootstrap-adm/assets/app');
assert.ok(existsSync(source), 'Missing copyable app template');
const nodeDir = dirname(process.execPath);
const npm = ['../lib/node_modules/npm/bin/npm-cli.js', 'node_modules/npm/bin/npm-cli.js', '../share/nodejs/npm/bin/npm-cli.js']
  .map(path => join(nodeDir, path)).find(existsSync);
assert.ok(npm, 'Install npm alongside Node before running this check');
const app = mkdtempSync(join(tmpdir(), 'app-toolkit-'));
const env = { ...process.env, SOURCE_COMMIT: 'a'.repeat(40) };
let server;
let base;
async function waitForServer(attempts = 100) {
  assert.equal(server.exitCode, null, 'production server exited');
  if (base) {
    try {
      const response = await fetch(`${base}/healthz`, { signal: AbortSignal.timeout(1000) });
      if (response.ok && (await response.text()).trim() === 'ok') return;
    } catch {}
  }
  assert.ok(attempts > 1, 'production server did not become ready');
  await delay(100);
  return waitForServer(attempts - 1);
}
try {
  cpSync(source, app, { recursive: true });
  const page = join(app, 'src/routes/+page.svelte');
  writeFileSync(page, readFileSync(page, 'utf8').replace('Replace this page with your application.', 'Fresh application content.'));
  for (const args of [['ci', '--ignore-scripts', '--no-audit', '--no-fund'], ['run', 'check'], ['run', 'build']]) {
    const result = spawnSync(process.execPath, [npm, ...args], { cwd: app, env, stdio: 'inherit' });
    assert.equal(result.status, 0, `npm ${args.join(' ')} failed`);
  }
  server = spawn(process.execPath, ['build/index.js'], { cwd: app, env: { ...env, HOST: '127.0.0.1', PORT: '0', ORIGIN: 'https://example.com' }, stdio: ['ignore', 'pipe', 'inherit'] });
  let output = '';
  server.stdout.on('data', chunk => {
    process.stdout.write(chunk);
    output = (output + chunk).slice(-4096);
    const port = /127\.0\.0\.1:(\d+)/.exec(output)?.[1];
    if (port) base = `http://127.0.0.1:${port}`;
  });
  await waitForServer();
  const home = await fetch(base);
  assert.equal(home.status, 200);
  assert.match(home.headers.get('content-type'), /text\/html/);
  const html = await home.text();
  assert.match(html, /App template/);
  assert.match(html, /Fresh application content\./);
  assert.match(html, /noindex/);
  const script = /"([^"\r\n]*_app\/immutable\/entry\/start[^"\r\n]+\.js)"/.exec(html)?.[1];
  assert.ok(script, 'Missing client hydration script');
  const asset = await fetch(new URL(script, base));
  assert.equal(asset.status, 200);
  assert.match(asset.headers.get('content-type'), /javascript/);
  assert.equal((await fetch(`${base}/not-a-page`)).status, 404);
  const robots = await fetch(`${base}/robots.txt`);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Disallow: \//);
  const marker = await fetch(`${base}/build.json`);
  assert.equal(marker.status, 200);
  assert.equal((await marker.json()).commit, env.SOURCE_COMMIT);
  const health = await fetch(`${base}/healthz`);
  assert.match(health.headers.get('content-type'), /text\/plain/);
  console.log('Fresh app: install, check, build, standalone server, home, client asset, 404, health and source marker passed.');
} finally {
  if (server?.exitCode === null) {
    server.kill('SIGTERM');
    await new Promise(resolve => server.once('exit', resolve));
  }
  rmSync(app, { recursive: true, force: true });
}
