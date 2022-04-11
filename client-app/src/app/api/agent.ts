import { store } from "./../stores/store";
import { UserFormValues } from "./../layout/models/User";
import { Category } from "./../layout/models/category";
import axios, { AxiosResponse } from "axios";
import { Manufacture } from "../layout/models/manufacture";
import { Product } from "../layout/models/product";
import { Supplier } from "../layout/models/supplier";
import { User } from "../layout/models/User";

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config: any) => {
	const token = store.commonStore.token;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axios.interceptors.response.use(async (response) => {
	try {
		await sleep(1000);
		return response;
	} catch (err) {
		console.log(err);
		return await Promise.reject(err);
	}
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Categories = {
	list: () => requests.get<Category[]>("/categories"),
	details: (id: string) => requests.get<Category>(`/categories/${id}`),
	create: (category: Category) => requests.post<void>("/categories", category),
	update: (category: Category) =>
		requests.put<void>(`/categories/${category.id}`, category),
	delete: (id: string) => requests.delete<void>(`/categories/${id}`),
};
const Manufactures = {
	list: () => requests.get<Manufacture[]>("/manufactures"),
	details: (id: string) => requests.get<Manufacture>(`/manufactures/${id}`),
	create: (manufacture: Manufacture) =>
		requests.post<void>("/manufactures", manufacture),
	update: (manufacture: Manufacture) =>
		requests.put<void>(`/manufactures/${manufacture.id}`, manufacture),
	delete: (id: string) => requests.delete<void>(`/manufactures/${id}`),
};
const Products = {
	list: () => requests.get<Product[]>("/products"),
	details: (id: string) => requests.get<Product>(`/products/${id}`),

	create: (product: Product) => requests.post<void>("/products", product),
	update: (product: Product) =>
		requests.put<void>(`/products/${product.id}`, product),
	delete: (id: string) => requests.delete<void>(`/products/${id}`),
};
const Suppliers = {
	list: () => requests.get<Supplier[]>("/suppliers"),
	details: (id: string) => requests.get<Supplier>(`/suppliers/${id}`),
	create: (supplier: Supplier) => requests.post<void>("/suppliers", supplier),
	update: (supplier: Supplier) =>
		requests.put<void>(`/suppliers/${supplier.id}`, supplier),
	delete: (id: string) => requests.delete<void>(`/suppliers/${id}`),
};

const Account = {
	current: () => requests.get<User>("/account"),
	login: (user: UserFormValues) => requests.post<User>("/account/login", user),
	register: (user: UserFormValues) =>
		requests.post<User>("/account/register", user),
};

const agent = {
	Categories,
	Manufactures,
	Products,
	Suppliers,
	Account,
};

export default agent;
