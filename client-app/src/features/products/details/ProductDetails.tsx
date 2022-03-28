import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Product } from "../../../app/layout/models/product";
import { useStore } from "../../../app/stores/store";

export default function ProductDetails() {
	const { productStore } = useStore();
	const {
		selectedProduct: product,
		cancelSelectedProduct,
		openForm,
	} = productStore;

	if (!product) return <LoadingComponent content={""} />;
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
						onClick={cancelSelectedProduct}
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
}
