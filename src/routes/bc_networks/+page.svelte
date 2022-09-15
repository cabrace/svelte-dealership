<script>

  export let data;
  const nData = JSON.parse(data.networks)

  /* console.log("nData", nData) */

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
  
  let networks = [
    {name:"districtm", domains:[
      {key:"bornrich.com", value:"bornrich.com"},
      {key: "cbr.com", value:"cbr.com"},
      {key: "gamerant.com", value:"gamerant.com"}
    ]},
    {name:"indexExchange", domains:[
      {key:"bornrich.com key", value:"bornrich.com index_value"},
      {key: "cbr.com", value:"cbr.com"},
      {key: "gamerant.com", value:"gamerant.com"}
    ]},
    {name:"exco", domains:[
      {key:"bornrich.com", value:"bornrich.com exco"},
      {key: "cbr.com", value:"cbr.com"},
      {key: "gamerant.com", value:"gamerant.com"}
    ]}
  ];

  /* let networks = buildDataObject(nData); */
  /* console.log(networks) */

	let prefix = '';
	let first = '';
	let last = '';
  let company = ''
  let email = ''
	let i = 0;

  let name = '';
  let domains = [];
    let new_source = '';
    let new_domain = '';
  let key = '';
  let value = '';

	$: filteredNetwork = prefix
		? networks.filter(network => {
			const name = network.name;
			return name.toLowerCase().includes(prefix.toLowerCase());
		})
		: networks;

	$: selected = filteredNetwork[i];
  $: reset_inputs(selected);

	function create() {
		people = people.concat({ name });
		i = networks.length - 1;
      console.log(i)
		name = '';
	}

  function addNewDomain(){
    let new_mapping = {key:new_source,value:new_domain}
    console.log(selected, "new Domain added")
      selected.domains = [...selected.domains,new_mapping]
  }

	function update() {
		selected.first = first;
		selected.last = last;
		selected.company = company;
		selected.email = email;
		people = people;
	}

	function remove() {
		// Remove selected person from the source array (people), not the filtered array
		const index = people.indexOf(selected);
		people = [...people.slice(0, index), ...people.slice(index + 1)];

		first = last = '';
		i = Math.min(i, filteredNetwork.length - 2);
	}

	function reset_inputs(network) {
		name = network ? network.name : '';
    domains = network === undefined ? [] : network.domains; 
    /* domains = typeof name === "undefined" ? [] : network.domains; // if no values match (results in undefined), return [] else return network.domains_list */
	}

</script>

<div>
  <div class="row">

    <div class="column">
      <input placeholder="filter prefix" bind:value={prefix} style="max-width:220px;">
      <select bind:value={i} size={5}>
        {#each filteredNetwork as network, i}
          <option value={i}>{network.name}</option>
        {/each}
      </select>



      <div class='buttons'>
        <button on:click={create} disabled="{!name}">create</button>
        <button on:click={update} disabled="{!name || !selected}">update</button>
        <button on:click={remove} disabled="{!selected}">delete</button>
      </div>
    </div>

    <div class="column">
      <label><i class="b">network_name</i> <input bind:value={name} placeholder="first"></label>
        <label><input bind:value={new_source} placeholder="new_source"></label>
        <label> <input bind:value={new_domain} placeholder="new_domain"></label>
        <button on:click={addNewDomain} disabled="{!selected}">Add New</button>
      <div class="wrapper">
        {#if domains}
          {#each domains as domain}
            <div><i class="b">source_name</i> <input bind:value={domain.key}></div>
            <div><i class="b">domain_name</i><input bind:value={domain.value} class=""></div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
<style>

  .b{font-weight:bold;}

  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
