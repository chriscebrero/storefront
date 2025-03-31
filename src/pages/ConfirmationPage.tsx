import { useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { downloadAsJSON } from "../utils/saveToFile";

const ConfirmationPage = () => {
	const { cart, extras, userData, setCart, setExtras, setUserData, setStage } =
		useStore();

	const combinedItems = [...cart, ...extras];
	const total = combinedItems.reduce((sum, item) => sum + item.price, 0);

	useEffect(() => {
		const orderData = {
			customer: userData,
			cart,
			extras,
			total,
			date: new Date().toISOString(),
		};
		downloadAsJSON(orderData, `order-${Date.now()}.json`);
	}, []);

	return (
		<div className="confirmation">
			<h2>
				🎉 <span style={{ color: "#3a4c64" }}>Order Confirmed!</span>
			</h2>
			<p>
				Thanks, <strong>{userData.name}</strong>! We've received your order.
			</p>
			<p>
				A confirmation email has been sent to <strong>{userData.email}</strong>.
			</p>

			<h3 style={{ marginTop: "2rem" }}>Order Summary:</h3>

			<ul className="confirmation-list">
				{combinedItems.map((item) => (
					<li key={item.id} className="confirmation-item">
						{item.thumbnail && (
							<img
								src={item.thumbnail}
								alt={item.title}
								className="confirmation-thumb"
							/>
						)}
						<div>
							<p>
								{item.title} – ${item.price.toFixed(2)}
							</p>
						</div>
					</li>
				))}
			</ul>

			<p style={{ marginTop: "1.5rem", fontWeight: "bold" }}>
				Total Paid: ${total.toFixed(2)}
			</p>

			<button
				onClick={() => {
					setCart([]);
					setExtras([]);
					setUserData({
						name: "",
						email: "",
						address: "",
						card: "",
					});
					setStage("browse");
				}}
				style={{
					marginTop: "2rem",
					padding: "0.75rem 1.5rem",
					backgroundColor: "#d9edc2",
					border: "none",
					borderRadius: "12px",
					fontSize: "1rem",
					fontWeight: "bold",
					cursor: "pointer",
					transition: "0.3s",
				}}
			>
				⬅️ Back to Store
			</button>
		</div>
	);
};

export default ConfirmationPage;
