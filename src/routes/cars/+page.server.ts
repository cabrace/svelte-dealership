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
