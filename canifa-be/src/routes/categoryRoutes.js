import { Router } from "express";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { categorySchema } from "../validSchema/categorySchema.js";
import {
	createCategory,
	getAllCategorys,
	getCategoryById,
	removeCategoryById,
	updateCategoryById,
} from "../controllers/category.js";

const categoryRoutes = Router();

categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.get("/", getAllCategorys);

// admin mới đk làm!
categoryRoutes.use("/", checkAuth, checkIsAdmin); //middleware này sẽ chạy trước các middleware ở dưới nó
categoryRoutes.post("/", validBodyRequest(categorySchema), createCategory);
categoryRoutes.patch("/:id", validBodyRequest(categorySchema), updateCategoryById);
categoryRoutes.delete("/:id", removeCategoryById);

export default categoryRoutes;
