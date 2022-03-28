import { createContext, useContext } from "react";
import CategoryStore from "./categoryStore";
import ManufactureStore from "./manufactureStore";
import ProductStore from "./productStore";
import SupplierStore from "./supplierStore";

interface Store {
	categoryStore: CategoryStore;
	manufactureStore: ManufactureStore;
	productStore: ProductStore;
	supplierStore: SupplierStore;
}

export const store: Store = {
	categoryStore: new CategoryStore(),
	manufactureStore: new ManufactureStore(),
	productStore: new ProductStore(),
	supplierStore: new SupplierStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
