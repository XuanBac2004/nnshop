import { Category } from "../interfaces/Category";

type State = {
	categories: Category[];
};

type Action = {
	type: string;
	payload: any;
};

const cateReducer = (state: State, action: Action) => {
	switch (action.type) {
		case "GET_CATEGORIES":
			return {
				...state,
				categories: action.payload,
			};

		case "ADD_CATEGORY":
			return {
				...state,
				categories: [...state.categories, action.payload],
			};

		case "UPDATE_CATEGORY":
			return {
				...state,
				categories: state.categories.map((cate) => (cate._id === action.payload._id ? action.payload : cate)),
			};


		case "REMOVE_CATEGORY":
			return {
				...state,
				categories: state.categories.filter((cate) => cate._id !== action.payload),
			};

		default:
			return state;
	}
};

export default cateReducer;
