import { Product } from "../types";

export const toggleProduct = (
	product: Product,
	list: Product[],
	setter: (val: Product[]) => void
) => {
	if (list.find((item) => item.id === product.id)) {
		setter(list.filter((item) => item.id !== product.id));
	} else {
		setter([...list, product]);
	}
};
