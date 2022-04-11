import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ManufactureList from "./ManufactureList";

export default observer(function ManufactureDashboard() {
	const { manufactureStore } = useStore();
	const { loadManufactures, manufactureRegistry } = manufactureStore;
	const {
		userStore: { user },
	} = useStore();
	// const { selectedManufacture, editMode } = manufactureStore;

	useEffect(() => {
		if (manufactureRegistry.size <= 1) loadManufactures();
	}, [manufactureRegistry.size, loadManufactures]);

	if (manufactureStore.loadingInitial)
		return <LoadingComponent content="Loading manufactures... " />;

	return (
		<>
			{user?.isAdmin ? (
				<Button
					style={{ margin: "0 0 10px 150px" }}
					as={NavLink}
					exact
					to="/CreateManufacture"
					positive
					content="Create Manufacture"
				/>
			) : (
				<Fragment />
			)}
			<Grid>
				<Grid.Column width="10" style={{ marginLeft: "150px" }}>
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
