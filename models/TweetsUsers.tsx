import mongoose, { Schema } from "mongoose";

const Tweet_usersSchema = new Schema(
  {
    id: { type: Number },
    username: { type: String, require: true },
    name: { type: String },
    description: { type: String },
    profile_image_url: { type: String },
    followers: { type: Number },
    following: { type: Number },
  },
);

const Tweet_users = mongoose.models.Tweet_users || mongoose.model("Tweet_users", Tweet_usersSchema);
export default Tweet_users