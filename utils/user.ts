import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel: ReturnType<typeof mongoose.model<typeof userSchema>> =
  mongoose.models.user || mongoose.model("user", userSchema);
export default UserModel;
