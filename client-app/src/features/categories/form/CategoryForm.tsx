import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Category } from "../../../app/layout/models/category";

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

	const validationSchema = Yup.object({
		categoryName: Yup.string().required("Category name is required"),
		description: Yup.string().required(),
	});

	useEffect(() => {
		if (id) loadCategory(id).then((category) => setCategory(category!));
	}, [id, loadCategory]);

	function handleFormSubmit(category: Category) {
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

	// function handleInputChange(
	// 	event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	// ) {
	// 	const { name, value } = event.target;
	// 	setCategory({ ...category, [name]: value });
	// }

	if (loadingInitial)
		return <LoadingComponent content="Loading category ..." />;

	return (
		<Segment clearing>
			<Header conten="Category Details" sub color="teal" />
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={category}
				onSubmit={(values) => handleFormSubmit(values)}
			>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<MyTextInput placeholder="Category Name" name="categoryName" />
						<MyTextArea rows={3} placeholder="Description" name="description" />
						<Button
							disabled={isSubmitting || !dirty || !isValid}
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
				)}
			</Formik>
		</Segment>
	);
});
