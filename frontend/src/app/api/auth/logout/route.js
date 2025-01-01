// app/api/auth/logout/route.js

export async function POST(request) {
  // Set the 'Set-Cookie' header to clear the authentication token
  const headers = new Headers();
  headers.append("Set-Cookie", "token=; Max-Age=-1; Path=/");

  // Return a JSON response indicating successful logout
  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers,
  });
}
