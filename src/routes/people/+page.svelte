<!-- https://eugenkiss.github.io/7guis/tasks#crud -->

<script>
	let people = [
		{ first: 'David', last: 'Nisch', company:"valnet", email:"david@valnet.com" },
		{ first: 'Hans', last: 'Emil', company:"braincore", email: "hans@braincore.com" },
		{ first: 'Max', last: 'Mustermann', company:"braincore",email:"max@braincore.com" },
		{ first: 'Roman', last: 'Tisch', company:"valnet", email:"roman@valnet.com" }
	];
  
  let nData = [
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

	let prefix = '';
	let first = '';
	let last = '';
  let company = ''
  let email = ''
	let i = 0;

  let name = '';
  let domains ='';

	$: filteredPeople = prefix
		? people.filter(person => {
			const name = `${person.last}, ${person.first}`;
			return name.toLowerCase().includes(prefix.toLowerCase());
		})
		: people;


	$: selected = filteredPeople[i];

	$: reset_inputs(selected);

	function create() {
		people = people.concat({ first, last });
		i = people.length - 1;
      console.log(i)
		first = last = '';
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
		i = Math.min(i, filteredPeople.length - 2);
	}

	function reset_inputs(person) {
		first = person ? person.first : '';
		last = person ? person.last : '';
		company = person ? person.company : '';
		email = person ? person.email : '';
	}
</script>

<input placeholder="filter prefix" bind:value={prefix}>

<select bind:value={i} size={5}>
	{#each filteredPeople as person, i}
		<option value={i}>{person.last}, {person.first}</option>
	{/each}
</select>

<label><input bind:value={first} placeholder="first"></label>
<label><input bind:value={last} placeholder="last"></label>
<label><input bind:value={company} placeholder="company"></label>
<label><input bind:value={email} placeholder="email"></label>
<textarea bind:value={domains}></textarea>

<div class='buttons'>
	<button on:click={create} disabled="{!first || !last}">create</button>
	<button on:click={update} disabled="{!first || !last || !selected}">update</button>
	<button on:click={remove} disabled="{!selected}">delete</button>
</div>

<style>
	* {
		font-family: inherit;
		font-size: inherit;
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
