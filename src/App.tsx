import React from "react";
import "./App.css";
import BrowsePage from "./pages/BrowsePage";
import UpsellPage from "./pages/UpsellPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { useStore } from "./context/StoreContext";

function App() {
	const { stage } = useStore();

	return (
		<div className="container">
			<h1>🛍️ Online Store</h1>

			{stage === "browse" && <BrowsePage />}
			{stage === "upsell" && <UpsellPage />}
			{stage === "checkout" && <CheckoutPage />}
			{stage === "confirmation" && <ConfirmationPage />}
		</div>
	);
}

export default App;
