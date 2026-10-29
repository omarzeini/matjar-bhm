import styled, { keyframes } from "styled-components";
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
    width: 100%;
    height: 100%;
  }
`;

const ImageFigure = styled.figure`
  width: 100%;
  //aspect-ratio: 1;
  margin: 0;
  border-radius: 15px;
  height: 65%;

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

const shimmer = keyframes`
  100% {
    transform: translateX(-100%);
  }
`;

const SkeletonContainer = styled(ProductContainer)`
  overflow: hidden;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 65%;
  position: relative;
  overflow: hidden;
  background-color: #d4d9ce;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    animation: ${shimmer} 1.5s infinite;
  }
`;

const SkeletonTitle = styled.div`
  width: 75%;
  height: 18px;
  margin-top: 2px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  background-color: #d4d9ce;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    animation: ${shimmer} 1.5s infinite;
  }
`;

const SkeletonStatus = styled(StockStatus)`
  height: 29px;
  overflow: hidden;
  background-color: #d4d9ce;
  border-color: transparent;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    animation: ${shimmer} 1.5s infinite;
  }
`;

export const ProductCardSkeleton = () => {
  return (
    <SkeletonContainer dir="rtl" aria-hidden="true">
      <SkeletonImage />
      <TextContainer>
        <SkeletonTitle />
      </TextContainer>
      <SkeletonStatus />
    </SkeletonContainer>
  );
};

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
