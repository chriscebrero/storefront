import { createContext, useContext, useState, ReactNode } from "react";
import { Product, UserData } from "../types";

type StoreContextType = {
	stage: "browse" | "upsell" | "checkout" | "confirmation";
	setStage: (stage: StoreContextType["stage"]) => void;
	cart: Product[];
	setCart: (cart: Product[]) => void;
	extras: Product[];
	setExtras: (extras: Product[]) => void;
	userData: UserData;
	setUserData: (data: UserData) => void;
	goToPreviousStage: () => void;
	goToNextStage: () => void;
};

export const useStore = () => {
	const context = useContext(StoreContext);
	if (!context) throw new Error("useStore must be used within a StoreProvider");
	return context;
};

const StoreContext = createContext<StoreContextType | null>(null);
const stageOrder = ["browse", "upsell", "checkout", "confirmation"] as const;

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	const [stage, setStage] = useState<StoreContextType["stage"]>("browse");
	const [cart, setCart] = useState<Product[]>([]);
	const [extras, setExtras] = useState<Product[]>([]);
	const [userData, setUserData] = useState<UserData>({
		name: "",
		email: "",
		address: "",
		card: "",
	});

	const goToPreviousStage = () => {
		const index = stageOrder.indexOf(stage);
		if (index > 0) setStage(stageOrder[index - 1]);
	};

	const goToNextStage = () => {
		const index = stageOrder.indexOf(stage);
		if (index < stageOrder.length - 1) setStage(stageOrder[index + 1]);
	};

	return (
		<StoreContext.Provider
			value={{
				stage,
				setStage,
				cart,
				setCart,
				extras,
				setExtras,
				userData,
				setUserData,
				goToPreviousStage,
				goToNextStage,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};
