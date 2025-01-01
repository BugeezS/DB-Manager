export async function POST(request) {
  try {
    const cookies = request.cookies.get("token");
    if (!cookies) {
      return Response.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    console.log("body", body);

    // Validate required fields
    const requiredFields = ["name", "host", "port", "username", "password"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return Response.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/databases/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        host: body.host,
        port: body.port,
        username: body.username,
        password: body.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return Response.json(
        { error: errorData.message || "Failed to add database" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Database add error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
