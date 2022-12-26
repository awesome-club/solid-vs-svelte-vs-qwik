<script>
  import "../static/global.css";
	import Header from '$lib/Header.svelte';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>

<style lang="scss" scoped>
  main {
    margin: 0 auto;
    padding: 30px;
    background: #FFF;
    border-radius: 24px 24px 0 0;
    min-height: 90vh;
  }
</style>
