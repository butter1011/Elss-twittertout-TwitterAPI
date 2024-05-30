import mongoose, { Schema } from "mongoose";

const TweetsSchema = new Schema(
  {
    tweetId: { type: Number },
    text: { type: String },
    postedAt: { type: Date },
    user: { type: String },
    attachments: { type: Array },
    entities: { type: Array },
    publicMetrics: { type: Object },
    isCheck: { type: Boolean },
  },
);

const Tweets = mongoose.models.Tweets || mongoose.model("Tweets", TweetsSchema);
export default Tweets