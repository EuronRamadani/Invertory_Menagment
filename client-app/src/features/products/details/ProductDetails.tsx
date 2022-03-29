import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ProductDetails() {
	const { productStore } = useStore();
	const {
		selectedProduct: product,
		loadProduct,
		loadingInitial,
	} = productStore;
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) loadProduct(id);
	}, [id, loadProduct]);

	if (loadingInitial || !product) return <LoadingComponent content={""} />;
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
						as={Link}
						to={`/manageProduct/${product.id}`}
						basic
						color="blue"
						content="Edit"
					/>
					<Button
						as={Link}
						to="/products"
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
});
