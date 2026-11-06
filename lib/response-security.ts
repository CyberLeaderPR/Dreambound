export function secureResponse(response:Response){
 const result=new Response(response.body,response);
 result.headers.set('X-Content-Type-Options','nosniff');
 result.headers.set('Referrer-Policy','no-referrer');
 result.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 // Permit the game's own origin and its ChatGPT host, not arbitrary framing sites.
 // Script restrictions need a nonce-aware framework integration; do not pretend
 // this limited policy is a complete XSS defense.
 result.headers.set('Content-Security-Policy',"object-src 'none'; base-uri 'self'; frame-ancestors 'self' https://chatgpt.com https://*.chatgpt.com");
 return result;
}
