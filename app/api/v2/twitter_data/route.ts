import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/libs/mongodb";
import Tweet_users from "@/models/TweetsUsers";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connect();
    const users = await Tweet_users.find();
    
    return NextResponse.json({ status: 200, users: users });
  } catch (error) {
    return NextResponse.error();
  }
}
