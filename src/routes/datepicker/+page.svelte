<script>
  import DatePicker from "$lib/components/DatePicker.svelte";
  
  let startDate = nDaysBack(31);
  let endDate = nDaysBack(0);

  // get nDays back as single passed in param
  function nDaysBack(daysBack, date = new Date()){
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - daysBack)
    daysAgo.setHours(0,0,0,0);
      
      return daysAgo.toLocaleDateString('en-us', {year:'numeric', month:'short', day:'numeric'});
  }

  
  const locale = {
    en: {
      days: "Su|Mo|Tu|We|Th|Fr|Sa".split("|"),
      months: "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec".split('|'),
      start: 0,
    },
    da: {
      days: "Sø|Ma|Ti|On|To|Fr|Lø".split("|"),
      months: "Jan|Feb|Mar|Apr|Maj|Jun|Jul|Aug|Sep|Okt|Nov|Dec".split('|'),
      start: 1,
    }
  }
  
  let culture = "en";
</script>

<h1>DatePicker</h1>

<label>
  Culture:
  <select bind:value={culture}>
    {#each Object.keys(locale) as lang}
    <option value={lang}>{lang}</option>
    {/each}
  </select>
</label>

<h3 class="text-xl">Start Date</h3>
<input type="text" bind:value={startDate}/>
<DatePicker bind:value={startDate} {...locale[culture]}/>

<h3>End Date</h3>
<input type="text" bind:value={endDate}/>
<DatePicker bind:value={endDate} {...locale[culture]}/>

