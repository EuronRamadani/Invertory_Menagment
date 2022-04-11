import { Supplier } from "./../layout/models/supplier";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

export default class SupplierStore {
	supplierRegistry = new Map<string, Supplier>();
	selectedSupplier: Supplier | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;

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

	loadSupplier = async (id: string) => {
		let supplier = this.getSupplier(id);
		if (supplier) {
			this.selectedSupplier = supplier;
			return supplier;
		} else {
			this.loadingInitial = true;
			try {
				supplier = await agent.Suppliers.details(id);
				this.setSupplier(supplier);
				runInAction(() => {
					this.selectedSupplier = supplier;
				});
				this.setLoadingInitial(false);
				return supplier;
			} catch (error) {
				console.log(error);
				this.setLoadingInitial(false);
			}
		}
	};

	private setSupplier = (supplier: Supplier) => {
		this.supplierRegistry.set(supplier.id, supplier);
	};

	private getSupplier = (id: string) => {
		return this.supplierRegistry.get(id);
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	createSupplier = async (supplier: Supplier) => {
		this.loading = true;

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
