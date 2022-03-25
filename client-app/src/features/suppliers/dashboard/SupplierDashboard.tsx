import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { Supplier } from "../../../app/layout/models/supplier";
import SupplierDetails from "../details/SupplierDetails";
import SupplierForm from "../form/SupplierForm";
import SupplierList from "./SupplierList";

interface Props {
	suppliers: Supplier[];
	selectedSupplier: Supplier | undefined;
	selectSupplier: (id: string) => void;
	cancelSelectSupplier: () => void;
	editMode: boolean;
	openForm: (id: string) => void;
	openCreateForm: () => void;
	closeForm: () => void;
	createOrEdit: (supplier: Supplier) => void;
	deleteSupplier: (id: string) => void;
}

export default function SupplierDashboard({
	suppliers,
	selectSupplier,
	selectedSupplier,
	cancelSelectSupplier,
	editMode,
	openForm,
	openCreateForm,
	closeForm,
	createOrEdit,
	deleteSupplier,
}: Props) {
	return (
		<>
			<Button
				// as={NavLink}
				// to="/createActivity"
				onClick={openCreateForm}
				positive
				content="Create Supplier"
			/>
			<Grid>
				<Grid.Column width="10">
					<SupplierList
						deleteSupplier={deleteSupplier}
						suppliers={suppliers}
						selectSupplier={selectSupplier}
					/>
				</Grid.Column>
				<Grid.Column width="6">
					{selectedSupplier && !editMode && (
						<SupplierDetails
							openForm={openForm}
							supplier={selectedSupplier}
							cancelSelectSupplier={cancelSelectSupplier}
						/>
					)}
					{editMode && (
						<SupplierForm
							createOrEdit={createOrEdit}
							closeForm={closeForm}
							supplier={selectedSupplier}
						/>
					)}
				</Grid.Column>
			</Grid>
		</>
	);
}
