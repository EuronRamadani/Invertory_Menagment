import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ManufactureDetails() {
	const { manufactureStore } = useStore();

	const {
		selectedManufacture: manufacture,
		loadManufacture,
		loadingInitial,
	} = manufactureStore;
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) loadManufacture(id);
	}, [id, loadManufacture]);

	if (loadingInitial || !manufacture) return <LoadingComponent content={""} />;

	return (
		<Card fluid>
			<Image />
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
						as={Link}
						to={`/manageManufacture/${manufacture.id}`}
						basic
						color="blue"
						content="Edit"
					/>
					<Button
						as={Link}
						to="/manufactures"
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
});
