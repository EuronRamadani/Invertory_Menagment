import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../layout/models/User";
import { store } from "./store";
import { history } from "../..";

export default class userStore {
	user: User | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	get isLoggedIn() {
		return !!this.user;
	}

	login = async (creds: UserFormValues) => {
		try {
			const user = await agent.Account.login(creds);
			store.commonStore.setToken(user.token);
			runInAction(() => {
				this.user = user;
			});
			history.push("/products");
			store.modalStore.closeModal();
		} catch (error) {
			throw error;
		}
	};

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem("jwt");
		this.user = null;
		history.push("/");
	};

	getUser = async () => {
		try {
			const user = await agent.Account.current();
			// var temp = user.displayName;
			runInAction(() => {
				this.user = user;
				// this.temp = temp;
			});
		} catch (error) {
			console.log(error);
		}
	};

	register = async (creds: UserFormValues) => {
		try {
			const user = await agent.Account.register(creds);
			store.commonStore.setToken(user.token);
			runInAction(() => {
				this.user = user;
			});
			history.push("/products");
			store.modalStore.closeModal();
		} catch (error) {
			throw error;
		}
	};
}
