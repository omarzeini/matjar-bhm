import styled from "styled-components";
import sugarBag from "../images/sugarBag.avif";

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

const ImageFigure = styled.figure`
  width: 100%;
  height: 55%;
  flex-shrink: 0;
  margin: 0;
  border-radius: 15px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: fill;
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
  top: 25px;
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
`;

const InstockTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #166534;
  background-color: #dcfce7;
  border: 1px solid #bbf7d0;
  border-radius: 9999px;
  width: fit-content;
`;

const StatusTag = styled.span`
  width: 7px;
  height: 7px;
  background-color: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
`;

const ProductPage = () => {
  return (
    <ProductContainer>
      <ImageFigure>
        <img src={sugarBag} alt="product-image" loading="lazy" />
      </ImageFigure>

      <DetailsContainer dir="auto">
        <StockStatus dir="auto">متوفر</StockStatus>

        {/* <InstockTag>
  <StatusTag ></StatusTag>
  In Stock
</InstockTag> */}

        <Title>السكر</Title>

        <TextContainer>
          <p className="description">
            حقائب 50كلغ من السكر الأبيض مستورد من البرازيل
          </p>
        </TextContainer>

        <WaButton dir="auto">راسلنا على الواتساب</WaButton>
      </DetailsContainer>
    </ProductContainer>
  );
};

export default ProductPage;
