import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function CategoryForm() {
	const { categoryStore } = useStore();
	const {
		selectedCategory,
		closeForm,
		createCategory,
		updateCategory,
		loading,
	} = categoryStore;

	const initialState = selectedCategory ?? {
		id: "",
		categoryName: "",
		description: "",
	};

	const [category, setCategory] = useState(initialState);

	function handlesSubmit() {
		category.id ? updateCategory(category) : createCategory(category);
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setCategory({ ...category, [name]: value });
	}

	return (
		<Segment clearing>
			<Form onSubmit={handlesSubmit} autoComplete="off">
				<Form.Input
					placeholder="Category Name"
					value={category.categoryName}
					name="categoryName"
					onChange={handleInputChange}
				/>
				<Form.TextArea
					placeholder="Description"
					value={category.description}
					name="description"
					onChange={handleInputChange}
				/>
				<Button
					loading={loading}
					floated="right"
					positive
					type="submit"
					content="Submit"
				/>
				<Button
					onClick={closeForm}
					floated="right"
					type="button"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
});
