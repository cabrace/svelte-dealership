import { MongoClient } from "mongodb";
import { DASHBOARD_DB } from '$env/static/private'; //GET from .env file in root folder
//format of above = DB_URI=mongodb+srv://<username>:<url-encoded-password>@cluster0.oozkc.mongodb.net/ToDo

const client = new MongoClient(DASHBOARD_DB)

// console.log(DASHBOARD_DB)
await client.connect()
export default client.db('dashboard_data') // select database

