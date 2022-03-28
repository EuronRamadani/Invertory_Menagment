import { Supplier } from "./../layout/models/supplier";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class SupplierStore {
	supplierRegistry = new Map<string, Supplier>();
	selectedSupplier: Supplier | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = true;

	constructor() {
		makeAutoObservable(this);
	}

	get suppliersByDate() {
		return Array.from(this.supplierRegistry.values()).sort(
			(a, b) => Date.parse(a.id) - Date.parse(b.id)
		);
	}

	loadSuppliers = async () => {
		try {
			const suppliers = await agent.Suppliers.list();

			suppliers.forEach((supplier) => {
				this.supplierRegistry.set(supplier.id, supplier);
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	selectSupplier = (id: string) => {
		this.selectedSupplier = this.supplierRegistry.get(id);
	};

	cancelSelectedSupplier = () => {
		this.selectedSupplier = undefined;
	};

	openForm = (id?: string) => {
		id ? this.selectSupplier(id) : this.cancelSelectedSupplier();
		this.editMode = true;
	};

	closeForm = () => {
		this.editMode = false;
	};

	createSupplier = async (supplier: Supplier) => {
		this.loading = true;
		supplier.id = uuid();
		try {
			await agent.Suppliers.create(supplier);
			runInAction(() => {
				this.supplierRegistry.set(supplier.id, supplier);
				this.selectedSupplier = supplier;
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

	updateSupplier = async (supplier: Supplier) => {
		this.loading = true;
		try {
			await agent.Suppliers.update(supplier);
			runInAction(() => {
				this.supplierRegistry.set(supplier.id, supplier);
				this.selectedSupplier = supplier;
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

	deleteSupplier = async (id: string) => {
		this.loading = true;
		try {
			await agent.Suppliers.delete(id);
			runInAction(() => {
				this.supplierRegistry.delete(id);
				if (this.selectedSupplier?.id === id) this.cancelSelectedSupplier();
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
