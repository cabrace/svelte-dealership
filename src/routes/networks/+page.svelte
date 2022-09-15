<script>

  /* import superjson from 'superjson'; */
  /* export let data: any[] */

   
  export let data;
  const nData = JSON.parse(data.networks)
  const networks = []
  
  // networks = {"id":{name:"districtm",domains:{{key:"key",value:"value"},...}},,..}


// Option 1 : change structire of data on front end
// Option 2 : work with what I have and leave front end code ugly
// Option 3 : Changing DB structure on Back-end side, cons - everyone has to change their code

// Need data in this structure 
  let networks2 = [
		{name:"districtm", domains:[
			{key:"bornrich.com", value:"bornrich.com"},
			{key: "cbr.com", value:"cbr.com"},
			{key: "gamerant.com", value:"gamerant.com"}
		]},
		{name:"indexExchange", domains:[
			{key:"bornrich.com", value:"bornrich.com"},
			{key: "cbr.com", value:"cbr.com"},
			{key: "gamerant.com", value:"gamerant.com"}
		]}
	];

  console.log(nData)

  //Get network keys from the array of Objects
  nData.forEach( n => { 
                //First key item is our key, because we specifically set 
                let key = Object.keys(n)[0]

                if(key !== undefined){
                  networks.push(key)
                }
              });

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


</script>

<a href="/">Home</a>

<h1> Restructured data call (Alternate) </h1>

<ul>
  {#each networks2 as network}
    <li>{networks2.name}</li>
    <ul>
      {#each network.domains as domain}
        <li>{domain.key} : {domain.value}</li>
      {/each}
     </ul>
  {/each}
</ul>

<h1>Network Data From MongoDB structure (Current)</h1>
  <ul>
    {#each nData as n}
        {@const key = Object.keys(n)[0]}
        {@const domain_list = n[key]}
        <!-- {console.log("Domain List Object", domain_list)} -->
      <li>
        <h3>{key}</h3>
          <ul>
            <!-- {console.log("Domain List Arrays", Object.entries(domain_list))} -->
            {#each Object.entries(domain_list) as [domain_key,domain_value]}
                {#if domain_key !== 'undefined' }
                  <li>{domain_key} : {domain_value}</li>
                {/if}
            {/each }
          </ul>
      </li>
    {/each}
  </ul>
