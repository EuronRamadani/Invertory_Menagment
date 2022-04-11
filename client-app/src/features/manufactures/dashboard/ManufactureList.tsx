import { observer } from "mobx-react-lite";
import { Fragment, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ManufactureList() {
	const { manufactureStore } = useStore();
	const { deleteManufacture, manufacturesByDate, loading } = manufactureStore;
	const {
		userStore: { user },
	} = useStore();

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
							src={`/categoryImages/${manufacture.manufacturerName}.jpg`}
						/>

						<Item.Content>
							<Item.Header as="a">{manufacture.manufacturerName}</Item.Header>
							<Item.Description>{manufacture.description}</Item.Description>
							<Item.Extra>
								<Button
									as={Link}
									to={`/manufactures/${manufacture.id}`}
									floated="right"
									content="View"
									color="blue"
								/>
								{user?.isAdmin ? (
									<Button
										name={manufacture.id}
										loading={loading && target === manufacture.id}
										onClick={(e) => handleManufactureDelete(e, manufacture.id)}
										floated="right"
										content="Delete"
										color="red"
									/>
								) : (
									<Fragment />
								)}
								<Label basic content={manufacture.countryOfOrigin} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
});
