import { observer } from "mobx-react-lite";
import { Fragment, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image, Item } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { format } from "date-fns";

export default observer(function ProductList() {
	const { productStore } = useStore();
	const { deleteProduct, productsByDate, loading } = productStore;
	const [target, setTarget] = useState("");
	const {
		userStore: { user },
	} = useStore();

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
					<Image
						src={`/ProductImages/${product.productName}.png`}
						// wrapped
						ui={false}
						style={{ height: "200px", width: "695px" }}
					/>
					<Card.Content>
						<Card.Header>{product.productName}</Card.Header>
						<Card.Header>{product.sku}</Card.Header>
						<Card.Meta>
							<span className="date">
								{format(product.dateCreated!, "dd MMM yyyy h:mm aa")} -
								{format(product.expirationDate!, "dd MMM yyyy h:mm aa")}
							</span>
						</Card.Meta>
						<Card.Description>
							<div>Description: {product.description}</div>
							<div>Quantity: {product.quantity}</div>
							{/* <div>Price: {product.price}</div>
							<div>Category: {product.categoryName}</div>
							<div>Manufacture: {product.manufactureName}</div> */}
						</Card.Description>
						<Card.Content extra></Card.Content>
						<Item.Extra style={{ marginRight: "5px" }}>
							<Button
								as={Link}
								to={`/products/${product.id}`}
								floated="right"
								content="View"
								color="blue"
							/>
							{user?.isAdmin ? (
								<Button
									name={product.id}
									loading={loading && target === product.id}
									onClick={(e) => handleProductDelete(e, product.id)}
									floated="right"
									content="Delete"
									color="red"
								/>
							) : (
								<Fragment />
							)}
						</Item.Extra>
					</Card.Content>
				</Item.Group>
			))}
		</Card>
	);
});
