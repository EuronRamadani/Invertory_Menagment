import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
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

	const {
		userStore: { user },
	} = useStore();

	useEffect(() => {
		if (id) loadManufacture(id);
	}, [id, loadManufacture]);

	if (loadingInitial || !manufacture) return <LoadingComponent content={""} />;

	return (
		<Card style={{ width: "70%", marginLeft: "10%" }}>
			<Image src={`/manufactureImages/${manufacture.manufacturerName}.jpeg`} />
			<Card.Content>
				<Card.Header>{manufacture.manufacturerName}</Card.Header>
				{/* <Card.Meta>
					<span className="date">Joined in 2015</span>
				</Card.Meta> */}
				<Card.Description>
					Description: {manufacture.description}
					<div>Country of origin: {manufacture.countryOfOrigin}</div>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group>
					{user?.isAdmin ? (
						<Button
							fluid
							as={Link}
							to={`/manageManufacture/${manufacture.id}`}
							basic
							color="blue"
							content="Edit"
						/>
					) : (
						<Fragment />
					)}
					<Button
						fluid
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
