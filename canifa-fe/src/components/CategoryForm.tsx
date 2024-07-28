import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { categorySchema } from "../utils/validation";
import { useContext, useEffect } from "react";
import instance from "../api";
import { Category } from "../interfaces/Category";
import { CateContext, CatecontextType } from "../contexts/CateContext";

const CategoryForm = () => {
	const { handleCate } = useContext(CateContext) as CatecontextType;
	const { id } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<Category>({
		resolver: zodResolver(categorySchema),
	});

	useEffect(() => {
		if (id) {
			(async () => {
				try {
					const { data } = await instance.get(`/categories/${id}`);
					reset(data.data); // Reset form with fetched data
				} catch (error) {
					console.error("Failed to fetch category:", error);
				}
			})();
		}
	}, [id, reset]);

	return (
		<>
			<form onSubmit={handleSubmit((data) => handleCate({ ...data, _id: id }))}>
				<h1>{id ? "Edit category" : "Add category"}</h1>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						title
					</label>
					<input
						id="title"
						className="form-control"
						type="text"
						{...register("title", { required: true })}
					/>
					{errors.title && <span className="text-danger">{errors.title.message}</span>}
				</div>

				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						description
					</label>
					<textarea
						id="description"
						className="form-control"
						rows={4}
						{...register("description")}
					/>
				</div>

				<div className="mb-3">
					<button className="btn btn-primary w-100">{id ? "Edit category" : "Add category"}</button>
				</div>
			</form>
		</>
	);
};

export default CategoryForm;
