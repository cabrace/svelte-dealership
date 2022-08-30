import db from "$lib/db"
// import superjson from 'superjson';

export async function load() {

  /* const cars = await db.collection('cars').find(); */
  const cars = await db.collection('cars').find({}).toArray();

  /* const data = [{"brand":"Volvo", "mileage":"123"},{"brand":"Honda", "mileage":"1234"},{"brand":"Audi", "mileage":"1235"}] */
  return {
    status: 200,
    cars: JSON.stringify(cars)
  }
}
