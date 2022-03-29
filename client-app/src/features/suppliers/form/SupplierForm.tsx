import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

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

	function handlesSubmit() {
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

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setSupplier({ ...supplier, [name]: value });
	}

	if (loadingInitial)
		return <LoadingComponent content="Loading supplier ..." />;

	return (
		<Segment clearing>
			<Form onSubmit={handlesSubmit} autoComplete="off">
				<Form.Input
					placeholder="Supplier Name"
					value={supplier.supplierName}
					name="supplierName"
					onChange={handleInputChange}
				/>
				<Form.TextArea
					placeholder="Description"
					value={supplier.description}
					name="description"
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder="Country of Origin"
					value={supplier.countryOfOrigin}
					name="countryOfOrigin"
					onChange={handleInputChange}
				/>
				<Button
					loading={loading}
					floated="right"
					positive
					type="submit"
					content="Submit"
				/>
				<Button floated="right" type="button" content="Cancel" />
			</Form>
		</Segment>
	);
});
