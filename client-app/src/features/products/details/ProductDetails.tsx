import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { format } from "date-fns";

import { useStore } from "../../../app/stores/store";

export default observer(function ProductDetails() {
	const { productStore } = useStore();
	const {
		selectedProduct: product,
		loadProduct,
		loadingInitial,
	} = productStore;
	const { id } = useParams<{ id: string }>();
	const {
		userStore: { user },
	} = useStore();

	useEffect(() => {
		if (id) loadProduct(id);
	}, [id, loadProduct]);

	if (loadingInitial || !product) return <LoadingComponent content={""} />;
	return (
		<Card style={{ width: "70%", marginLeft: "10%" }}>
			<Image src={`/ProductImages/${product.productName}.png`} />
			<Card.Content>
				<Card.Header>{product.productName}</Card.Header>
				<Card.Meta>
					<span className="date">
						{format(product.dateCreated!, "dd MMM yyyy h:mm aa")} -{" "}
						{format(product.expirationDate!, "dd MMM yyyy h:mm aa")}
					</span>
				</Card.Meta>
				<Card.Description>
					Description: {product.description}
					<div>Quantity: {product.quantity}</div>
					<div>Price: {product.price}</div>
					<div>Category: {product.categoryName}</div>
					<div>Manufacture: {product.manufactureName}</div>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group>
					{user?.isAdmin ? (
						<Button
							fluid
							as={Link}
							to={`/manageProduct/${product.id}`}
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
