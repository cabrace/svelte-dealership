<script lang="ts">
  import { page } from '$app/stores';

  export let data; // Get exported routes

  console.log($page.params.id)
  let photo = data.photos[$page.params.id - 1]

  console.log(photo)
  console.log("[id]/+page.svelte")
</script>

<h1>Photo {$page.params.id}</h1>
<h2> <a href="/photos"> Back to Photos</a> </h2>
<div class="grid">
    <a sveltekit:prefetch href="/photos/{photo.id}">
      <img src={photo.thumbnailUrl} alt={photo.title} />
    </a>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.4rem;
	}
</style>


