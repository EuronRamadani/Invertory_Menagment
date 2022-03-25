import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Manufacture } from "../../../app/layout/models/manufacture";

interface Props {
	manufacture: Manufacture;
	cancelSelectManufacture: () => void;
	openForm: (id: string) => void;
}

export default function ManufactureDetails({
	manufacture,
	cancelSelectManufacture,
	openForm,
}: Props) {
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
						onClick={cancelSelectManufacture}
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
}
