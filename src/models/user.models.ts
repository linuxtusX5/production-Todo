import mongoose, { ObjectId } from "mongoose";

interface User {
  email: string;
  password: string;
  todos: ObjectId[]; // or any other compatible type
}

const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: [true, 'Email is required!']
  },
  password: {
    type: String,
    required: [true, 'Password is required!']
  },
  todos: [{
    type: mongoose.Types.ObjectId,
    ref: "Todo"
  }]
}, { timestamps: true });

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
