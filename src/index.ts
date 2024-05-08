addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
	const botScore = request.cf.botManagement.score
	//Check if the bot score is less than 30
	if (botScore && parseInt(botScore) < 30) {
		//Redirect to httpbin.
	  return fetch('https://httpbin.com/get');
	  ;
	} else {
	  // Pass GET request traffic to the origin
	  if (request.method === 'GET') {
		return fetch(request);
	  } else {
		// Handle non-GET requests directly in the worker
		return new Response('Method Not Allowed', {
		  status: 405,
		  headers: { 'Content-Type': 'text/plain' },
		});
	  }
	}
  }