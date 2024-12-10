import { model, Schema } from "mongoose";

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		versionKey: false,
	},
);

userSchema.set("toJSON", {
	transform: (_, { password, ...user }) => user,
});

export const UsersCollection = model("user", userSchema);
