import Category from "../models/Category.js";
import slugify from "slugify";
import Product from "../models/Product.js";

export const createCategory = async (req, res, next) => {
	try {
		const slug = slugify(req.body.title, {
			replacement: "-",
			lower: true,
			strict: true,
			locale: "vi",
			trim: true,
		});
		console.log(slug);
		const data = await Category.create({ ...req.body, slug });
		if (data) {
			return res.status(201).json({
				success: true,
				data,
				message: "Tao danh muc thanh cong!",
			});
		}
	} catch (error) {
		next(error);
	}
};

export const updateCategoryById = async (req, res, next) => {
	try {
		const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
		// findByIdAndUpdate = patch;
		// findByIdAndReplace = put;
		if (data) {
			return res.status(200).json({
				success: true,
				data,
				message: "Update danh muc thanh cong!",
			});
		}
	} catch (error) {
		next(error);
	}
};

export const removeCategoryById = async (req, res, next) => {
	try {
		if (req.params.id === "669f7175de9967d00fdb118a") {
			return res.status(400).json({
				message: "Khong xoa dk danh muc mac dinh",
				success: false,
			});
		}
		const data = await Category.findByIdAndDelete(req.params.id);
		// Chuyển toàn bộ sản phẩm thuộc danh mục bị xoá về danh mục mặc định
		const productToUpdate = await Product.find({ category: req.params.id });
		await Promise.all(
			productToUpdate.map(async (product) => {
				product.category = "669f7175de9967d00fdb118a";
				await product.save();
			})
		);
		if (data) {
			return res.status(200).json({
				success: true,
				data,
				message: "Remove danh muc thanh cong!",
			});
		}
	} catch (error) {
		next(error);
	}
};

export const getCategoryById = async (req, res, next) => {
	try {
		const data = await Category.findById(req.params.id).populate("products");
		console.log(data);
		if (data) {
			return res.status(200).json({
				success: true,
				data,
				message: "Tim danh muc thanh cong!",
			});
		}
	} catch (error) {
		next(error);
	}
};

export const getAllCategorys = async (req, res, next) => {
	try {
		const data = await Category.find();
		if (data) {
			return res.status(200).json({
				success: true,
				data,
				message: "Lay danh muc thanh cong!",
			});
		}
	} catch (error) {
		next(error);
	}
};
