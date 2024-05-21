import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/libs/mongodb";
import Tweets from "@/models/Tweets";
import Tweet_users from "@/models/TweetsUsers";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connect();
    let { timeSort } = await request.json();
    let flag: any = -1;

    if (timeSort) {
      flag = 1;
    } else {
      flag = -1;
    }

    const tweets = await Tweets.find().sort({ postedAt: flag });
    const users = await Tweet_users.find();

    //Today Tweets
    const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate() - 1).padStart(2, "0")}`;

    const todayTweets = tweets.filter((tweet) => {
      const tweetPostedAt = new Date(tweet.postedAt);
      return tweetPostedAt.toISOString().slice(0, 10) === formattedCurrentDate;
    });

    // Making the profile_image object
    let user_data: { [key: string]: string } = {};
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      user_data[user.username] = user.profile_image_url;
    }

    return NextResponse.json({
      status: 200,
      tweets: tweets,
      users: user_data,
      todayTweets: todayTweets,
    });
  } catch (error) {
    return NextResponse.error();
  }
}
