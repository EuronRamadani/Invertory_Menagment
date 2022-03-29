import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

export default observer(function ProductForm() {
	const history = useHistory();
	const { productStore } = useStore();
	const {
		createProduct,
		updateProduct,
		loading,
		loadingInitial,
		loadProduct,
	} = productStore;
	const { id } = useParams<{ id: string }>();

	const [product, setProduct] = useState({
		id: "",
		productName: "",
		sku: "",
		description: "",
		quantity: "",
		price: "",
		dateCreated: "",
		expirationDate: "",
	});

	useEffect(() => {
		if (id) loadProduct(id).then((product) => setProduct(product!));
	}, [id, loadProduct]);

	function handlesSubmit() {
		if (product.id.length === 0) {
			let newProduct = {
				...product,
				id: uuid(),
			};
			createProduct(newProduct).then(() =>
				history.push(`/products/${newProduct.id}`)
			);
		} else {
			updateProduct(product).then(() =>
				history.push(`/products/${product.id}`)
			);
		}
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setProduct({ ...product, [name]: value });
	}

	if (loadingInitial) return <LoadingComponent content="Loading product ..." />;

	return (
		<Segment clearing>
			<Form onSubmit={handlesSubmit} autoComplete="off">
				<Form.Input
					placeholder="Product Name"
					value={product.productName}
					name="productName"
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder="SKU"
					value={product.sku}
					name="sku"
					onChange={handleInputChange}
				/>
				<Form.TextArea
					placeholder="Description"
					value={product.description}
					name="description"
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder="Quality"
					value={product.quantity}
					name="quantity"
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder="Price"
					value={product.price}
					name="price"
					onChange={handleInputChange}
				/>
				<Form.Input
					type="date"
					placeholder="Created date"
					value={product.dateCreated}
					name="dateCreated"
					onChange={handleInputChange}
				/>
				<Form.Input
					type="date"
					placeholder="Expire date"
					value={product.expirationDate}
					name="expirationDate"
					onChange={handleInputChange}
				/>
				<Button
					loading={loading}
					floated="right"
					positive
					type="submit"
					content="Submit"
				/>
				<Button floated="right" type="button" content="Cancel" />
			</Form>
		</Segment>
	);
});
