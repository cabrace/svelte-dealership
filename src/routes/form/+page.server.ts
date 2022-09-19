import db from "$lib/db"
import { ObjectId } from 'mongodb';

import type { Actions, PageServerLoad } from './$types'


export async function POST({ request, setHeaders, url }) {
  const values = await request.formData();

  const email = /** @type {string} */ (values.get('email'));
  const password = /** @type {string} */ (values.get('password'));

  // const user = await db.findUser(username);
  const cars = await db.collection('cars').find({}).project({ _id: 0}).toArray();

  console.log(cars)

  // if (!user) {
    // return {
      // status: 403,
      // errors: {
        // username: 'No user with this username'
      // }
    // };
  // }
//
  // if (user.password !== hash(password)) {
    // return {
      // status: 403,
      // errors: {
        // password: 'Incorrect password'
      // }
    // };
  // }
//
  // setHeaders({
    // 'set-cookie': createSessionCookie(user.id)
  // });

  // return {
    // location: url.searchParams.get('redirectTo') ?? '/'
  // };
}
