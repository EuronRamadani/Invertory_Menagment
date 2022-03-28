import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function SupplierForm() {
	const { supplierStore } = useStore();
	const {
		selectedSupplier,
		createSupplier,
		updateSupplier,
		loading,
		closeForm,
	} = supplierStore;
	const initialState = selectedSupplier ?? {
		id: "",
		supplierName: "",
		countryOfOrigin: "",
		description: "",
	};

	const [supplier, setSupplier] = useState(initialState);

	function handlesSubmit() {
		supplier.id ? updateSupplier(supplier) : createSupplier(supplier);
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setSupplier({ ...supplier, [name]: value });
	}
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
