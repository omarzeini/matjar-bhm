import styled from "styled-components";
import Header from "../components/home/header";
import ProductCard from "../components/home/productCard";
import useProducts from "../hooks/useProducts";

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
    const { products, isLoading, error } = useProducts();

    return (
        <Main>
            <Header />

            <ProductsWrapper>
                {isLoading && <p>جاري تحميل المنتجات...</p>}
                {error && <p role="alert">تعذر تحميل المنتجات: {error.message}</p>}
                {!isLoading && !error && products.length === 0 && (
                    <p>لا توجد منتجات متاحة حاليا.</p>
                )}
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ProductsWrapper>
        </Main>
    )
}


export default Home;