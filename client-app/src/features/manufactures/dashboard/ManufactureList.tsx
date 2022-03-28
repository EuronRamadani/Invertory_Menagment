import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ManufactureList() {
	const { manufactureStore } = useStore();
	const {
		deleteManufacture,
		manufacturesByDate,
		loading,
		selectManufacture,
	} = manufactureStore;

	const [target, setTarget] = useState("");

	function handleManufactureDelete(
		e: SyntheticEvent<HTMLButtonElement>,
		id: string
	) {
		setTarget(e.currentTarget.name);
		deleteManufacture(id);
	}
	return (
		<Segment>
			<Item.Group>
				{manufacturesByDate.map((manufacture) => (
					<Item key={manufacture.id}>
						<Item.Image
							size="small"
							src="https://react.semantic-ui.com/images/wireframe/image.png"
						/>

						<Item.Content>
							<Item.Header as="a">{manufacture.manufacturerName}</Item.Header>
							<Item.Description>{manufacture.description}</Item.Description>
							<Item.Extra>
								<Button
									onClick={() => selectManufacture(manufacture.id)}
									floated="right"
									content="View"
									color="blue"
								/>
								<Button
									name={manufacture.id}
									loading={loading && target === manufacture.id}
									onClick={(e) => handleManufactureDelete(e, manufacture.id)}
									floated="right"
									content="Delete"
									color="red"
								/>
								<Label basic content={manufacture.countryOfOrigin} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
});
