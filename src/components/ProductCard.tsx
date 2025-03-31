import React from "react";
import { Product } from "../types";

type Props = {
	item: Product;
	selected: boolean;
	onClick: () => void;
};

export default function ProductCard({ item, selected, onClick }: Props) {
	return (
		<div className={`product ${selected ? "selected" : ""}`} onClick={onClick}>
			<div className="product-left">
				{item.thumbnail && (
					<img src={item.thumbnail} alt={item.title} className="thumbnail" />
				)}
				<div>
					<strong>{item.title}</strong>
					{item.description && (
						<p className="description">{item.description}</p>
					)}
				</div>
			</div>

			<div className="product-price">
				<p>${item.price}</p>
			</div>
		</div>
	);
}
