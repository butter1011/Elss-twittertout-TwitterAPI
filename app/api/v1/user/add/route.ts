import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/libs/mongodb";
import Tweet_users from "@/models/TweetsUsers";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connect();
    const { new_user } = await request.json();
    console.log("----------------------");
    
    console.log(new_user);
    
    const users = await Tweet_users.findOne({ username: new_user });
    if (!users && new_user != "") {
      const newUser = new Tweet_users({
        username: new_user,
      });
      await newUser.save();
      const userlist = await Tweet_users.find();
      console.log("Hello");
      
      console.log(userlist);
      
      return NextResponse.json({ status: 200, users: userlist });
    } else {
      return NextResponse.json({ status: 401, message: "User Already Exist!" });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
