import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Supplier } from "../../../app/layout/models/supplier";

export default observer(function SupplierForm() {
	const history = useHistory();
	const { supplierStore } = useStore();
	const {
		createSupplier,
		updateSupplier,
		loading,
		loadingInitial,
		loadSupplier,
	} = supplierStore;
	const { id } = useParams<{ id: string }>();

	const [supplier, setSupplier] = useState({
		id: "",
		supplierName: "",
		countryOfOrigin: "",
		description: "",
	});

	useEffect(() => {
		if (id) loadSupplier(id).then((supplier) => setSupplier(supplier!));
	}, [id, loadSupplier]);

	const validationSchema = Yup.object({
		supplierName: Yup.string().required("Suppllier name is required"),
		description: Yup.string().required(),
		countryOfOrigin: Yup.string().required(),
	});

	function handleFormSubmit(supplier: Supplier) {
		if (supplier.id.length === 0) {
			let newSupplier = {
				...supplier,
				id: uuid(),
			};
			createSupplier(newSupplier).then(() =>
				history.push(`/suppliers/${newSupplier.id}`)
			);
		} else {
			updateSupplier(supplier).then(() =>
				history.push(`/suppliers/${supplier.id}`)
			);
		}
	}

	// function handleInputChange(
	// 	event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	// ) {
	// 	const { name, value } = event.target;
	// 	setSupplier({ ...supplier, [name]: value });
	// }

	if (loadingInitial)
		return <LoadingComponent content="Loading supplier ..." />;

	return (
		<Segment clearing>
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={supplier}
				onSubmit={(values) => handleFormSubmit(values)}
			>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<MyTextInput placeholder="Supplier Name" name="supplierName" />
						<MyTextArea rows={3} placeholder="Description" name="description" />
						<MyTextInput
							placeholder="Country of Origin"
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
						<Button floated="right" type="button" content="Cancel" />
					</Form>
				)}
			</Formik>
		</Segment>
	);
});
