export interface Product {
	id: string;
	productName: string;
	sku: string;
	description: string;
	quantity: number;
	price: number;
	dateCreated: Date | null;
	expirationDate: Date | null;
	categoryName: string;
	manufactureName: string;
}
