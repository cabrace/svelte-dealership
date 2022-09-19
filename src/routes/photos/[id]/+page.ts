// export let data;
//
export async function load({ params }) {
  console.log("prefetch Id", params.id)

  let fetchDataResult

  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${params.id}`).then(res => { 
		   console.log(' response', res)
		   console.log(' r.json() >', res.clone().json()) //
		   res.json()
			   .then(json => {
						console.log('json', json)
				    fetchDataResult = json				   
		     })
		     .catch(error => console.log(error))
    })



    // if (response.ok){
      // console.log("Response Id: ", response.clone().json())
    // }
    // if (response.ok){
    // console.log(response.url)
      // return response.json()
    // }
}

  // return data.photos[1]
  // console.log(photos)
  // if data.find(x => x.id === params.id){
    // console.log(x.id)
  // }

  // if (params.id === 1) {
    // return {
      // title: 'Hello world!',
      // content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
    // };
  // }
  
  // return new Response(String(JSON.stringify(data.photos.slice(0,10))));
  // throw error(404, 'Not found');
