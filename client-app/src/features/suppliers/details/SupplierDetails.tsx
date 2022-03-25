import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Supplier } from "../../../app/layout/models/supplier";

interface Props {
	supplier: Supplier;
	cancelSelectSupplier: () => void;
	openForm: (id: string) => void;
}

export default function SupplierDetails({
	supplier,
	cancelSelectSupplier,
	openForm,
}: Props) {
	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/drinks.jpg`} />
			<Card.Content>
				<Card.Header>{supplier.supplierName}</Card.Header>
				{/* <Card.Meta>
					<span className="date">Joined in 2015</span>
				</Card.Meta> */}
				<Card.Description>
					{supplier.description}
					<div>{supplier.countryOfOrigin}</div>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group>
					<Button
						onClick={() => openForm(supplier.id)}
						basic
						color="blue"
						content="Edit"
					/>
					<Button
						onClick={cancelSelectSupplier}
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
}
