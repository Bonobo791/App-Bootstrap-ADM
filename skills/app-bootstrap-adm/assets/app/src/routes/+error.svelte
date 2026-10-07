<script>
  import { page } from '$app/state';
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
  <h1>{page.status === 404 ? 'Page not found' : 'Something went wrong'}</h1>
  <p><a href="/">Return home</a></p>
</main>

<style>
  :global(body) { margin: 0; font-family: system-ui, sans-serif; line-height: 1.5; }
  main { max-width: 48rem; margin: 4rem auto; padding: 0 1.5rem; }
</style>
