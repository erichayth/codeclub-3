addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
	// Check if the request is a suspected bot (bot score < 30)
	const botScore = request.headers.get('CF-Bot-Score');
	if (botScore && parseInt(botScore) < 29) {
	  // Redirect traffic from suspected bots to a different origin (httpbin.org)
	  return Response.redirect('https://httpbin.org/get', 302);
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