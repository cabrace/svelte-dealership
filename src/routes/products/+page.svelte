<script>
  import GridTile from '$lib/components/GridTile.svelte';
  import Alert from '$lib/components/Alert.svelte';

  let products = [
    {
      title: 'Mug',
      cost: '$10',
      src: 'https://cdn.shopify.com/s/files/1/0434/0285/4564/products/Cup-front-black.png?v=1623159405',
    },
    {
      title: 'Shirt',
      cost: '$20',
      src: 'https://cdn.shopify.com/s/files/1/0434/0285/4564/products/short-sleeve-t-shirt-0.png?v=1622902418',
    },
  ];

//   console.log(products)

  function updateCost() {
    products[0].cost = '$50'
  }
</script>

<main>
    <!-- <GridTile /> -->
    {#each products as product }
    <GridTile {product}  />
    {/each}
     <button on:click="{updateCost}" class="text-white bg-pink-500 p-2 my-4"> Change Price </button>

    <!-- {#each products as product (product.title)}
    <GridTile {product} />
    {/each} -->
</main>