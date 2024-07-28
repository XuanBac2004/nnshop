import { createContext, useEffect, useReducer } from "react";
import { Category } from "../interfaces/Category";
import cateReducer from "../reducers/cateReducer";
import { useNavigate } from "react-router-dom";
import instance from "../api";

export type CatecontextType = {
    state: { categories: Category[] };
    dispatch: React.Dispatch<any>;
    removeCate: (id: string | undefined) => void;
    handleCate: (data: Category) => void;
};

export const CateContext = createContext({} as CatecontextType);

const CateProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(cateReducer, { categories: [] });
    const nav = useNavigate();
    useEffect(() => {
        (async () => {
            const { data } = await instance.get(`/categories`);
            console.log(data);
            dispatch({ type: "GET_CATEGORIES", payload: data.data });
        })();
    }, []);

    const removeCate = async (id: string | undefined) => {
        try {
            await instance.delete(`/categories/${id}`);
            dispatch({ type: "REMOVE_CATEGORY", payload: id });
        } catch (error: any) {
            console.log(error);
        }
    };
    
    
    const handleCate = async (cate: Category) => {
        try {
            const { _id, ...cateWithoutId } = cate;
            if (_id) {
                const { data } = await instance.patch(`/categories/${_id}`, cateWithoutId);
                dispatch({ type: "UPDATE_CATEGORY", payload: data.data });
                alert(data.message);
            } else {
                const { data } = await instance.post(`/categories`, cateWithoutId);
                dispatch({ type: "ADD_CATEGORY", payload: data.data });
                alert(data.message);
            }
            nav("/admin/categories");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CateContext.Provider value={{ state, dispatch, removeCate, handleCate }}>
            {children}
        </CateContext.Provider>
    );
};

export default CateProvider;
