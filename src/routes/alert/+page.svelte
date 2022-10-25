<script>
  import Alert from '$lib/components/Alert.svelte'
  import { alert } from '$lib/stores/alertStore.js'


  // let store = $alert
   // broken code
  function updateStore(){
    /* const storedTheme = localStorage.getItem("store"); */
    // const theme = writable(storedTheme);
    // theme.subscribe(value => {
      // localStorage.setItem("store", value === 'dark' ? 'dark' : 'light');
    // });

    $alert.useLocalStorage()
    /* console.log($alert) */
      // const currentValue = $alert
      // const storedValue = localStorage.getItem("store");
      //
      // localStorage.setItem("store", store);
      /* localStorage.setItem("store", ) */
  }
</script>

<Alert />

<input bind:value={$alert}>
<button on:click={updateStore}>Click</button>
