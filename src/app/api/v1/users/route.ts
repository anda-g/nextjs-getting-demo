import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return response<User>(200, users);
}

export async function POST(req: NextRequest) {
  console.log("this");
  const body = req.json();
  const { id, username } = await body;
  if (!id || !username) {
    return error(400, "Cannot create user");
  }
  const user: User = {
    id: id,
    username: username,
  };
  users.push(user);
  return response<User>(201, Array<User>(user));
}

type User = {
  id: number;
  username: string;
};

const users = [
  {
    id: 1,
    username: "heng",
  },
];

function response<T>(status: number, data: T[]): NextResponse {
  return NextResponse.json({
    status: status,
    data: data,
  });
}

function error(status: number, message: string): NextResponse {
  return NextResponse.json({
    status: status,
    message: message,
  });
}
