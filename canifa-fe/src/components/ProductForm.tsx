import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { productSchema } from "../utils/validation";
import { Product } from "../interfaces/Product";
import { useContext, useEffect, useState } from "react";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";
import instance from "../api";
import { Category } from "../interfaces/Category";

const ProductForm = () => {
	const { handleProduct } = useContext(ProductContext) as ProductContextType;
	const [categories, setCategories] = useState<Category[]>([]);
	const { id } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		reset,
	} = useForm<Product>({
		resolver: zodResolver(productSchema),
	});

	useEffect(() => {
		// Fetch product data if there's an id
		if (id) {
			(async () => {
				try {
					const { data } = await instance.get(`/products/${id}`);
					console.log("Product data:", data.data);

					// Update form with product data
					reset(data.data);
					setValue("category", data.data.category._id); // Ensure the category value is set to the category ID

				} catch (error) {
					console.error("Error fetching product:", error);
				}
			})();
		}
	}, [id, reset, setValue]);

	useEffect(() => {
		// Fetch category list
		(async () => {
			try {
				const { data } = await instance.get(`/categories`);
				console.log("Categories data:", data.data);

				// Update state with category list
				setCategories(data.data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		})();
	}, []);

	return (
		<>
			<form onSubmit={handleSubmit((data) => handleProduct({ ...data, _id: id }))}>
				<h1>{id ? "Edit product" : "Add product"}</h1>

				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						className="form-control"
						type="text"
						{...register("title", { required: "Title is required" })}
					/>
					{errors.title && <span className="text-danger">{errors.title.message}</span>}
				</div>

				<div className="mb-3">
					<label htmlFor="price" className="form-label">
						Price
					</label>
					<input
						className="form-control"
						type="number"
						{...register("price", { required: "Price is required", valueAsNumber: true })}
					/>
					{errors.price && <span className="text-danger">{errors.price.message}</span>}
				</div>

				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<textarea
						className="form-control"
						rows={4}
						{...register("description")}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="category" className="form-label">
						Category
					</label>
					<select {...register("category")} className="form-control">
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.title}
							</option>
						))}
					</select>
				</div>

				<div className="mb-3">
					<button className="btn btn-primary w-100">
						{id ? "Edit product" : "Add product"}
					</button>
				</div>
			</form>
		</>
	);
};

export default ProductForm;
