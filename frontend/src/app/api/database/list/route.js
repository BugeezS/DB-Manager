export async function GET(request) {
  try {
    const cookies = request.cookies.get("token");

    if (!cookies) {
      return Response.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/databases`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.value}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Database list error:", error);
    return Response.json(
      { error: "Failed to fetch databases" },
      { status: 500 }
    );
  }
}
