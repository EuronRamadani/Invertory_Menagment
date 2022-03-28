import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";
import { useStore } from "../../../app/stores/store";
import ProductDetails from "../details/ProductDetails";
import ProductForm from "../form/ProductForm";
import ProductList from "./ProductList";

export default observer(function ProductDashboard() {
	const { productStore } = useStore();
	const { selectedProduct, editMode, openForm } = productStore;

	return (
		<>
			<Button
				// as={NavLink}
				// to="/createActivity"
				onClick={() => openForm()}
				positive
				content="Create Product"
			/>
			<Grid>
				<Grid.Column width="10">
					<ProductList />
				</Grid.Column>
				<Grid.Column width="6">
					{selectedProduct && !editMode && <ProductDetails />}
					{editMode && <ProductForm />}
				</Grid.Column>
			</Grid>
		</>
	);
});
