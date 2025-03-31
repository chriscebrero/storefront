import React, { useState, useEffect } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { toggleProduct } from "../utils/toggleProduct";
import { useStore } from "../context/StoreContext";
import axios from "axios";
import { Product } from "../types";

const BrowsePage = () => {
	const [loading, setLoading] = useState(true);
	const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
	const { cart, setCart, goToNextStage } = useStore();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await axios.get("https://dummyjson.com/products?limit=8");
				const { data } = res;
				setFetchedProducts(data.products);
			} catch (err) {
				console.error("Failed to fetch products:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	return (
		<>
			<h2>Choose Products:</h2>
			{loading && <p>Loading products...</p>}
			{!loading &&
				fetchedProducts.map((product) => (
					<ProductCard
						key={product.id}
						item={product}
						selected={!!cart.find((p) => p.id === product.id)}
						onClick={() => toggleProduct(product, cart, setCart)}
					/>
				))}
			<div className="button-row">
				<button onClick={goToNextStage}>Continue →</button>
			</div>
		</>
	);
};

export default BrowsePage;
