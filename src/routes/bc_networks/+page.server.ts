import db from "$lib/dashboard_db"
import { ObjectId } from 'mongodb';
// import superjson from 'superjson';

export async function load() {

  /* const cars = await db.collection('cars').find(); */
  const networks = await db.collection('domainData').find({}).project({ _id: 0}).toArray();

  /* const data = [{"brand":"Volvo", "mileage":"123"},{"brand":"Honda", "mileage":"1234"},{"brand":"Audi", "mileage":"1235"}] */
  return {
    status: 200,
    networks: JSON.stringify(networks)
    // cars: JSON.stringify(cars,null,2)
  }
}

export async function POST({ request, setHeaders, url }) {
  const values = await request.formData();

  const username = /** @type {string} */ (values.get('username'));
  const password = /** @type {string} */ (values.get('password'));

  const user = await db.findUser(username);

  if (!user) {
    return {
      status: 403,
      errors: {
        username: 'No user with this username'
      }
    };
  }

  if (user.password !== hash(password)) {
    return {
      status: 403,
      errors: {
        password: 'Incorrect password'
      }
    };
  }

  setHeaders({
    'set-cookie': createSessionCookie(user.id)
  });

  return {
    location: url.searchParams.get('redirectTo') ?? '/'
  };
}
