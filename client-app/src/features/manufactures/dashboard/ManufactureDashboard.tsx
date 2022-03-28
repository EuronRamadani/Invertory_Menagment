import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ManufactureDetails from "../details/ManufactureDetails";
import ManufactureForm from "../form/ManufactureForm";
import ManufactureList from "./ManufactureList";

export default observer(function ManufactureDashboard() {
	const { manufactureStore } = useStore();
	const { selectedManufacture, editMode, openForm } = manufactureStore;

	return (
		<>
			<Button
				// as={NavLink}
				// to="/createActivity"
				onClick={() => openForm()}
				positive
				content="Create Manufacture"
			/>
			<Grid>
				<Grid.Column width="10">
					<ManufactureList />
				</Grid.Column>
				<Grid.Column width="6">
					{selectedManufacture && !editMode && <ManufactureDetails />}
					{editMode && <ManufactureForm />}
				</Grid.Column>
			</Grid>
		</>
	);
});
