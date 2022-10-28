import { ApiError } from "next/dist/server/api-utils";
import Head from "next/head";
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
    revalidate: 5 * 60,
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
        <p>{product.description}</p>
      </main>
    </>
  );
}

export default ProductPage;
