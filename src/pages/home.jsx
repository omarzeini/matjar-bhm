import styled from "styled-components";
import Header from "../components/home/header";
import ProductCard from "../components/home/productCard"

const Main = styled.main`
    width: 100%;
    height: 100dvh;
`

const ProductsWrapper = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-wrap: wrap;
    gap: 20px;
    padding: 10px;
    padding-top: 50px;
`

const Home = () => {
    return (
        <Main>
            <Header />

            <ProductsWrapper>
                <ProductCard product={{name: "sugar", description: "white sugar 50kg bag"}} />
                <ProductCard product={{name: "السكر"}} />
                <ProductCard product={{name: "Oil", description: "white sugar 50kg bag"}} />
                <ProductCard product={{name: "Oil", description: "white sugar 50kg bag"}} />
            </ProductsWrapper>
        </Main>
    )
}


export default Home;