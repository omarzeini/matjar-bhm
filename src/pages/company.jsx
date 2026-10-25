import styled from "styled-components";
import CompanyLogo from "../icons/company";

const Main = styled.main`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 179px;
  background-color: var(--primary-bg);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  corner-shape: squircle;
`;

const LogoFigure = styled.figure`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 -8px 20px gray;
  position: absolute;
  top: 80px;
  right: 20px;
  background-color: #e9f3ed;
  padding; 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px;
  padding-right: 20px;
  margin-top: 100px;
`;

const Heading = styled.h2`
  color: var(--dark-primary-bg);
`;

const Paragraph = styled.p`
  color: gray;
  font-size: 1.1rem;
`;

const InfoContainer = styled.div`
  width: 90%;
  height: fit-content;
  min-height: 300px;
  box-shadow: 0 1px 10px #ccccccb0;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  margin: 2rem auto 0;

  & h3 {
    color: var(--dark-primary-bg);
  }
`;

const CompanyPage = () => {
  return (
    <>
      <Main dir="rtl">
        <Header />
        <LogoFigure>
          <CompanyLogo
            width={"80%"}
            height={"80%"}
            color={"var(--primary-bg)"}
            strokeWidth={1}
          />
        </LogoFigure>

        <TextBlock dir="rtl">
          <Heading dir="rtl">شركة أهل گاوي</Heading>
          <Paragraph dir="rtl">
            مرحبا بكم، نحن شركة رائدة في مجال التجارة والتوزيع، نوفر أفضل
            المنتجات بأسعار تنافسية وجودة عالية.
          </Paragraph>
        </TextBlock>

        <InfoContainer dir="rtl">
          <h3 dir="rtl">معلومات التواصل</h3>
        </InfoContainer>
      </Main>
    </>
  );
};

export default CompanyPage;
