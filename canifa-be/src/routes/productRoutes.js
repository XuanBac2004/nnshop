import { Router } from "express";
import {
	createProduct,
	getAllProducts,
	getProductById,
	removeProductById,
	updateProductById,
} from "../controllers/product.js";
import { productSchema } from "../validSchema/productSchema.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const productRouter = Router();

productRouter.get("/:id", getProductById);
productRouter.get("/", getAllProducts);

// admin mới đk làm!
productRouter.use("/", checkAuth, checkIsAdmin); //middleware này sẽ chạy trước các middleware ở dưới nó
productRouter.post("/", validBodyRequest(productSchema), createProduct);
productRouter.patch("/:id", validBodyRequest(productSchema), updateProductById);
productRouter.delete("/:id", removeProductById);

export default productRouter;
