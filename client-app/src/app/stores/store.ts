import { createContext, useContext } from "react";
import CategoryStore from "./categoryStore";
import CommonStore from "./commonStore";
import ManufactureStore from "./manufactureStore";
import ModalStore from "./modalStore";
import ProductStore from "./productStore";
import SupplierStore from "./supplierStore";
import userStore from "./userStore";

interface Store {
	categoryStore: CategoryStore;
	manufactureStore: ManufactureStore;
	productStore: ProductStore;
	supplierStore: SupplierStore;
	commonStore: CommonStore;
	userStore: userStore;
	modalStore: ModalStore;
}

export const store: Store = {
	categoryStore: new CategoryStore(),
	manufactureStore: new ManufactureStore(),
	productStore: new ProductStore(),
	supplierStore: new SupplierStore(),
	userStore: new userStore(),
	commonStore: new CommonStore(),
	modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
