import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { getProductIdFromSlug } from "../utils/productRoute";
import BackArrow from "../icons/back-arrow";

const ProductContainer = styled.main`
  width: 100%;
  height: 100dvh;
  // border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  // background-color: #e3e7de;
  background-color: white;
  direction: auto;
  box-sizing: border-box;
  position: relative;
`;

const ArrowContainer = styled.span`
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #ffffff7e;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
`;

const Message = styled.p`
  padding: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageFigure = styled.figure`
  width: 100%;
  height: 55%;
  flex-shrink: 0;
  margin: 0;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  overflow: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 90px;
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
  max-width: 70%;
`;

const StockStatus = styled.div`
  width: fit-content;
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
  font-weight: 600;

  position: absolute;
  left: 30px;
  top: 25px;
`;

const WaButton = styled.a`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1.2rem;
  background-color: var(--primary-bg);
  color: gold;
  border-radius: 10px;
  position: fixed;
  bottom: 140px;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;
  border-bottom: 4px solid #116b4d;
  text-decoration: none;

  @media (min-width: 768px) {
    position: absolute;
    bottom: 40px;
  }
`;

const shimmer = keyframes`
  100% {
    transform: translateX(-100%);
  }
`;

const SkeletonShape = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #dfe3da;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.55),
      transparent
    );
    animation: ${shimmer} 1.5s infinite;
  }
`;

const SkeletonImage = styled(SkeletonShape)`
  width: 100%;
  height: 55%;
  flex-shrink: 0;
  border-radius: 0;
`;

const SkeletonStatus = styled(SkeletonShape)`
  width: 85px;
  height: 31px;
  border-radius: 8px;
  position: absolute;
  left: 30px;
  top: 25px;
`;

const SkeletonTitle = styled(SkeletonShape)`
  width: 70%;
  height: 29px;
  border-radius: 5px;
`;

const SkeletonDescription = styled(SkeletonShape)`
  width: 100%;
  height: 18px;
  border-radius: 5px;
`;

const SkeletonPrice = styled(SkeletonShape)`
  width: 80px;
  height: 18px;
  border-radius: 5px;
  margin-top: 5px;
`;

const SkeletonWaButton = styled(SkeletonShape)`
  width: 80%;
  height: 47px;
  border-radius: 10px;
  position: fixed;
  bottom: 140px;
  left: 50%;
  transform: translate(-50%);

  @media (min-width: 768px) {
    position: absolute;
    bottom: 40px;
  }
`;

const ProductSkeleton = () => {
  return (
    <ProductContainer aria-hidden="true">
      <SkeletonImage />

      <DetailsContainer dir="rtl">
        <SkeletonStatus />
        <SkeletonTitle />

        <TextContainer>
          <SkeletonDescription />
          <SkeletonDescription />
          <SkeletonPrice />
        </TextContainer>

        <SkeletonWaButton />
      </DetailsContainer>
    </ProductContainer>
  );
};

const ProductPage = () => {
  const { slugAndId } = useParams();
  const productId = getProductIdFromSlug(slugAndId);
  const { product, isLoading, error } = useProduct(productId);

  const navigate = useNavigate();
  const waLink = (text) =>
    `https://wa.me/212647183385?text=${encodeURIComponent(text)}`;

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <Message role="alert">تعذر تحميل المنتج: {error}</Message>;
  }

  if (!product) {
    return <Message>هذا المنتج غير موجود.</Message>;
  }

  return (
    <ProductContainer>
      <ArrowContainer onClick={() => navigate(-1)}>
        <BackArrow width={"40px"} height={"40px"} color={"black"} />
      </ArrowContainer>

      <ImageFigure>
        {product.image_url && (
          <img src={product.image_url} alt={product.name} loading="lazy" />
        )}
      </ImageFigure>

      <DetailsContainer dir="rtl">
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

        <WaButton
          href={waLink(`مرحبا أريد الاستفسار عن ${product.name}`)}
          dir="auto"
        >
          تواصل معنا
        </WaButton>
      </DetailsContainer>
    </ProductContainer>
  );
};

export default ProductPage;
