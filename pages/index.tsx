import ProductItem from "@/components/ProductItem";
import { products } from "@/utils/data";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
