import ProductCard from "../components/ProductCard";
import { upsells } from "../data/upsells";
import { toggleProduct } from "../utils/toggleProduct";
import { useStore } from "../context/StoreContext";

const UpsellPage = () => {
	const { extras, setExtras, goToNextStage, goToPreviousStage } = useStore();
	return (
		<>
			<h2>Add Extras:</h2>
			{upsells.map((extra) => (
				<ProductCard
					key={extra.id}
					item={extra}
					selected={!!extras.find((e) => e.id === extra.id)}
					onClick={() => toggleProduct(extra, extras, setExtras)}
				/>
			))}
			<div className="button-row">
				<button onClick={goToPreviousStage}>← Back</button>
				<button onClick={goToNextStage}>Continue →</button>
			</div>
		</>
	);
};

export default UpsellPage;
