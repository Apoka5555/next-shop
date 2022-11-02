import { ApiError } from "next/dist/server/api-utils";
import Head from "next/head";
import Image from "next/image";
import Title from "../../components/Title";
import { getProducts, getProduct } from "../../lib/products";

export async function getStaticPaths() {
  try {
    const products = await getProducts();
    return {
      paths: products.map((product) => ({
        params: {
          id: product.id.toString(),
        },
      })),
      fallback: "blocking",
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
}

export async function getStaticProps({ params: { id } }) {
  const product = await getProduct(id);
  return {
    props: {
      product,
    },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
}

function ProductPage({ product }) {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>

      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <div className="flex flex-col lg:flex-row">
          <div>
            <Image src={product.pictureUrl} alt="" width={640} height={480} />
          </div>
          <div className="flex-1 lg:ml-4">
            <p className="text-sm">{product.description}</p>
            <p className="text-lg font-bold mt-2">{product.price}</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductPage;
