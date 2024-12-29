// app/api/database/fetch/route.js

export async function POST(request) {
  // Parse the request body as JSON
  const body = JSON.parse(request.body);

  // Extract the JWT from the cookies
  const cookies = request.headers.get("cookie");
  const jwt = cookies
    .split("; ")
    .find((row) => row.startsWith("jwt="))
    .split("=")[1];

  // Fetch the data from the database
  const data = await fetchFromDatabase(body, jwt);

  // Return the data as a JSON response
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Fetch the data from the database
async function fetchFromDatabase(body, jwt) {
  const response = await fetch(`${process.env.API_URL}/database/fetch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(body),
  });

  return response.json();
}
