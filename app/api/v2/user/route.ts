import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/libs/mongodb";
import Users from "@/models/Users";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connect();

    const hm_users = await Users.find();

    return NextResponse.json({ status: 200, hm_users: hm_users });
  } catch (error) {
    return NextResponse.error();
  }
}
