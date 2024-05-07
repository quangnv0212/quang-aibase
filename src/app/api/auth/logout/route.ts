import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return Response.json(
      { message: "Not found accessToken" },
      {
        status: 401,
      }
    );
  }
  try {
    // clear cookie
    return Response.json(
      { message: "Logout success" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `accessToken=; Path=/; HttpOnly; Max-Age=0`,
        },
      }
    );
  } catch (error) {
    return Response.json(
      { message: "Logout fail" },
      {
        status: 400,
      }
    );
  }
}
