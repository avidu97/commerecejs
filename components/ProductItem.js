import Image from "next/image";

export default function ProductItem({ product }) {
  return (
    <div>
      {/* <Image src={product.media.source} alt={product.name}></Image> */}
      <div>
        <h2>{product.name}</h2>
      </div>
    </div>
  );
}
