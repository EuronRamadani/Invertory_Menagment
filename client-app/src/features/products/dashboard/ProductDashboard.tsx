import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
// import ProductDetails from "../details/ProductDetails";
// import ProductForm from "../form/ProductForm";
import ProductList from "./ProductList";

export default observer(function ProductDashboard() {
	const { productStore } = useStore();
	const { loadProducts, productRegistry } = productStore;
	const {
		userStore: { user },
	} = useStore();

	useEffect(() => {
		if (productRegistry.size <= 1) loadProducts();
	}, [productRegistry.size, loadProducts]);

	if (productStore.loadingInitial)
		return <LoadingComponent content="Loading products... " />;

	return (
		<>
			{user?.isAdmin ? (
				<Button
					style={{ margin: "0 0 10px 150px" }}
					as={NavLink}
					to="/createProduct"
					positive
					content="Create Product"
				/>
			) : (
				<Fragment />
			)}
			<Grid>
				<Grid.Column width="10" style={{ marginLeft: "150px" }}>
					<ProductList />
				</Grid.Column>
				{/* <Grid.Column width="6">
					{selectedProduct && !editMode && <ProductDetails />}
					{editMode && <ProductForm />}
				</Grid.Column> */}
			</Grid>
		</>
	);
});
