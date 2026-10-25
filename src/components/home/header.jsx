import styled from "styled-components";
import IconImg from "../../images/icon.svg";

const Container = styled.header`
  width: 100%;
  height: fit-content;
  background-color: var(--primary-bg);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  corner-shape: squircle;
  position: relative;
  box-sizing: border-box;
`;

const Heading = styled.h2`
  color: ${(props) =>
    props.$light ? "var(--light-text)" : `var(--dark-text)`};
`;

const Paragraph = styled.p`
  color: ${(props) =>
    props.$light ? "var(--light-text)"
    : props.$dark ? `var(--dark-text)`
    : "gray"};
`;

const SearchForm = styled.form`
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  margin-top: 1rem;
  box-sizing: border-box;

  &:focus-within {
    border: 2px solid green;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 10px;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  box-sizing: border-box;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 25px;
  left: 15px;
  border: 1px solid gold;
  border-radius: 10px;
`;

const Header = () => {
  return (
    <Container dir="auto">
      <Heading $light dir="auto">
        شركة أهل گاوي
      </Heading>
      <Paragraph $light dir="auto">
        تعرف على بضاعاتنا
      </Paragraph>

      <LogoImage src={IconImg} alt="" />

      <SearchForm>
        <SearchInput
          dir="rtl"
          type="search"
          placeholder="ابحث عن بضاعة معينة"
        ></SearchInput>
      </SearchForm>
    </Container>
  );
};

export default Header;
