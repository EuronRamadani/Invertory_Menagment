import React from "react";
import { Button, Grid, Menu } from "semantic-ui-react";
import { Category } from "../../../app/layout/models/category";
import CategoryList from "./CategoryList";
import CategoryDetails from "../details/CategoryDetails";
import CategoryForm from "../form/CategoryForm";

interface Props {
	categories: Category[];
	// category: Category;
	selectedCategory: Category | undefined;
	selectCategory: (id: string) => void;
	cancelSelectCategory: () => void;
	editMode: boolean;
	openForm: (id: string) => void;
	openCreateForm: () => void;
	closeForm: () => void;
	createOrEdit: (category: Category) => void;
	deleteCategory: (id: string) => void;
}

export default function CategoryDashboard({
	categories,
	// category,
	selectCategory,
	selectedCategory,
	cancelSelectCategory,
	editMode,
	openForm,
	openCreateForm,
	closeForm,
	createOrEdit,
	deleteCategory,
}: Props) {
	return (
		<>
			<Menu.Item>
				<Button
					// as={NavLink}
					// to="/createActivity"
					onClick={openCreateForm}
					positive
					content="Create Category"
				/>
			</Menu.Item>
			<Grid>
				<Grid.Column width="10">
					<CategoryList
						categories={categories}
						selectCategory={selectCategory}
						deleteCategory={deleteCategory}
					/>
				</Grid.Column>
				<Grid.Column width="6">
					{selectedCategory && !editMode && (
						<CategoryDetails
							openForm={openForm}
							category={selectedCategory}
							cancelSelectCategory={cancelSelectCategory}
						/>
					)}
					{editMode && (
						<CategoryForm
							closeForm={closeForm}
							category={selectedCategory}
							createOrEdit={createOrEdit}
						/>
					)}
				</Grid.Column>
			</Grid>
		</>
	);
}
