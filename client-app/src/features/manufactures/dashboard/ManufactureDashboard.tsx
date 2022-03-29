import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ManufactureList from "./ManufactureList";

export default observer(function ManufactureDashboard() {
	const { manufactureStore } = useStore();
	const { loadManufactures, manufactureRegistry } = manufactureStore;
	// const { selectedManufacture, editMode } = manufactureStore;

	useEffect(() => {
		if (manufactureRegistry.size <= 1) loadManufactures();
	}, [manufactureRegistry.size, loadManufactures]);

	if (manufactureStore.loadingInitial)
		return <LoadingComponent content="Loading app " />;

	return (
		<>
			<Button
				as={NavLink}
				exact
				to="/CreateManufacture"
				positive
				content="Create Manufacture"
			/>
			<Grid>
				<Grid.Column width="10">
					<ManufactureList />
				</Grid.Column>
				{/* <Grid.Column width="6">
					{selectedManufacture && !editMode && <ManufactureDetails />}
					{editMode && <ManufactureForm />}
				</Grid.Column> */}
			</Grid>
		</>
	);
});
