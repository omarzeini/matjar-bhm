import styled from "styled-components"

const Container = styled.header `
    width: 100%;
    height: 30%;
    background-color: var(--primary-bg);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 10px;
`

const Heading = styled.h2`
    color: ${props => props.$light ? "var(--light-text)" : `var(--dark-text)`}
`

const paragraph = styled.p`
    color: ${props => props.$light ?  "var(--light-text)" : props.$dark ? `var(--dark-text)`: "gray"}
`

const Header = () => {
    return (
        <Container>
            <Heading $light>
              Matjar BHM
            </Heading>
        </Container>
    )
}

export default Header;