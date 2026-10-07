import { json } from '@sveltejs/kit';

const commit = process.env.SOURCE_COMMIT || 'local';
if (commit !== 'local' && !/^[a-f0-9]{40}$/i.test(commit)) {
  throw new Error('SOURCE_COMMIT must be a full GitHub commit SHA or local');
}

export const prerender = true;
export const GET = () => json({ commit });
