export async function GET({ params }) {

  const response = await fetch('https://jsonplaceholder.typicode.com/photos')

	const photos = await response.json()

  // return {
    // status: 200,
    // photos: photos.slice(0, 20),
    // headers: {
      // "content-type": "application/json",
      // "accept": "application/json"
    // }
  // }

  return new Response(String(JSON.stringify(photos.slice(0,20))));
}
