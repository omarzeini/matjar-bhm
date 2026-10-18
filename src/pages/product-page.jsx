import styled from "styled-components";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { getProductIdFromSlug } from "../utils/productRoute";

const ProductContainer = styled.main`
  width: 100%;
  height: 100dvh;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  // background-color: #e3e7de;
  background-color: white;
  direction: auto;
`;

const Message = styled.p`
  padding: 24px;
`;

const ImageFigure = styled.figure`
  width: 100%;
  height: 55%;
  flex-shrink: 0;
  margin: 0;
  border-radius: 15px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

   @media (min-width: 768px) {
      & img {
        object-fit: contain;
      }
    }
`;

const DetailsContainer = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 30px;
  direction: auto;
  background-color: white;
  box-shadow: 0 -1px 18px rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: 1;
  margin-top: -24px;
  border-radius: 30px 30px 0 0;

  & .title {
    font-weight: 600;
    font-size: 1.2rem;
  }

  & .description {
    color: gray;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  direction: auto;
  border-top-left-radius: 20px;
  border-top-right-radius: 25px;
  margin-top: 10px;

  & .title {
    font-weight: 600;
    font-size: 1.2rem;
  }

  & .description {
    color: gray;
  }
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
`;

const StockStatus = styled.div`
  width: 80px;
  padding-block: 5px;
  padding-inline: 15px;
  //background-color: var(--primary-bg);
  border: 1px solid var(--primary-bg);
  color: var(--dark-primary-bg);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dcfce7;
  border: 1px solid #bbf7d0;

  position: absolute;
  left: 30px;
  top: 30px;
`;

const WaButton = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1.2rem;
  background-color: var(--primary-bg);
  color: gold;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;
  border-bottom: 4px solid #116b4d;
`;

const ProductPage = () => {
  const { slugAndId } = useParams();
  const productId = getProductIdFromSlug(slugAndId);
  const { product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return <Message>جاري تحميل المنتج...</Message>;
  }

  if (error) {
    return <Message role="alert">تعذر تحميل المنتج: {error.message}</Message>;
  }

  if (!product) {
    return <Message>هذا المنتج غير موجود.</Message>;
  }

  return (
    <ProductContainer>
      <ImageFigure>
        {product.image_url && (
          <img src={product.image_url} alt={product.name} loading="lazy" />
        )}
      </ImageFigure>

      <DetailsContainer dir="auto">
        <StockStatus dir="auto">
          {product.in_stock ? "متوفر" : "غير متوفر"}
        </StockStatus>

        <Title>{product.name}</Title>

        <TextContainer>
          {product.description && (
            <p className="description">{product.description}</p>
          )}
          <p>{product.price}</p>
        </TextContainer>

        <WaButton dir="auto">تواصل معنا</WaButton>
      </DetailsContainer>
    </ProductContainer>
  );
};

export default ProductPage;
