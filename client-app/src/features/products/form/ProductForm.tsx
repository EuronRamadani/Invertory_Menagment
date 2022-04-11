import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Category } from "../../../app/layout/models/category";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Product } from "../../../app/layout/models/product";
import { Manufacture } from "../../../app/layout/models/manufacture";

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
	// @ts-ignore
	const [data, setData] = useState<Category[]>([] as categoryName);
	const [selected, setSelected] = useState("");
	const [selectedManu, setSelectedManu] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/categories")
			.then((res) => setData(res.data));
	}, []);
	//@ts-ignore
	const [dataManu, setDataManu] = useState<Manufacture[]>([] as manufacture);

	useEffect(() => {
		axios.get("http://localhost:5000/api/manufactures").then((res) => {
			setDataManu(res.data);
		});
	}, []);

	const [product, setProduct] = useState<Product>({
		id: "",
		productName: "",
		sku: "",
		description: "",
		quantity: 0,
		price: 0,
		dateCreated: null,
		expirationDate: null,
		categoryName: "",
		manufactureName: "",
	});

	useEffect(() => {
		if (id) loadProduct(id).then((product) => setProduct(product!));
	}, [id, loadProduct]);

	const validationSchema = Yup.object({
		productName: Yup.string().required("Product name is required"),
		description: Yup.string().required(),
		sku: Yup.string().required(),
		quantity: Yup.number().required().min(1).max(5),
		price: Yup.number().required().min(1).max(100),
		dateCreated: Yup.string().required("Date is required").nullable(),
		expirationDate: Yup.string().required("Date is required").nullable(),
	});

	function handleFormSubmit(product: Product) {
		if (product.id.length === 0) {
			let newProduct = {
				...product,
				categoryName: selected,
				manufactureName: selectedManu,
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

	// function handleInputChange(
	// 	event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	// ) {
	// 	const { name, value } = event.target;
	// 	setProduct({ ...product, [name]: value });
	// }

	function changeSelectOptionHandler(event: {
		target: { value: any; name?: any };
	}) {
		const { value } = event.target;
		setSelected(value);
		// setSelectedManu(value);
	}
	function changeSelectOptionHandlerManu(event: {
		target: { value: any; name?: any };
	}) {
		const { value } = event.target;
		setSelectedManu(value);
		// setSelectedManu(value);
	}

	if (loadingInitial) return <LoadingComponent content="Loading product ..." />;

	return (
		<Segment clearing>
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={product}
				onSubmit={(values) => handleFormSubmit(values)}
			>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<MyTextInput placeholder="Product Name" name="productName" />
						<MyTextInput placeholder="SKU" name="sku" />
						<MyTextArea rows={3} placeholder="Description" name="description" />
						<MyTextInput placeholder="Quality" name="quantity" />
						<MyTextInput placeholder="Price" name="price" />
						<MyDateInput
							showTimeSelect
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm aa"
							placeholderText="Created date"
							name="dateCreated"
						/>
						<MyDateInput
							showTimeSelect
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm aa"
							placeholderText="Expire date"
							name="expirationDate"
						/>
						<select
							style={{ marginBottom: "15px" }}
							onChange={changeSelectOptionHandler}
							name="category"
							placeholder="Category"
							value={id ? product.categoryName : selected}
						>
							{data.map((category) => (
								<option key={category.id}>{category.categoryName}</option>
							))}
						</select>
						<select
							onChange={changeSelectOptionHandlerManu}
							name="manufacture"
							placeholder="Manufacture"
							value={id ? product.manufactureName : selectedManu}
						>
							{dataManu.map((manufacture) => (
								<option key={manufacture.id}>
									{manufacture.manufacturerName}
								</option>
							))}
						</select>
						<Button
							disabled={isSubmitting || !dirty || !isValid}
							loading={loading}
							floated="right"
							positive
							type="submit"
							content="Submit"
						/>
						<Button
							as={Link}
							to="/products"
							floated="right"
							type="button"
							content="Cancel"
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
});
