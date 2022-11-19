import { RelatedProducts } from "@algolia/recommend-react";
import recommend from "@algolia/recommend";
import { useParams } from "react-router-dom";
import Card11recommand from "components/Card11/Card11recommand";
import { useSelector } from "react-redux";
const recommendClient = recommend(
  "1RY92FSHMF",
  "2a5deb3323c4edb2ecbcc46687c2c216"
);
const indexName = "products";
function RelatedItem({ item }) {
  return <Card11recommand product={item} />;
}

function Productrecommand() {
  const { objectID } = useParams();
  const selectedproduct = useSelector((state) => state.productseller.prod);

  return (
    <div className="gap-2 my-10">
      <h1>Related products</h1>
      <RelatedProducts
        maxRecommendations={5}
        recommendClient={recommendClient}
        indexName={indexName}
        objectIDs={[selectedproduct._id]}
        itemComponent={RelatedItem}
        queryParameters={{
          facetFilters: [`category=${selectedproduct.category}`],
          numericFilters: [`price>${selectedproduct.price}`],
        }}
        classNames={{
          list: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2",
          title: "invisible",
        }}
      />
    </div>
  );
}
export default Productrecommand;
