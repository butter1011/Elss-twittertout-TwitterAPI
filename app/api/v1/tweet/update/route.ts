import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/libs/mongodb";
import Tweets from "@/models/Tweets";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connect();
    const { tweetId, isCheck } = await request.json();
    const tweet = await Tweets.findOne({ _id: tweetId });

    if (!tweet) {
      return NextResponse.json({ status: 404, message: "Tweet Not Found!" });
    } else {
      await tweet.updateOne({ $set: { isCheck: isCheck } }, { strict: false });

      return NextResponse.json({
        status: 200,
        message: "Tweet updated Successfully!",
      });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
