import { Manufacture } from "./../layout/models/manufacture";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ManufactureStore {
	manufactureRegistry = new Map<string, Manufacture>();
	selectedManufacture: Manufacture | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = true;

	constructor() {
		makeAutoObservable(this);
	}

	get manufacturesByDate() {
		return Array.from(this.manufactureRegistry.values()).sort(
			(a, b) => Date.parse(a.id) - Date.parse(b.id)
		);
	}

	loadManufactures = async () => {
		try {
			const manufactures = await agent.Manufactures.list();

			manufactures.forEach((manufacture) => {
				this.manufactureRegistry.set(manufacture.id, manufacture);
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

	selectManufacture = (id: string) => {
		this.selectedManufacture = this.manufactureRegistry.get(id);
	};

	cancelSelectedManufacture = () => {
		this.selectedManufacture = undefined;
	};

	openForm = (id?: string) => {
		id ? this.selectManufacture(id) : this.cancelSelectedManufacture();
		this.editMode = true;
	};

	closeForm = () => {
		this.editMode = false;
	};

	createManufacture = async (manufacture: Manufacture) => {
		this.loading = true;
		manufacture.id = uuid();
		try {
			await agent.Manufactures.create(manufacture);
			runInAction(() => {
				this.manufactureRegistry.set(manufacture.id, manufacture);
				this.selectedManufacture = manufacture;
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

	updateManufacture = async (manufacture: Manufacture) => {
		this.loading = true;
		try {
			await agent.Manufactures.update(manufacture);
			runInAction(() => {
				this.manufactureRegistry.set(manufacture.id, manufacture);
				this.selectedManufacture = manufacture;
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

	deleteManufacture = async (id: string) => {
		this.loading = true;
		try {
			await agent.Manufactures.delete(id);
			runInAction(() => {
				this.manufactureRegistry.delete(id);
				if (this.selectedManufacture?.id === id)
					this.cancelSelectedManufacture();
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
