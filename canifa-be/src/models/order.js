import { Schema } from "mongoose";

const orderItem = new Schema({
	product: { type: Schema.Types.ObjectId, ref: "Product" },
	quantity: Number,
});

const orderSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	products: [orderItem],
	totalPrice: Number,
	vouchour: { type: String, enum: ["sale15", "sale20"] },
	status: {
		type: String,
		enum: ["pending", "shipping", "completed", "cancelled"],
		default: "pending",
	},
});

export default mongoose.model("Order", orderSchema);