import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/libs/mongodb";
import Tweets  from "@/models/Tweets";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connect();
    const { id } = await request.json();
    const tweet = await Tweets.findOne({ _id: id });
    
    if (!tweet) {
      return NextResponse.json({ status: 404, message: "Tweet Not Found!" });
    } else {
      await Tweets.deleteOne({ _id: id });
      const tweets = await Tweets.find().sort({ postedAt: 1 });;
      return NextResponse.json({
        status: 200,
        message: "Tweet Deleted Successfully!",
        tweets: tweets,
      });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
