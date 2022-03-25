import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";
import ProductDetails from "../details/ProductDetails";
import ProductForm from "../form/ProductForm";
import ProductList from "./ProductList";

interface Props {
	products: Product[];
	selectedProduct: Product | undefined;
	selectProduct: (id: string) => void;
	cancelSelectProduct: () => void;
	editMode: boolean;
	openForm: (id: string) => void;
	openCreateForm: () => void;
	closeForm: () => void;
	createOrEdit: (product: Product) => void;
	deleteProduct: (id: string) => void;
}

export default function ProductDashboard({
	products,
	selectProduct,
	selectedProduct,
	cancelSelectProduct,
	editMode,
	openForm,
	openCreateForm,
	closeForm,
	createOrEdit,
	deleteProduct,
}: Props) {
	return (
		<>
			<Button
				// as={NavLink}
				// to="/createActivity"
				onClick={openCreateForm}
				positive
				content="Create Product"
			/>
			<Grid>
				<Grid.Column width="10">
					<ProductList
						deleteProduct={deleteProduct}
						products={products}
						selectProduct={selectProduct}
					/>
				</Grid.Column>
				<Grid.Column width="6">
					{selectedProduct && !editMode && (
						<ProductDetails
							openForm={openForm}
							product={selectedProduct}
							cancelSelectProduct={cancelSelectProduct}
						/>
					)}
					{editMode && (
						<ProductForm
							closeForm={closeForm}
							product={selectedProduct}
							createOrEdit={createOrEdit}
						/>
					)}
				</Grid.Column>
			</Grid>
		</>
	);
}
