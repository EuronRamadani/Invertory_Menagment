import React from "react";
import "./styles.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Category } from "./models/category";
import NavBar from "./NavBar";
import CategoryDashboard from "../../features/categories/dashboard/CategoryDashboard";
import ManufactureDashboard from "../../features/manufactures/dashboard/ManufactureDashboard";
import { Manufacture } from "./models/manufacture";
import { Product } from "./models/product";
import { Supplier } from "./models/supplier";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import SupplierDashboard from "../../features/suppliers/dashboard/SupplierDashboard";
import { v4 as uuid } from "uuid";

function App() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [manufactures, setManufactures] = useState<Manufacture[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [suppliers, setSuppliers] = useState<Supplier[]>([]);

	const [selectedCategory, setSelectedCategory] = useState<
		Category | undefined
	>(undefined);
	const [selectedManufacture, setSelectedManufacture] = useState<
		Manufacture | undefined
	>(undefined);
	const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
		undefined
	);
	const [selectedSupplier, setSelectedSupplier] = useState<
		Supplier | undefined
	>(undefined);

	const [editCategoryMode, setEditCategoryMode] = useState(false);
	const [editManufactureMode, setEditManufactureMode] = useState(false);
	const [editProductMode, setEditProductMode] = useState(false);
	const [editSupplierMode, setEditSupplierMode] = useState(false);

	useEffect(() => {
		axios
			.get<Category[]>("http://localhost:5000/api/categories")
			.then((res) => {
				setCategories(res.data);
			});
	}, []);

	function handleSelectCategory(id: string) {
		setSelectedCategory(categories.find((x) => x.id === id));
	}

	function handleCancelSelectCategory() {
		setSelectedCategory(undefined);
	}

	function handleCategoryFormOpen(id?: string) {
		id ? handleSelectCategory(id) : handleCancelSelectCategory();
		setEditCategoryMode(true);
	}

	function handleCategoryFormClose() {
		setEditCategoryMode(false);
	}

	function handleCreateOrEditCategory(category: Category) {
		category.id
			? setCategories([
					...categories.filter((x) => x.id !== category.id),
					category,
			  ])
			: setCategories([...categories, { ...category, id: uuid() }]);
		setEditCategoryMode(false);
		setSelectedCategory(category);
	}

	function handleDeleteCategory(id: string) {
		setCategories([...categories.filter((x) => x.id !== id)]);
	}

	useEffect(() => {
		axios
			.get<Manufacture[]>("http://localhost:5000/api/manufactures")
			.then((res) => {
				setManufactures(res.data);
			});
	}, []);

	function handleSelectManufacture(id: string) {
		setSelectedManufacture(manufactures.find((x) => x.id === id));
	}

	function handleCancelSelectManufacture() {
		setSelectedManufacture(undefined);
	}

	function handleManufactureFormOpen(id?: string) {
		id ? handleSelectManufacture(id) : handleCancelSelectManufacture();
		setEditManufactureMode(true);
	}

	function handleManufactureFormClose() {
		setEditManufactureMode(false);
	}

	function handleCreateOrEditManufacture(manufacture: Manufacture) {
		manufacture.id
			? setManufactures([
					...manufactures.filter((x) => x.id !== manufacture.id),
					manufacture,
			  ])
			: setManufactures([...manufactures, { ...manufacture, id: uuid() }]);
		setEditManufactureMode(false);
		setSelectedManufacture(manufacture);
	}

	function handleDeleteManufacture(id: string) {
		setManufactures([...manufactures.filter((x) => x.id !== id)]);
	}

	useEffect(() => {
		axios.get<Product[]>("http://localhost:5000/api/products").then((res) => {
			setProducts(res.data);
		});
	}, []);

	function handleSelectProduct(id: string) {
		setSelectedProduct(products.find((x) => x.id === id));
	}

	function handleCancelSelectProduct() {
		setSelectedProduct(undefined);
	}

	function handleProductFormOpen(id?: string) {
		id ? handleSelectProduct(id) : handleCancelSelectProduct();
		setEditProductMode(true);
	}

	function handleProductFormClose() {
		setEditProductMode(false);
	}

	function handleCreateOrEditProduct(product: Product) {
		product.id
			? setProducts([...products.filter((x) => x.id !== product.id), product])
			: setProducts([...products, { ...product, id: uuid() }]);
		setEditProductMode(false);
		setSelectedProduct(product);
	}

	function handleDeleteProduct(id: string) {
		setProducts([...products.filter((x) => x.id !== id)]);
	}

	useEffect(() => {
		axios.get<Supplier[]>("http://localhost:5000/api/suppliers").then((res) => {
			setSuppliers(res.data);
		});
	}, []);

	function handleSelectSupplier(id: string) {
		setSelectedSupplier(suppliers.find((x) => x.id === id));
	}

	function handleCancelSelectSupplier() {
		setSelectedSupplier(undefined);
	}

	function handleSupplierFormOpen(id?: string) {
		id ? handleSelectSupplier(id) : handleCancelSelectSupplier();
		setEditSupplierMode(true);
	}

	function handleSupplierFormClose() {
		setEditSupplierMode(false);
	}

	function handleCreateOrEditSupplier(supplier: Supplier) {
		supplier.id
			? setSuppliers([
					...suppliers.filter((x) => x.id !== supplier.id),
					supplier,
			  ])
			: setSuppliers([...suppliers, { ...supplier, id: uuid() }]);
		setEditSupplierMode(false);
		setSelectedSupplier(supplier);
	}

	function handleDeleteSupplier(id: string) {
		setSuppliers([...suppliers.filter((x) => x.id !== id)]);
	}

	return (
		<>
			<NavBar />
			<Container style={{ marginTop: "7em" }}>
				<CategoryDashboard
					categories={categories}
					// categoryy={categories}
					selectedCategory={selectedCategory}
					selectCategory={handleSelectCategory}
					cancelSelectCategory={handleCancelSelectCategory}
					editMode={editCategoryMode}
					openForm={handleCategoryFormOpen}
					openCreateForm={handleCategoryFormOpen}
					closeForm={handleCategoryFormClose}
					createOrEdit={handleCreateOrEditCategory}
					deleteCategory={handleDeleteCategory}
				/>
				<ManufactureDashboard
					manufactures={manufactures}
					selectedManufacture={selectedManufacture}
					selectManufacture={handleSelectManufacture}
					cancelSelectManufacture={handleCancelSelectManufacture}
					editMode={editManufactureMode}
					openForm={handleManufactureFormOpen}
					openCreateForm={handleManufactureFormOpen}
					closeForm={handleManufactureFormClose}
					createOrEdit={handleCreateOrEditManufacture}
					deleteManufacture={handleDeleteManufacture}
				/>
				<ProductDashboard
					products={products}
					selectedProduct={selectedProduct}
					selectProduct={handleSelectProduct}
					cancelSelectProduct={handleCancelSelectProduct}
					editMode={editProductMode}
					openForm={handleProductFormOpen}
					openCreateForm={handleProductFormOpen}
					closeForm={handleProductFormClose}
					createOrEdit={handleCreateOrEditProduct}
					deleteProduct={handleDeleteProduct}
				/>
				<SupplierDashboard
					suppliers={suppliers}
					selectedSupplier={selectedSupplier}
					selectSupplier={handleSelectSupplier}
					cancelSelectSupplier={handleCancelSelectSupplier}
					editMode={editSupplierMode}
					openForm={handleSupplierFormOpen}
					openCreateForm={handleSupplierFormOpen}
					closeForm={handleSupplierFormClose}
					createOrEdit={handleCreateOrEditSupplier}
					deleteSupplier={handleDeleteSupplier}
				/>
			</Container>
		</>
	);
}

export default App;
