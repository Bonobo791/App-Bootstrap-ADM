<script>
  let checking = $state(false);
  let status = $state('');

  async function checkServer() {
    checking = true;
    status = '';
    try {
      const response = await fetch('/healthz', { cache: 'no-store', signal: AbortSignal.timeout(5000) });
      if (!response.ok || (await response.text()).trim() !== 'ok') throw new Error('Health check failed');
      status = 'Server is ready.';
    } catch {
      status = 'Server is unavailable. Try again.';
    } finally {
      checking = false;
    }
  }
</script>

<svelte:head>
  <meta name="description" content="A starting point for your application." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
  <h1>App template</h1>
  <p>Replace this page with your application.</p>
  <button onclick={checkServer} disabled={checking}>{checking ? 'Checking…' : 'Check server'}</button>
  <p aria-live="polite">{status}</p>
  <noscript>Enable JavaScript to check the server.</noscript>
</main>

<style>
  :global(body) { margin: 0; font-family: system-ui, sans-serif; line-height: 1.5; }
  main { max-width: 48rem; margin: 4rem auto; padding: 0 1.5rem; }
  button { padding: .75rem 1rem; font: inherit; cursor: pointer; }
  button:disabled { cursor: wait; }
</style>
