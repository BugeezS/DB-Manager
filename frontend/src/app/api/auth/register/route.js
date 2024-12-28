export async function POST(request) {
  try {
    // Parse the JSON body
    const body = await request.json();
    console.log("Request body:", body);

    // Make the API call with properly stringified body
    const response = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
      }),
    });

    console.log("API Response:", response);

    if (response.ok) {
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const errorData = await response.json();
    return new Response(
      JSON.stringify({ message: errorData.message || "Invalid registration" }),
      {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
