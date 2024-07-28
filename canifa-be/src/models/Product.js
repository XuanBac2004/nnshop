import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
		},
		category: 
			{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			}
		
	},
	{ timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
