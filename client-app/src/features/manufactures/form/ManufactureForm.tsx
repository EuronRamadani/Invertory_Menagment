import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ManufactureForm() {
	const { manufactureStore } = useStore();
	const {
		selectedManufacture,
		closeForm,
		createManufacture,
		updateManufacture,
		loading,
	} = manufactureStore;

	const initialState = selectedManufacture ?? {
		id: "",
		manufacturerName: "",
		description: "",
		countryOfOrigin: "",
	};

	const [manufacture, setManufacture] = useState(initialState);

	function handlesSubmit() {
		manufacture.id
			? updateManufacture(manufacture)
			: createManufacture(manufacture);
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setManufacture({ ...manufacture, [name]: value });
	}

	return (
		<Segment clearing>
			<Form onSubmit={handlesSubmit} autoComplete="off">
				<Form.Input
					placeholder="Manufacture Name"
					value={manufacture.manufacturerName}
					name="manufacturerName"
					onChange={handleInputChange}
				/>
				<Form.TextArea
					placeholder="Description"
					value={manufacture.description}
					name="description"
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder="Country of origin"
					value={manufacture.countryOfOrigin}
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
