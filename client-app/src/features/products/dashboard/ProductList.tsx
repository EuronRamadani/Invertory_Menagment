import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Card, Item } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";
import { useStore } from "../../../app/stores/store";

export default observer(function ProductList() {
	const { productStore } = useStore();
	const {
		deleteProduct,
		productsByDate,
		loading,
		selectProduct,
	} = productStore;
	const [target, setTarget] = useState("");

	function handleProductDelete(
		e: SyntheticEvent<HTMLButtonElement>,
		id: string
	) {
		setTarget(e.currentTarget.name);
		deleteProduct(id);
	}
	return (
		<Card fluid>
			{productsByDate.map((product) => (
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
								name={product.id}
								loading={loading && target === product.id}
								onClick={(e) => handleProductDelete(e, product.id)}
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
});
