import React, { useEffect } from "react";
import { Button, Grid, Menu } from "semantic-ui-react";
import CategoryList from "./CategoryList";
// import CategoryDetails from "../details/CategoryDetails";
// import CategoryForm from "../form/CategoryForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { NavLink } from "react-router-dom";

export default observer(function CategoryDashboard() {
	const { categoryStore } = useStore();

	const { loadCategories, categoryRegistry } = categoryStore;

	useEffect(() => {
		if (categoryRegistry.size <= 1) loadCategories();
	}, [categoryRegistry.size, loadCategories]);

	if (categoryStore.loadingInitial)
		return <LoadingComponent content="Loading app " />;

	return (
		<>
			<Menu.Item>
				<Button
					as={NavLink}
					to="/createCategory"
					positive
					content="Create Category"
				/>
			</Menu.Item>
			<Grid>
				<Grid.Column width="10">
					<CategoryList />
				</Grid.Column>
				{/* <Grid.Column width="6">
					{selectedCategory && !editMode && <CategoryDetails />}
					{editMode && <CategoryForm />}
				</Grid.Column> */}
			</Grid>
		</>
	);
});
