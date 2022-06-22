import { commerce } from "../../src/lib/commerce";
import Link from "next/link";

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map((product) => ({
      params: {
        permalink: product.permalink,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { permalink } = params;

  const product = await commerce.products.retrieve(permalink, {
    // Must include a type value
    type: "permalink",
  });

  return {
    props: {
      product,
    },

    revalidate: 60,
  };
}

const ProductDetailPage = ({ product }) => {
  return (
    // Add head tag
    <div className="product-detail">
      {/* <img
        className="product-detail__image"
        src={product.media.source}
        alt={product.name}
      /> */}
      <div className="product-detail__info">
        <Link href="/">
          <a className="product-detail__back">
            <p>Back to products</p>
          </a>
        </Link>
        <div className="product-detail__details">
          <h1 className="product-detail__name">{product.name}</h1>
          <div
            className="product-detail__description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-detail__price">
            {product.price.formatted_with_symbol}
          </div>
        </div>
      </div>
      <button name="View item" className="product-detail__btn">
        <span>Add to cart</span>
      </button>
    </div>
  );
};

export default ProductDetailPage;
