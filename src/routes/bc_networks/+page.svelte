<script>
  /* import { enhanceForm } from '$lib/actions/form' */

  export let data;
  const nData = JSON.parse(data.networks)

  /* console.log("nData", nData) */

  //Rebuild Data object from old structure to new
  function buildDataObject(nData){
      let network_list = [];
      let domain_list = [];
      nData.forEach(network => {
          let key = Object.keys(network)[0]

          // Reset lists on entry of new loop
          domain_list = []
          // Map key:value pairs to array for each entry
          Object.entries(network[key]).forEach(domain => {
            domain_list = [...domain_list, {"source_name":domain[0], "domain_name":domain[1]}] 
          })
         network_list = [...network_list,{"network_name":key, "domain_list":domain_list }]
      })
      /* console.log(network_list) */
      return network_list
  }

  /* let d1 = buildDataObject(nData) */
  /* console.log("d1", d1) */

	let people = [
		{ first: 'David', last: 'Nisch', company:"valnet", email:"david@valnet.com" },
		{ first: 'Hans', last: 'Emil', company:"braincore", email: "hans@braincore.com" },
		{ first: 'Max', last: 'Mustermann', company:"braincore",email:"max@braincore.com" },
		{ first: 'Roman', last: 'Tisch', company:"valnet", email:"roman@valnet.com" }
	];
  
   //Data in this structure
  /* let networks = [ */
    /* {name:"districtm", domains:[ */
      /* {key:"bornrich.com", value:"bornrich.com"}, */
      /* {key: "cbr.com", value:"cbr.com"}, */
      /* {key: "gamerant.com", value:"gamerant.com"} */
    /* ]}, */
  /* ]; */

  let networks = buildDataObject(nData);
  /* console.log(networks) */

	let network_prefix = '';
	let i = 0;

  let name = '';
  let domains = [];
    let new_source = '';
    let new_domain = '';
  let key = '';
  let value = '';

	$: filteredNetwork = network_prefix
		? networks.filter(network => {
			const name = network.network_name;
			return name.toLowerCase().includes(network_prefix.toLowerCase());
		})
		: networks;

	$: selected = filteredNetwork[i];
  $: reset_inputs(selected);

  //Create new 
	function create() {
    //Set network name to new one from network_name input area
    networks = networks.concat({ "network_name":name, "domain_list":[] });

    selected = filteredNetwork.at(-1)

		/* i = networks.length - 1; */
      /* console.log(i) */
		/* name = ''; */
	}

  // Add new_source, new_domain object to current selected domain list
  function addNewDomain(){

      let mapping = {"source_name":new_source , "domain_name":new_domain, domain_list:[]}
      let current_domains = selected.domain_list

      current_domains = [mapping,...current_domains]
      console.log(current_domains)

      selected.domain_list = current_domains;

      //reset input area
      new_source = '';
      new_domain = '';
  }

	function update() {
      console.log(selected.network_name)
      selected.network_name = name
	}

	function remove() {
		// Remove selected person from the source array (people), not the filtered array
		const index = networks.indexOf(selected);
		networks = [...networks.slice(0, index), ...networks.slice(index + 1)];

		first = last = '';
		i = Math.min(i, filteredNetwork.length - 2);
	}

	function reset_inputs(network) {
		name = network ? network.network_name : '';
    domains = network === undefined ? [] : network.domain_list; 
    /* domains = typeof name === "undefined" ? [] : network.domains; // if no values match (results in undefined), return [] else return network.domains_list */
	}

</script>

<div>
  <div class="row">

    <div class="column">
      <input placeholder="filter networks" bind:value={network_prefix} style="max-width:220px;">
      <select bind:value={i} size={12}>
        {#each filteredNetwork as network, i}
          <option value={i}>{network.network_name}</option>
        {/each}
      </select>



      <div class='buttons'>
        <label><i class="b">network_name</i> <input bind:value={name} placeholder="first"></label>
        <button on:click={create} disabled="{!name}">create</button>
        <button on:click={update} disabled="{!name || !selected}">update</button>
        <button on:click={remove} disabled="{!selected}">delete</button>
      </div>

      <div style="padding-top:25px;">
        <div style="margin-top:20px;">
          <label><i class="b">new_domain_mapping</i></label>
          <label><input bind:value={new_source} placeholder="new_source"></label>
          <label><input bind:value={new_domain} placeholder="new_domain"></label>
          <button on:click={addNewDomain} disabled="{!selected}">Add New</button>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="wrapper">
        {#if domains}
          {#each domains as domain}
            <div><i class=""></i> <input class="b" bind:value={domain.source_name}></div>
            <div><i class=""></i><input class="b" bind:value={domain.domain_name}></div>
          {/each}
        {/if}
      </div>
    </div>

  </div>
</div>
<style>

  input{
    border: 1px solid #dfdfdf;
  }
  .b{font-weight:bold;}

  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;

    height: 500px;
    overflow:auto;
  }

	* {
		font-family: inherit;
		font-size: inherit;
	}

  .row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}

	input {
		display: block;
		margin: 0 0 0.5em 0;
	}

	select {
		float: left;
		margin: 0 1em 1em 0;
		width: 14em;
	}

	.buttons {
		clear: both;
	}
</style>
