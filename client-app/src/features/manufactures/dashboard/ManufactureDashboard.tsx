import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { Manufacture } from "../../../app/layout/models/manufacture";
import ManufactureDetails from "../details/ManufactureDetails";
import ManufactureForm from "../form/ManufactureForm";
import ManufactureList from "./ManufactureList";

interface Props {
	manufactures: Manufacture[];
	selectedManufacture: Manufacture | undefined;
	selectManufacture: (id: string) => void;
	cancelSelectManufacture: () => void;
	editMode: boolean;
	openForm: (id: string) => void;
	openCreateForm: () => void;
	closeForm: () => void;
	createOrEdit: (manufacture: Manufacture) => void;
	deleteManufacture: (id: string) => void;
}

export default function ManufactureDashboard({
	manufactures,
	selectManufacture,
	selectedManufacture,
	cancelSelectManufacture,
	editMode,
	openForm,
	openCreateForm,
	closeForm,
	createOrEdit,
	deleteManufacture,
}: Props) {
	return (
		<>
			<Button
				// as={NavLink}
				// to="/createActivity"
				onClick={openCreateForm}
				positive
				content="Create Manufacture"
			/>
			<Grid>
				<Grid.Column width="10">
					<ManufactureList
						manufactures={manufactures}
						selectManufacture={selectManufacture}
						deleteManufacture={deleteManufacture}
					/>
				</Grid.Column>
				<Grid.Column width="6">
					{selectedManufacture && !editMode && (
						<ManufactureDetails
							openForm={openForm}
							manufacture={selectedManufacture}
							cancelSelectManufacture={cancelSelectManufacture}
						/>
					)}
					{editMode && (
						<ManufactureForm
							closeForm={closeForm}
							category={selectedManufacture}
							createOrEdit={createOrEdit}
						/>
					)}
				</Grid.Column>
			</Grid>
		</>
	);
}
