import { createContext, useEffect, useReducer } from "react";
import { Product } from "../interfaces/Product";
import productReducer from "../reducers/productReducer";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export type ProductContextType = {
	state: { products: Product[] };
	dispatch: React.Dispatch<any>;
	removeProduct: (id: string | undefined) => void;
	handleProduct: (data: Product) => void;
};

export const ProductContext = createContext({} as ProductContextType);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(productReducer, { products: [] });
	const nav = useNavigate();
	useEffect(() => {
		(async () => {
			const { data } = await instance.get(`/products`);
			console.log(data);
			dispatch({ type: "GET_PRODUCTS", payload: data.data });
		})();
	}, []);

	const removeProduct = async (id: string | undefined) => {
		try {
			await instance.delete(`/products/${id}`);
			dispatch({ type: "REMOVE_PRODUCT", payload: id });
		} catch (error: any) {
			console.log(error);
		}
	};

	const handleProduct = async (product: Product) => {
		try {
			const { _id, ...productWithoutId } = product;
			if (_id) {
				const { data } = await instance.patch(`/products/${_id}`, productWithoutId);
				dispatch({ type: "UPDATE_PRODUCT", payload: data.data });
				toast.success("sua thanh cong")
			} else {
				console.log(productWithoutId);
				const { data } = await instance.post(`/products`, productWithoutId);
				dispatch({ type: "ADD_PRODUCT", payload: data.data });
				toast.success("them thanh cong")
			}
			nav("/admin");
		} catch (error) {
			toast.error("xu ly san pham that bai")
		}
	};

	return (
		<ProductContext.Provider value={{ state, dispatch, removeProduct, handleProduct }}>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductProvider;
