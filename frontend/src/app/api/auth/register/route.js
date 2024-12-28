// app/api/auth/register/route.js

export async function POST(request) {
  try {
    // Parse the JSON body of the request
    const { email, password } = await request.json();

    // Perform the registration logic here
    const response = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Invalid registration" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred during registration" }),
      { status: 500 }
    );
  }
}
