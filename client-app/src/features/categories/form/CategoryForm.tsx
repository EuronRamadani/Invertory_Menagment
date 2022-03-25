import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Category } from "../../../app/layout/models/category";

interface Props {
	category: Category | undefined;
	closeForm: () => void;
	createOrEdit: (category: Category) => void;
}

export default function CategoryForm({
	category: selectedCategory,
	closeForm,
	createOrEdit,
}: Props) {
	const initialState = selectedCategory ?? {
		id: "",
		categoryName: "",
		description: "",
	};

	const [category, setCategory] = useState(initialState);

	function handlesSubmit() {
		createOrEdit(category);
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
				<Button floated="right" positive type="submit" content="Submit" />
				<Button
					onClick={closeForm}
					floated="right"
					type="button"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
}
