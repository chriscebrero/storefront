import { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";

const CheckoutPage = () => {
	const {
		userData,
		setUserData,
		goToNextStage,
		goToPreviousStage,
		cart,
		extras,
	} = useStore();

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
	const [isValid, setIsValid] = useState(false);

	const total = [...cart, ...extras].reduce((sum, item) => sum + item.price, 0);

	useEffect(() => {
		const newErrors: { [key: string]: string } = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!userData.name.trim()) newErrors.name = "Name is required.";
		if (!userData.email.trim()) {
			newErrors.email = "Email is required.";
		} else if (!emailRegex.test(userData.email)) {
			newErrors.email = "Invalid email format.";
		}

		if (!userData.address.trim()) newErrors.address = "Address is required.";

		if (!userData.card.trim()) {
			newErrors.card = "Card number is required.";
		} else if (userData.card.replace(/\\D/g, "").length < 12) {
			newErrors.card = "Card number seems too short.";
		}

		setErrors(newErrors);
		setIsValid(Object.keys(newErrors).length === 0);
	}, [userData]);

	const handleBlur = (field: string) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
	};

	const showError = (field: string) => {
		return touched[field] && errors[field];
	};

	return (
		<div>
			<h2>Checkout</h2>

			<label>Name</label>
			<input
				value={userData.name}
				onChange={(e) => setUserData({ ...userData, name: e.target.value })}
				onBlur={() => handleBlur("name")}
			/>
			{showError("name") && <p className="form-error">{errors.name}</p>}

			<label>Email</label>
			<input
				value={userData.email}
				onChange={(e) => setUserData({ ...userData, email: e.target.value })}
				onBlur={() => handleBlur("email")}
			/>
			{showError("email") && <p className="form-error">{errors.email}</p>}

			<label>Address</label>
			<input
				value={userData.address}
				onChange={(e) => setUserData({ ...userData, address: e.target.value })}
				onBlur={() => handleBlur("address")}
			/>
			{showError("address") && <p className="form-error">{errors.address}</p>}

			<label>Mock Credit Card</label>
			<input
				value={userData.card}
				onChange={(e) => setUserData({ ...userData, card: e.target.value })}
				placeholder="1234-5678-9012-3456"
				onBlur={() => handleBlur("card")}
			/>
			{showError("card") && <p className="form-error">{errors.card}</p>}

			<p>
				<strong>Total:</strong> ${total.toFixed(2)}
			</p>

			<div className="button-row">
				<button onClick={goToPreviousStage}>← Back</button>
				<button
					onClick={goToNextStage}
					disabled={!isValid}
					style={{
						opacity: isValid ? 1 : 0.6,
						cursor: isValid ? "pointer" : "not-allowed",
					}}
				>
					Place Order
				</button>
			</div>
		</div>
	);
};

export default CheckoutPage;
