import db from "$lib/db"

// export async function load() {
//
// }
export async function GET({ url }) {
    
  console.log(url)
  /* const cars = await db.collection('cars').find(); */
  const cars = await db.collection('cars').find({}).toArray();

  /* const data = [{"brand":"Volvo", "mileage":"123"},{"brand":"Honda", "mileage":"1234"},{"brand":"Audi", "mileage":"1235"}] */
  // return {
    // status: 200,
    // cars: JSON.stringify(cars)
  // }
  return new Response(String(JSON.stringify(cars)));
}
