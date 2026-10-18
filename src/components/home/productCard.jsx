import styled from "styled-components"
import sugarBag from "../../images/sugarBag.avif"

const ProductContainer = styled.div`
    width: 180px;
    height: fit-content;
    border-radius: 15px;
    background-color: #E3E7DE;
    direction: auto;
    position: relative;
`

const ImageFigure = styled.figure`
    width: 100%;
    height: 60%;
    border-radius: 15px;

    & img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
`

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
`

const StockStatus = styled.div`
  width: 80px;
  padding: 5px;
  padding-inline: 8px;
 font-size: .9rem;
  background-color: var(--primary-bg);
  border: 1px solid var(--primary-bg);
  color: var(--dark-primary-bg);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gold;
  border: 1px solid #bbf7d0;

//   position: absolute;
//   left: 10px;
//   top: 10px;
`;

const ProductCard = ({product}) => {
    return(
        <ProductContainer>
            
            <ImageFigure>
                <img src={sugarBag} alt="product-image" loading="lazy"/>
            </ImageFigure>

            <TextContainer dir="auto">
                <p className="title">{product.name}</p>
                {product.description ?  <p className="description">{product.description}</p> : ""}
               

                <StockStatus>
                متوفر
            </StockStatus>
            </TextContainer>
        </ProductContainer>
    )
}

export default ProductCard;