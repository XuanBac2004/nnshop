import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "admin",
			enum: ["member", "admin"],
		},
		isActive: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, versionKey: false }
);

export default mongoose.model("Users", userSchema);
