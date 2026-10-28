import styled from "styled-components";
import Header from "../components/home/header";
import ProductCard from "../components/home/productCard";
import useProducts from "../hooks/useProducts";
import { useEffect, useState } from "react";

const Main = styled.main`
  width: 100%;
  min-height: 100dvh;
  padding-bottom: 100px;
`;

const ProductsWrapper = styled.section`
  width: 100%;
  // display: flex;
  // justify-content: center;
  // align-items: start;
  // flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  place-items: center;
  gap: 20px;
  padding: 10px;
  padding-top: 50px;
`;

const NotFoundParagraph = styled.p`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.1rem;
  font-weight: 600;
`;

const Home = () => {
  const { products, isLoading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [notFoundMsg, setNotFoundMsg] = useState("");

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const onSearchSubmit = () => {
    const newProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (searchQuery && !newProducts.length) {
      setNotFoundMsg("لم يتم العثور على بضاعة بهذا الاسم");
      setFilteredProducts([]);
      return;
    }
    setFilteredProducts(newProducts);
    setNotFoundMsg("");
  };

  return (
    <Main>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={onSearchSubmit}
      />

      {notFoundMsg && !isLoading && !filteredProducts.length && (
        <NotFoundParagraph dir="rtl">
          {notFoundMsg} : "{searchQuery}"
        </NotFoundParagraph>
      )}

      <ProductsWrapper>
        {isLoading && <p>...جاري تحميل المنتجات</p>}
        {error && <p role="alert">تعذر تحميل المنتجات: {error.message}</p>}
        {!isLoading && !error && products.length === 0 && (
          <p>لا توجد منتجات متاحة حاليا.</p>
        )}
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsWrapper>
    </Main>
  );
};

export default Home;
