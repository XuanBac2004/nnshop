import { useContext } from "react";
import { Link } from "react-router-dom";
import { CateContext, CatecontextType } from "../contexts/CateContext";


const CategoryList = () => {
	const { state, removeCate } = useContext(CateContext) as CatecontextType
	return (
		<div>
			<h1>Category List</h1>
			<Link to="/admin/category-add" className="btn btn-primary">
				Them danh muc moi
			</Link>
			<table className="table table-bodered table-striped text-center">
				<thead>
					<tr>
						<th>ID</th>
						<th>Tittle</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{state.categories.map((item) => (
						<tr key={item._id}>
							<td>{item._id}</td>
							<td>{item.title}</td>
							<td>{item.description}</td>
							<td>
								<Link to={`/admin/category-edit/${item._id}`} className="btn btn-warning">
									Edit
								</Link>
								<button className="btn btn-danger" onClick={() => removeCate(item._id)}>
									Remove
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CategoryList;
