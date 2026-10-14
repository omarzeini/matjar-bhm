import styled from "styled-components";
import Header from "../components/home/header";

const Main = styled.main`
    width: 100%;
    height: 100dvh;
`
const Home = () => {
    return (
        <Main>
            <Header />
        </Main>
    )
}


export default Home;