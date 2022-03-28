import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";
import { useStore } from "../../../app/stores/store";

export default observer(function ProductForm() {
	const { productStore } = useStore();
	const {
		selectedProduct,
		closeForm,
		createProduct,
		updateProduct,
		loading,
	} = productStore;
	const initialState = selectedProduct ?? {
		id: "",
		sku: "",
		productName: "",
		description: "",
		price: "",
		quantity: "",
		dateCreated: "",
		expirationDate: "",
	};

	const [product, setProduct] = useState(initialState);

	function handlesSubmit() {
		product.id ? updateProduct(product) : createProduct(product);
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setProduct({ ...product, [name]: value });
	}
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
				<Button
					onClick={closeForm}
					floated="right"
					type="button"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
});
