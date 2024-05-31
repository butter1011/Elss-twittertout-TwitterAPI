import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/libs/mongodb";
import Users from "@/models/Users";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connect();
    const { email } = await request.json();

    const user = await Users.find({ email: email });

    return NextResponse.json({ status: 200, user: user });
  } catch (error) {
    return NextResponse.error();
  }
}
