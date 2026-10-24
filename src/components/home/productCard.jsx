import styled from "styled-components";
import { Link } from "react-router-dom";
import { getProductPath } from "../../utils/productRoute";

const ProductContainer = styled.div`
  width: 180px;
  height: 300px;
  border-radius: 15px;
  background-color: #e3e7de;
  direction: auto;
  position: relative;

  & a {
    display: block;
    color: inherit;
    text-decoration: none;
  }
`;

const ImageFigure = styled.figure`
  width: 100%;
  aspect-ratio: 1;
  margin: 0;
  border-radius: 15px;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  & .image-placeholder {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: gray;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  margin-top: 10px;
  direction: auto;

  & .title {
    font-weight: 600;
    font-size: 1.2rem;
  }

  & .description {
    color: gray;
  }
`;

const StockStatus = styled.div`
  width: 80%;
  padding: 5px;
  padding-inline: 8px;
  font-size: 0.9rem;
  background-color: var(--primary-bg);
  border: 1px solid var(--primary-bg);
  color: var(--dark-primary-bg);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gold;
  border: 1px solid #bbf7d0;

  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 10px;
`;

const ProductCard = ({ product }) => {
  return (
    <ProductContainer>
      <Link to={getProductPath(product)}>
        <ImageFigure>
          {product.image_url ?
            <img src={product.image_url} alt={product.name} loading="lazy" />
          : <div className="image-placeholder">لا توجد صورة</div>}
        </ImageFigure>

        <TextContainer dir="auto">
          <p className="title">
            {" "}
            {product.name.length > 15 ?
              product.name.slice(0, 15) + "..."
            : product.name}
          </p>
          <StockStatus>{product.in_stock ? "متوفر" : "غير متوفر"}</StockStatus>
        </TextContainer>
      </Link>
    </ProductContainer>
  );
};

export default ProductCard;
