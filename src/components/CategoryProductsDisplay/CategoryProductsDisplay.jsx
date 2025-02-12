import ChosenCaregoryDisplay from "../ChosenCaregoryDisplay/ChosenCaregoryDisplay";
import { useParams } from "react-router-dom";

export default function CategoryProductsDisplay() {
  const { id } = useParams();
  return (
    <div id="categoryProductsDisplay" className="categoryDisplay  p-5">
      <div className="sectiontitel"></div>
      <div className="category-content grid gap-6 p-6 grid-cols-1 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3">
        {<ChosenCaregoryDisplay selectedCategory={id} />}
      </div>
    </div>
  );
}
