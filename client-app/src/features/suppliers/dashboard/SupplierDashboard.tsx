import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import SupplierDetails from "../details/SupplierDetails";
import SupplierForm from "../form/SupplierForm";
import SupplierList from "./SupplierList";

export default observer(function SupplierDashboard() {
	const { supplierStore } = useStore();
	const { loadSuppliers, supplierRegistry } = supplierStore;

	useEffect(() => {
		if (supplierRegistry.size <= 1) loadSuppliers();
	}, [supplierRegistry.size, loadSuppliers]);

	if (supplierStore.loadingInitial)
		return <LoadingComponent content="Loading app " />;

	return (
		<>
			<Button
				// as={NavLink}
				// to="/createActivity"
				as={NavLink}
				to="/createSupplier"
				positive
				content="Create Supplier"
			/>
			<Grid>
				<Grid.Column width="10">
					<SupplierList />
				</Grid.Column>
				{/* <Grid.Column width="6">
					{selectedSupplier && !editMode && <SupplierDetails />}
					{editMode && <SupplierForm />}
				</Grid.Column> */}
			</Grid>
		</>
	);
});
