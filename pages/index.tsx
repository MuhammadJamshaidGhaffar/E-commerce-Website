import ProductItem from "@/components/ProductItem";
import db from "@/utils/db";
import { ProductTypeMongo } from "@/utils/data";
import productModel from "@/utils/product";

export default function Home({ products }: { products: ProductTypeMongo[] }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {products.map((product) => (
          // <div key={product.id}>dsfsdf</div>
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products: ProductTypeMongo[] = (await productModel.find({}).lean()).map(
    db.convertDocToObj
  );

  return {
    props: {
      products,
    },
  };
}
