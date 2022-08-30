import { MongoClient } from "mongodb";
import { DB_URI } from '$env/static/private'; //GET from .env file in root folder
//format of above = DB_URI=mongodb+srv://<username>:<url-encoded-password>@cluster0.oozkc.mongodb.net/ToDo

const client = new MongoClient(DB_URI)

//console.log(DB_URI)
await client.connect()
export default client.db('dealership') // select database

