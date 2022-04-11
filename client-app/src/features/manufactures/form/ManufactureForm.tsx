import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Manufacture } from "../../../app/layout/models/manufacture";

export default observer(function ManufactureForm() {
	const history = useHistory();
	const { manufactureStore } = useStore();
	const {
		createManufacture,
		updateManufacture,
		loading,
		loadingInitial,
		loadManufacture,
	} = manufactureStore;
	const { id } = useParams<{ id: string }>();

	const [manufacture, setManufacture] = useState({
		id: "",
		manufacturerName: "",
		description: "",
		countryOfOrigin: "",
	});

	const validationSchema = Yup.object({
		manufacturerName: Yup.string().required("Manufacture name is required"),
		description: Yup.string().required(),
		countryOfOrigin: Yup.string().required(),
	});

	useEffect(() => {
		if (id)
			loadManufacture(id).then((manufacture) => setManufacture(manufacture!));
	}, [id, loadManufacture]);

	function handleFormSubmit(manufacture: Manufacture) {
		if (manufacture.id.length === 0) {
			let newManufacture = {
				...manufacture,
				id: uuid(),
			};
			createManufacture(newManufacture).then(() =>
				history.push(`/manufactures/${newManufacture.id}`)
			);
		} else {
			updateManufacture(manufacture).then(() =>
				history.push(`/manufactures/${manufacture.id}`)
			);
		}
	}

	// function handleInputChange(
	// 	event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	// ) {
	// 	const { name, value } = event.target;
	// 	setManufacture({ ...manufacture, [name]: value });
	// }

	if (loadingInitial)
		return <LoadingComponent content="Loading manufacture ..." />;

	return (
		<Segment clearing>
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={manufacture}
				onSubmit={(values) => handleFormSubmit(values)}
			>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<MyTextInput
							placeholder="Manufacture Name"
							name="manufacturerName"
						/>
						<MyTextArea rows={3} placeholder="Description" name="description" />
						<MyTextInput
							placeholder="Country of origin"
							name="countryOfOrigin"
						/>
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
							to="/manufactures"
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
