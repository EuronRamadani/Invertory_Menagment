import { Product } from "./../layout/models/product";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
// import { format } from "date-fns";

export default class ProductStore {
	productRegistry = new Map<string, Product>();
	selectedProduct: Product | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	get productsByDate() {
		return Array.from(this.productRegistry.values()).sort(
			(a, b) => Date.parse(a.id) - Date.parse(b.id)
		);
	}

	loadProducts = async () => {
		try {
			const products = await agent.Products.list();

			products.forEach((product) => {
				this.setProduct(product);
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	loadProduct = async (id: string) => {
		let product = this.getProduct(id);
		if (product) {
			this.selectedProduct = product;
			return product;
		} else {
			this.loadingInitial = true;
			try {
				product = await agent.Products.details(id);
				this.setProduct(product);
				runInAction(() => {
					this.selectedProduct = product;
				});
				this.setLoadingInitial(false);
				return product;
			} catch (error) {
				console.log(error);
				this.setLoadingInitial(false);
			}
		}
	};

	private setProduct = (product: Product) => {
		product.dateCreated = new Date(product.dateCreated!);
		product.expirationDate = new Date(product.expirationDate!);
		this.productRegistry.set(product.id, product);
	};

	private getProduct = (id: string) => {
		return this.productRegistry.get(id);
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	createProduct = async (product: Product) => {
		this.loading = true;

		try {
			await agent.Products.create(product);
			runInAction(() => {
				this.productRegistry.set(product.id, product);
				this.selectedProduct = product;
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateProduct = async (product: Product) => {
		this.loading = true;
		try {
			await agent.Products.update(product);
			runInAction(() => {
				this.productRegistry.set(product.id, product);
				this.selectedProduct = product;
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	deleteProduct = async (id: string) => {
		this.loading = true;
		try {
			await agent.Products.delete(id);
			runInAction(() => {
				this.productRegistry.delete(id);
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};
}
