import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";

interface Props {
	product: Product;
	cancelSelectProduct: () => void;
	openForm: (id: string) => void;
}

export default function ProductDetails({
	product,
	cancelSelectProduct,
	openForm,
}: Props) {
	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/drinks.jpg`} />
			<Card.Content>
				<Card.Header>{product.productName}</Card.Header>
				<Card.Meta>
					<span className="date">
						{product.dateCreated} - {product.expirationDate}
					</span>
				</Card.Meta>
				<Card.Description>
					{product.description} - {product.quantity}
					<div>Price: {product.price}</div>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group>
					<Button
						onClick={() => openForm(product.id)}
						basic
						color="blue"
						content="Edit"
					/>
					<Button
						onClick={cancelSelectProduct}
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
}
