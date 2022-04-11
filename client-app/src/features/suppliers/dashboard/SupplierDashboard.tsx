import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import SupplierList from "./SupplierList";

export default observer(function SupplierDashboard() {
	const { supplierStore } = useStore();
	const { loadSuppliers, supplierRegistry } = supplierStore;
	const {
		userStore: { user },
	} = useStore();

	useEffect(() => {
		if (supplierRegistry.size <= 1) loadSuppliers();
	}, [supplierRegistry.size, loadSuppliers]);

	if (supplierStore.loadingInitial)
		return <LoadingComponent content="Loading suppliers... " />;

	return (
		<>
			{user?.isAdmin ? (
				<Button
					style={{ margin: "0 0 10px 150px" }}
					as={NavLink}
					to="/createSupplier" 
					positive
					content="Create Supplier"
				/>
			) : (
				<Fragment />
			)}
			<Grid>
				<Grid.Column width="10" style={{ marginLeft: "150px" }}>
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
