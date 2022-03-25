import React from "react";
import { Button, Card, Item } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";

interface Props {
	products: Product[];
	selectProduct: (id: string) => void;
	deleteProduct: (id: string) => void;
}

export default function ProductListList({
	products,
	selectProduct,
	deleteProduct,
}: Props) {
	return (
		// <Segment>
		// 	<Item.Group>
		// 		{products.map((product) => (
		// 			<Item key={product.id}>
		// 				<Item.Image
		// 					size="small"
		// 					src="https://react.semantic-ui.com/images/wireframe/image.png"
		// 				/>

		// 				<Item.Content>
		// 					<Item.Header as="a">{product.productName}</Item.Header>
		// 					<Item.Meta>
		// 						{product.dateCreated} - {product.expirationDate}
		// 					</Item.Meta>
		// 					<Item.Description>
		// 						<div>{product.description}</div>
		// 					</Item.Description>

		// 					<Item.Extra>
		// 						<Button floated="right" content="View" color="blue" />
		// 						<Label basic content={product.price} />
		// 					</Item.Extra>
		// 				</Item.Content>
		// 			</Item>
		// 		))}
		// 	</Item.Group>
		// </Segment>

		<Card fluid>
			{products.map((product) => (
				<Item.Group key={product.id}>
					{/* <Image
						src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
						wrapped
						ui={false}
					/> */}
					<Card.Content>
						<Card.Header>{product.productName}</Card.Header>
						<Card.Header>{product.sku}</Card.Header>
						<Card.Meta>
							<span className="date">
								{product.dateCreated} - {product.expirationDate}
							</span>
						</Card.Meta>
						<Card.Description>
							<div>{product.description}</div>
							<div>{product.quantity}</div>
						</Card.Description>
						<Card.Content extra>{product.price}</Card.Content>
						<Item.Extra>
							<Button
								onClick={() => selectProduct(product.id)}
								floated="right"
								content="View"
								color="blue"
							/>
							<Button
								onClick={() => deleteProduct(product.id)}
								floated="right"
								content="Delete"
								color="red"
							/>
						</Item.Extra>
					</Card.Content>
				</Item.Group>
			))}
		</Card>
	);
}
