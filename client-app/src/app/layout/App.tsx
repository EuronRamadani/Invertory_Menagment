import "./styles.css";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import CategoryDashboard from "../../features/categories/dashboard/CategoryDashboard";
import ManufactureDashboard from "../../features/manufactures/dashboard/ManufactureDashboard";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import SupplierDashboard from "../../features/suppliers/dashboard/SupplierDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import CategoryForm from "../../features/categories/form/CategoryForm";
import ManufactureForm from "../../features/manufactures/form/ManufactureForm";
import ProductForm from "../../features/products/form/ProductForm";
import SupplierForm from "../../features/suppliers/form/SupplierForm";
import CategoryDetails from "../../features/categories/details/CategoryDetails";
import ManufactureDetails from "../../features/manufactures/details/ManufactureDetails";
import ProductDetails from "../../features/products/details/ProductDetails";
import SupplierDetails from "../../features/suppliers/details/SupplierDetails";

function App() {
	const location = useLocation();

	return (
		<>
			<Route exact path="/" component={HomePage} />
			<Route
				path={"/(.+)"}
				render={() => (
					<>
						<NavBar />
						<Container style={{ marginTop: "7em" }}>
							{/* Categories /*/}
							<Route exact path="/categories" component={CategoryDashboard} />
							<Route path="/categories/:id" component={CategoryDetails} />
							<Route
								key={location.key}
								path={["/createCategory", "/manageCategory/:id"]}
								component={CategoryForm}
							/>
							{/* Manufactures /*/}
							<Route
								exact
								path="/manufactures"
								component={ManufactureDashboard}
							/>
							<Route path="/manufactures/:id" component={ManufactureDetails} />
							<Route
								path={["/createManufacture", "/manageManufacture/:id"]}
								component={ManufactureForm}
							/>
							{/* Products /*/}
							<Route exact path="/products" component={ProductDashboard} />
							<Route path="/products/:id" component={ProductDetails} />
							<Route
								path={["/createProduct", "/manageProduct/:id"]}
								component={ProductForm}
							/>
							{/* Suppliers /*/}
							<Route exact path="/suppliers" component={SupplierDashboard} />
							<Route path="/suppliers/:id" component={SupplierDetails} />
							<Route
								path={["/createSupplier", "/manageSupplier/:id"]}
								component={SupplierForm}
							/>
						</Container>
					</>
				)}
			/>
		</>
	);
}

export default observer(App);
