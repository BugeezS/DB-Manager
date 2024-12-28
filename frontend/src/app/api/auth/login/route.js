// app/api/auth/login/route.js

export async function POST(req) {
  try {
    // Parse the JSON body of the request
    const { username, password } = await req.json();

    // Perform the login logic here
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();

      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Invalid login" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred during login" }),
      { status: 500 }
    );
  }
}
