import { Category } from "./../layout/models/category";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class CategoryStore {
	categoryRegistry = new Map<string, Category>();
	selectedCategory: Category | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = true;

	constructor() {
		makeAutoObservable(this);
	}

	get categoriesByDate() {
		return Array.from(this.categoryRegistry.values()).sort(
			(a, b) => Date.parse(a.id) - Date.parse(b.id)
		);
	}

	loadCategories = async () => {
		try {
			const categories = await agent.Categories.list();

			categories.forEach((category) => {
				this.categoryRegistry.set(category.id, category);
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

	selectCategory = (id: string) => {
		this.selectedCategory = this.categoryRegistry.get(id);
	};

	cancelSelectedCategory = () => {
		this.selectedCategory = undefined;
	};

	openForm = (id?: string) => {
		id ? this.selectCategory(id) : this.cancelSelectedCategory();
		this.editMode = true;
	};

	closeForm = () => {
		this.editMode = false;
	};

	createCategory = async (category: Category) => {
		this.loading = true;
		category.id = uuid();
		try {
			await agent.Categories.create(category);
			runInAction(() => {
				this.categoryRegistry.set(category.id, category);
				this.selectedCategory = category;
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

	updateCategory = async (category: Category) => {
		this.loading = true;
		try {
			await agent.Categories.update(category);
			runInAction(() => {
				this.categoryRegistry.set(category.id, category);
				this.selectedCategory = category;
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

	deleteCategory = async (id: string) => {
		this.loading = true;
		try {
			await agent.Categories.delete(id);
			runInAction(() => {
				this.categoryRegistry.delete(id);
				if (this.selectedCategory?.id === id) this.cancelSelectedCategory();
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
