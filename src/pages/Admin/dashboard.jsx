import styled from "styled-components";
import BackArrow from "../../icons/back-arrow";
import useProducts from "../../hooks/useProducts";
import { useState } from "react";

// ICONS
import Plus from "../../icons/plus";
import Close from "../../icons/close";
import ImageIcon from "../../icons/image";
import { useNavigate } from "react-router-dom";

const Main = styled.main`
  width: 100%;
  height: fit-content;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 30px;
  gap: 10px;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArrowContainer = styled.span`
  cursor: pointer;
`;

const Heading = styled.h2`
  margin-right: 10px;
`;

const AddProductButton = styled.button`
  width: 90%;
  height: 60px;
  border-radius: 10px;
  padding: 10px;
  background-color: var(--primary-bg);
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 3rem auto 0;

  &:active {
    scale: 0.9;
  }
`;

const ProductsWrapper = styled.div`
  width: 90%;
  margin: 3rem auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const ProductCard = styled.div`
  min-width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  corner-shape: squircle;
  border-radius: 15px;
  background-color: white;
`;

const ContentBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const ImageFigure = styled.figure`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background-color: #d3d4d1;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
`;
const ProductName = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
`;
const EditButton = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 5px 15px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: transparent;
  border: 1px solid #d3d4d1;
  border-radius: 8px;
  color: black;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 5px 15px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: red;
  border: 1px solid var(--body-bg);
  border-radius: 8px;
  color: white;
  cursor: pointer;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #33333367;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 98;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const ProductForm = styled.form`
  position: fixed;
  width: 100%;
  height: auto;
  max-height: calc(100dvh - 1rem);
  bottom: 0;
  left: 0;
  background-color: white;
  z-index: 99;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 90px 10px 100px;
  gap: 30px;
  overflow-y: auto;
  transform: translateY(${(props) => (props.$isOpen ? "0" : "100%")});
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition:
    transform 0.3s ease,
    visibility 0s linear ${(props) => (props.$isOpen ? "0s" : "0.3s")};
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  cursor: pointer;
`;
const Input = styled.input`
  width: 90%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid gray;
  background-color: white;
  font-size: 1.1rem;
  height: 60px;
`;

const TextArea = styled.textarea`
  width: 90%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid gray;
  background-color: white;
  font-size: 1.1rem;
  height: 80px;
`;

const ImageInputLabel = styled.label`
  width: 90%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid gray;
  background-color: white;
  font-size: 1.1rem;
  height: 80px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  cursor: pointer;
`;
const ImageInput = styled.input`
  position: absolute;
  left: 100%;
`;

const RadioContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const InstockSwitcher = styled.input`
  width: 24px;
  height: 24px;
  accent-color: var(--primary-bg);
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 90%;
  height: 60px;
  border-radius: 10px;
  padding: 10px;
  background-color: var(--primary-bg);
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1rem;
  //opacity: ${(props) => (props.$grey ? "0.5" : "1")};
  color: ${(props) => (props.$grey ? "#ffffff69" : "white")};
`;

const PreviewImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 10px;
    corner-shape: squircle;
    object-fit: cover;
`

const Dashboard = () => {
  const [openFrom, setOpenForm] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [inStock, setInStock] = useState(true);

  const navigate = useNavigate();

  const { products, isLoading, error } = useProducts();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    try{
          const url = URL.createObjectURL(file);
    setImageUrl(url);
    }catch(err){
            console.log("Error converting to url: ", err)

    }finally {
        URL.revokeObjectURL(file);
    }
  
}

  return (
    <Main dir="rtl">
      <TopContainer dir="rtl">
        <Heading dir="rtl">إدارة البضائع</Heading>
        <ArrowContainer onClick={() => navigate(-1)}>
          <BackArrow
            width={"40px"}
            height={"40px"}
            color={"var(--dark-primary-bg)"}
          />
        </ArrowContainer>
      </TopContainer>

      <AddProductButton onClick={() => setOpenForm(true)} dir="rtl">
        أضف بضاعة
        <Plus width={"30px"} height={"30px"} color={"white"} />
      </AddProductButton>

      <ProductsWrapper>
        {isLoading ?
          <p style={{ textAlign: "center" }} dir="rtl">
            {" "}
            جاري تحميل المنتجات...
          </p>
        : error ?
          <p>an error occured {error}</p>
        : products.map((product) => (
            <ProductCard key={product.id}>
              <ContentBlock>
                <ImageFigure>
                  {product.image_url ?
                    <img src={product.image_url} />
                  : ""}
                </ImageFigure>
                <ProductName> {product.name} </ProductName>
              </ContentBlock>

              <ContentBlock>
                <EditButton dir="rtl">تعديل</EditButton>
                <DeleteButton dir="rtl">حذف</DeleteButton>
              </ContentBlock>
            </ProductCard>
          ))
        }
      </ProductsWrapper>

      <Overlay $isOpen={openFrom ? true : false} />

      <ProductForm
        onSubmit={(e) => e.preventDefault()}
        $isOpen={openFrom ? true : false}
      >
        <CloseIconContainer onClick={() => setOpenForm(false)}>
          <Close width={"25px"} height={"25px"} color={"gray"} />
        </CloseIconContainer>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="إسم البضاعة"
          required
          dir="rtl"
        />

        <TextArea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="وصف البضاعة (اختياري)"
          dir="rtl"
        />

        <ImageInput type="file" id="product-image-input" onChange={(e) => handleFileUpload(e)}  />

        <ImageInputLabel htmlFor="product-image-input">
            {imageUrl ? <PreviewImage src={imageUrl}  /> :  <ImageIcon width={"60px"} height={"60px"} color={"gray"} /> }
          

          <p style={{ color: "gray" }}> {imageUrl ? "إنقر لتغيير الصورة" : "إنقر لإضافة صورة البضاعة"} </p>
        </ImageInputLabel>

        <RadioContainer>
          <InstockSwitcher
            checked={inStock}
            onChange={() => setInStock((prev) => !prev)}
            type="checkbox"
            id="in-stock"
          />
          <label style={{ fontSize: "1.1rem" }} htmlFor="in-stock">
            متوفر ؟
          </label>
        </RadioContainer>

        <SubmitButton>إضافة</SubmitButton>
      </ProductForm>
    </Main>
  );
};

export default Dashboard;
