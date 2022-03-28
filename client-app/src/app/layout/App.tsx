import "./styles.css";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import CategoryDashboard from "../../features/categories/dashboard/CategoryDashboard";
import ManufactureDashboard from "../../features/manufactures/dashboard/ManufactureDashboard";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import SupplierDashboard from "../../features/suppliers/dashboard/SupplierDashboard";
import LoadingComponent from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

function App() {
	const {
		categoryStore,
		manufactureStore,
		productStore,
		supplierStore,
	} = useStore();

	useEffect(() => {
		categoryStore.loadCategories();
	}, [categoryStore]);

	useEffect(() => {
		manufactureStore.loadManufactures();
	}, [manufactureStore]);

	useEffect(() => {
		productStore.loadProducts();
	}, [productStore]);

	useEffect(() => {
		supplierStore.loadSuppliers();
	}, [supplierStore]);

	if (categoryStore.loadingInitial)
		return <LoadingComponent content="Loading app " />;

	return (
		<>
			<NavBar />
			<Container style={{ marginTop: "7em" }}>
				<CategoryDashboard />
				<ManufactureDashboard />
				<ProductDashboard />
				<SupplierDashboard />
			</Container>
		</>
	);
}

export default observer(App);
