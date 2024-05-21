import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/libs/mongodb";
import Tweet_users from "@/models/TweetsUsers";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connect();
    const { del_user } = await request.json();
    
    const users = await Tweet_users.findOne({ username: del_user });
    if (!users) {
      return NextResponse.json({ status: 404, message: "User Not Found!" });
    } else {
      await Tweet_users.deleteOne({ username: del_user });

      const userlist = await Tweet_users.find();
      return NextResponse.json({
        status: 200,
        message: "User Deleted Successfully!",
        users: userlist,
      });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
