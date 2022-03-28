import React from "react";
import { Button, Grid, Menu } from "semantic-ui-react";
import CategoryList from "./CategoryList";
import CategoryDetails from "../details/CategoryDetails";
import CategoryForm from "../form/CategoryForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function CategoryDashboard() {
	const { categoryStore } = useStore();

	const { selectedCategory, editMode, openForm } = categoryStore;
	return (
		<>
			<Menu.Item>
				<Button onClick={() => openForm()} positive content="Create Category" />
			</Menu.Item>
			<Grid>
				<Grid.Column width="10">
					<CategoryList />
				</Grid.Column>
				<Grid.Column width="6">
					{selectedCategory && !editMode && <CategoryDetails />}
					{editMode && <CategoryForm />}
				</Grid.Column>
			</Grid>
		</>
	);
});
