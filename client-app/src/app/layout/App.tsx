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
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../api/common/ModalContainer";
import Profile from "./Profile";
import Footer from "./Footer";

function App() {
	const location = useLocation();
	const { commonStore, userStore } = useStore();

	useEffect(() => {
		if (commonStore.token) {
			userStore.getUser().finally(() => commonStore.setAppLoaded());
		} else {
			commonStore.setAppLoaded();
		}
	}, [commonStore, userStore]);

	if (!commonStore.appLoaded)
		return <LoadingComponent content="Loading app ..." />;

	return (
		<>
			<ModalContainer />
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

							{/*LoginForm*/}
							<Route path="/login" component={LoginForm} />
							<Route path="/Profile" component={Profile} />
							{/* <Route path="/footer" component={Footer} /> */}
						</Container>
						{/* <Footer /> */}
					</>
				)}
			/>
		</>
	);
}

export default observer(App);
