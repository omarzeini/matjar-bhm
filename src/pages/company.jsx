import styled from "styled-components";
import CompanyLogo from "../icons/company";
import PhoneIcon from "../icons/phone";
import LocationIcon from "../icons/location";
import ClockIcon from "../icons/clock";

const Main = styled.main`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  position: relative;
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
  width: 95%;
  line-height: 1.8;
`;

const InfoContainer = styled.div`
  width: 90%;
  height: fit-content;
  min-height: 400px;
  box-shadow: 0 1px 10px #ccccccb0;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  gap: 20px;
  margin: 2rem auto 0;

  & h3 {
    color: var(--dark-primary-bg);
    margin-bottom: 2rem;
  }
`;

const InfoCard = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 80px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  & .icon-container {
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 50%;
    background-color: var(--primary-bg);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .labels-container {
    display: flex;
    flex-direction: column;
    justify-content: centers;
    align-items: start;
    gap: 6px;
  }

  & .label {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark-bg);
  }

  & .sub-label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--primary-bg);
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

          <InfoCard dir="rtl">
            <div className="icon-container">
              <PhoneIcon
                width={"20px"}
                height={"20px"}
                color={"var(--light-primary)"}
              />
            </div>

            <div dir="rtl" className="labels-container">
              <p className="label" dir="rtl">
                الهاتف
              </p>
              <p className="sub-label"> 212647183385+</p>
            </div>
          </InfoCard>

          <InfoCard dir="rtl">
            <div className="icon-container">
              <LocationIcon
                width={"20px"}
                height={"20px"}
                color={"var(--light-primary)"}
              />
            </div>

            <div dir="rtl" className="labels-container">
              <p className="label" dir="rtl">
                الموقع
              </p>
              <p className="sub-label" dir="rtl">
                {" "}
                فصالة، موريتانيا
              </p>
            </div>
          </InfoCard>
          <InfoCard dir="rtl">
            <div className="icon-container">
              <ClockIcon
                width={"20px"}
                height={"20px"}
                color={"var(--light-primary)"}
              />
            </div>

            <div dir="rtl" className="labels-container">
              <p className="label" dir="rtl">
                ساعات العمل
              </p>
              <p className="sub-label"> يوميا: من 9 صباحا إلى 6 مساء</p>
            </div>
          </InfoCard>
        </InfoContainer>
      </Main>
    </>
  );
};

export default CompanyPage;
