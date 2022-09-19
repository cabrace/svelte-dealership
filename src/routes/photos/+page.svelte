<script lang="ts">
  export let data;
  let photos = data.photos
</script>

<h1>Photos</h1>
<div class="grid">
	{#each photos as photo}
		<a sveltekit:prefetch href="/photos/{photo.id}">
			<img src={photo.thumbnailUrl} alt={photo.title} />
		</a>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.4rem;
	}
</style>


