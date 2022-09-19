<script lang="ts">
  // import { invalidateAll, goto } from '$app/navigation';
  import { enhance } from '$app/forms';

  /* export let form; */
  /* export let data; */
  // let error;

</script>


<form method="POST" use:enhance>
  <label>Email <input name="email" type="text" /></label>
  <label>Password <input name="password" type="password" /></label>
  <button>Register</button>
</form>

 <!--  {({ form, cancel }) => {

    return async ({ result }) => {
      if (result.type === 'error') {
        // alert('post Updated')
        await applyAction(result);
      }
    };
  }} -->
