import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ManufactureDetails() {
	const { manufactureStore } = useStore();

	const {
		selectedManufacture: manufacture,
		openForm,
		cancelSelectedManufacture,
	} = manufactureStore;

	if (!manufacture) return <LoadingComponent content={""} />;

	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/drinks.jpg`} />
			<Card.Content>
				<Card.Header>{manufacture.manufacturerName}</Card.Header>
				{/* <Card.Meta>
					<span className="date">Joined in 2015</span>
				</Card.Meta> */}
				<Card.Description>
					{manufacture.description}
					<div>{manufacture.countryOfOrigin}</div>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group>
					<Button
						onClick={() => openForm(manufacture.id)}
						basic
						color="blue"
						content="Edit"
					/>
					<Button
						onClick={cancelSelectedManufacture}
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
}
