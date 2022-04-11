import { Manufacture } from "./../layout/models/manufacture";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

export default class ManufactureStore {
	manufactureRegistry = new Map<string, Manufacture>();
	selectedManufacture: Manufacture | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;

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
				this.setManufacture(manufacture);
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	loadManufacture = async (id: string) => {
		let manufacture = this.getManufacture(id);
		if (manufacture) {
			this.selectedManufacture = manufacture;
			return manufacture;
		} else {
			this.loadingInitial = true;
			try {
				manufacture = await agent.Manufactures.details(id);
				this.setManufacture(manufacture);
				runInAction(() => {
					this.selectedManufacture = manufacture;
				});
				this.setLoadingInitial(false);
				return manufacture;
			} catch (error) {
				console.log(error);
				this.setLoadingInitial(false);
			}
		}
	};

	private setManufacture = (manufacture: Manufacture) => {
		this.manufactureRegistry.set(manufacture.id, manufacture);
	};

	private getManufacture = (id: string) => {
		return this.manufactureRegistry.get(id);
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	createManufacture = async (manufacture: Manufacture) => {
		this.loading = true;

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
