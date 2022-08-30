<script lang="ts">
  import superjson from 'superjson';
  /* export let data: any[] */
   
  export let data;
  /* console.log(data.data) */
  /* let cars = [{"brand":"Volvo", "mileage":"123"},{"brand":"Honda", "mileage":"1234"},{"brand":"Audi", "mileage":"1235"}] */
</script>

<h1>Cars on this site</h1>
<p>TODO...</p>
<a href="/">Home</a>


<h1>Select a car</h1>
<ul>
  <!--
  -->
  {@debug data}
  {#each JSON.parse(data.cars) as d}
    <li>
      <h3>{d.brand}</h3>
      <p>{d.mileage}</p>
    </li>
  {/each}
</ul>
