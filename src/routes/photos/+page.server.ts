export async function load({ params }) {
   
  console.log("Page Server")

  const response = await fetch('https://jsonplaceholder.typicode.com/photos')

	const photos = await response.json()
  return {
    status: 200,
    cache: { maxage: 34234 },
    photos: photos.slice(0, 12),
    headers: {
      'content-type': 'application/json'
    }
  }
}
