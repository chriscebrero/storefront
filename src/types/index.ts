export type Product = {
	id: number;
	title: string;
	price: number;
	description?: string;
	thumbnail?: string;
};

export type UserData = {
	name: string;
	email: string;
	address: string;
	card: string;
};
