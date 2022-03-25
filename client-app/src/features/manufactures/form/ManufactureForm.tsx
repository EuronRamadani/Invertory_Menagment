import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Manufacture } from "../../../app/layout/models/manufacture";

interface Props {
	category: Manufacture | undefined;
	closeForm: () => void;
	createOrEdit: (manufacture: Manufacture) => void;
}

export default function ManufactureForm({
	category: selectedManufacture,
	closeForm,
	createOrEdit,
}: Props) {
	const initialState = selectedManufacture ?? {
		id: "",
		manufacturerName: "",
		description: "",
		countryOfOrigin: "",
	};

	const [manufacture, setManufacture] = useState(initialState);

	function handlesSubmit() {
		createOrEdit(manufacture);
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
