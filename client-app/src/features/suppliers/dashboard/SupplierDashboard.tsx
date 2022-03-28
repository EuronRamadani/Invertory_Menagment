import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import SupplierDetails from "../details/SupplierDetails";
import SupplierForm from "../form/SupplierForm";
import SupplierList from "./SupplierList";

export default observer(function SupplierDashboard() {
	const { supplierStore } = useStore();
	const { selectedSupplier, editMode, openForm } = supplierStore;

	return (
		<>
			<Button
				// as={NavLink}
				// to="/createActivity"
				onClick={() => openForm()}
				positive
				content="Create Supplier"
			/>
			<Grid>
				<Grid.Column width="10">
					<SupplierList />
				</Grid.Column>
				<Grid.Column width="6">
					{selectedSupplier && !editMode && <SupplierDetails />}
					{editMode && <SupplierForm />}
				</Grid.Column>
			</Grid>
		</>
	);
});
