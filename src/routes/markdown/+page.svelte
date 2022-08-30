<script>
import SMarkdown from 'svelte-markdown'

 const source = `
 
 # A Svelte/MongoDB setup

Main notes taken from [How to create a SvelteKit and MongoDB app.](https://awstip.com/how-to-create-a-svelte-kit-and-mongodb-app-63de01c6ff71)
However it is slightly modified to account for the new **+page.server.js** and **+page.svelte** naming conventions where routing is now stored in its corresponding
**folder naming structure**, as found in their [Docs here](https://kit.svelte.dev/docs/routing#page).


 ## Notes on this project
 The only intended purpose is to simply connect to the DB, read the data and display what we have in there onto a page.
 Other CRUD elements will be considered as we explore MongoDB through Svelte.

 * Demonstrate a Svelte-MongoDB setup and highlight the key concepts that allow it to work. 
 * Data is in format of: **[{"_id":"6306cf64e003b011330d56e1","brand":"Audi","mileage":2000}, ...}]**

 ### Key Concepts
 **Folder Structure** 

 * **lib/db.ts**            -- Handle connection to DB.
 * **routes/page.server.ts** -- Make request to DB using imported Handle, and store result into prop named JSON.stringify(**cars**).
 * **routes/page.svelte**    -- Accesses response data through JSON.parsed(**data.cars**)

 <pre>
 ├── src/
 │    ├── lib/
 │    │    ├── db.ts
 │    │ 
 │    ├── routes/
 │    │      ├── cars/
 │    │            ├── +page.server.ts
 │    │            ├── +page.svelte
 
 </pre>

 * **lib/db.ts** -- is responsible for the mongodb connection, handling the *.env* variables and *general back-end functionality*.
   * (That is to say: **db.ts** handles the DB connection SERVER SIDE - securely and returns the handle to any page that requires it.)
   * Handles .env with: **import { DB_URI } from '$env/static/private';** // .env file in Root folder


 * **+page.server.ts** -- takes the DB handle, from lib which then returns a **load()** function response to a const variable called data/prop cariable called 'cars'.

   * **const cars = await db.collection('cars').find({}).toArray();**
   * <pre>

      return {
          status: 200,
          cars: JSON.stringify(cars)
        }
       </pre>

 The resulting structure of that response is like: 
 <pre>
   {data: {
      status: 200,
      cars: '[{"_id":"6306cf64e003b011330d56e1","brand":"Audi","mileage":2000},...]'
    }
   }
  </pre>

  * **+page.svelte** -- Accesses the response data through '**export let data;**' in the *script* portion area
    * and to access the 'cars' prop we created we access it like **data.cars**. the name **data** seems to be the default name and required**.
    * note that we called **JSON.stringify(cars)** in +page.server.js as it was important for the ObjectId returned by mongo and the corresponding **JSON.parse(data.cars)**
    * to access the data as string formatted content
`
</script>

<SMarkdown {source} />
