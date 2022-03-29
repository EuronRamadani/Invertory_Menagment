import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

export default observer(function CategoryForm() {
	const history = useHistory();
	const { categoryStore } = useStore();
	const {
		createCategory,
		updateCategory,
		loading,
		loadingInitial,
		loadCategory,
	} = categoryStore;
	const { id } = useParams<{ id: string }>();

	const [category, setCategory] = useState({
		id: "",
		categoryName: "",
		description: "",
	});

	useEffect(() => {
		if (id) loadCategory(id).then((category) => setCategory(category!));
	}, [id, loadCategory]);

	function handlesSubmit() {
		if (category.id.length === 0) {
			let newCategory = {
				...category,
				id: uuid(),
			};
			createCategory(newCategory).then(() =>
				history.push(`/categories/${newCategory.id}`)
			);
		} else {
			updateCategory(category).then(() =>
				history.push(`/categories/${category.id}`)
			);
		}
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setCategory({ ...category, [name]: value });
	}

	if (loadingInitial)
		return <LoadingComponent content="Loading category ..." />;

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
					as={Link}
					to="/categories"
					floated="right"
					type="button"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
});
