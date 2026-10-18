import styled from "styled-components"

const Container = styled.header `
    width: 100%;
    height: fit-content;
    background-color: var(--dark-primary-bg);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    corner-shape: squircle;
`

const Heading = styled.h2`
    color: ${props => props.$light ? "var(--light-text)" : `var(--dark-text)`}
`

const Paragraph = styled.p`
    color: ${props => props.$light ?  "var(--light-text)" : props.$dark ? `var(--dark-text)`: "gray"}
`

const SearchForm = styled.form`
    width: 100%;
    height: fit-content;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    margin-top: 1rem;

    &:focus-within {
        border: 2px solid brown;
    }
`

const SearchInput = styled.input`
    width: 100%;
    height: 30px;
    padding: 10px;
    font-size: 1.1rem;
    display: flex; justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
`

const Header = () => {
    return (
        <Container>
            <Heading $light>
              Matjar BHM
            </Heading>
            <Paragraph $light>
                Find out the currently availble goods
            </Paragraph>

            <SearchForm>
                <SearchInput
                     type="search"
                     placeholder="search goods"
                 >

                </SearchInput>
            </SearchForm>
        </Container>
    )
}

export default Header;