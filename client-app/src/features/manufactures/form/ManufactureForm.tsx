import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

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

	useEffect(() => {
		if (id)
			loadManufacture(id).then((manufacture) => setManufacture(manufacture!));
	}, [id, loadManufacture]);

	function handlesSubmit() {
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

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setManufacture({ ...manufacture, [name]: value });
	}

	if (loadingInitial)
		return <LoadingComponent content="Loading manufacture ..." />;

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
				<Button floated="right" type="button" content="Cancel" />
			</Form>
		</Segment>
	);
});
