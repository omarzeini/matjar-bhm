import styled, { keyframes } from "styled-components";
import useProducts from "../../hooks/useProducts";
import useUploadProduct from "../../hooks/useUploadProduct";
import useClickOutside from "../../hooks/useClickOutside";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase, uploadImage } from "../../supabase";
import { useNavigate } from "react-router-dom";
import { GooeyToaster, gooeyToast } from "goey-toast";

//COMPONENTS
import DeleteModal from "../../components/dashboard/deleteModal";

// ICONS
import BackArrow from "../../icons/back-arrow";
import Plus from "../../icons/plus";
import Close from "../../icons/close";
import ImageIcon from "../../icons/image";
import SignoutIcon from "../../icons/signout";

const Main = styled.main`
  width: 100%;
  height: fit-content;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 30px;
  padding-bottom: 100px;
  gap: 10px;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;

const SignOutButton = styled.button`
  width: 100%;
  height: fit-content;
  padding: 8px 15px;
  border-radius: 10px;
  background-color: transparent;
  border: 1px solid var(--primary-bg);
  color: var(--primary-bg);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  opacity: 1;

  &:disabled {
    opacity: 0.5;
  }
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

const SearchInput = styled.input`
  width: 90%;
  height: 50px;
  margin: 0 auto;
  padding: 10px 15px;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: white;
  font-size: 1rem;
  outline: none;
`;

const ProductsWrapper = styled.div`
  width: 90%;
  margin: 3rem auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding-bottom: 40px;
`;
const ProductCard = styled.div`
  min-width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
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
  min-width: 60px;
  min-height: 60px;
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

const shimmer = keyframes`
  100% {
    transform: translateX(-100%);
  }
`;

const SkeletonShape = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #e1e3df;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent);
    animation: ${shimmer} 1.5s infinite;
  }
`;

const SkeletonImage = styled(SkeletonShape)`
  width: 60px;
  height: 60px;
  min-width: 60px;
  border-radius: 15px;
`;

const SkeletonName = styled(SkeletonShape)`
  width: 100px;
  height: 20px;
  border-radius: 5px;
`;

const SkeletonAction = styled(SkeletonShape)`
  width: 58px;
  height: 28px;
  border-radius: 8px;
`;

const ProductCardSkeleton = () => {
  return (
    <ProductCard aria-hidden="true">
      <ContentBlock>
        <SkeletonImage />
        <SkeletonName />
      </ContentBlock>

      <ContentBlock>
        <SkeletonAction />
        <SkeletonAction />
      </ContentBlock>
    </ProductCard>
  );
};

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
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid gray;
  background-color: white;
  font-size: 1.1rem;
  min-height: 80px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  cursor: pointer;
`;
const ImageUploadContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ImageActions = styled.div`
  display: flex;
  gap: 10px;
`;
const ImageActionButton = styled.button`
  padding: 8px 14px;
  border: 1px solid #d3d4d1;
  border-radius: 8px;
  background-color: white;
  color: black;
  cursor: pointer;
`;
const RemoveImageButton = styled(ImageActionButton)`
  color: #c62828;
  border-color: #c62828;
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
`;

const Dashboard = () => {
  const [openFrom, setOpenForm] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [inStock, setInStock] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [loadingEditProduct, setLoadingEditProdut] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const productFormRef = useRef(null);
  const imageInputRef = useRef(null);
  const localImageUrlRef = useRef(null);

  const navigate = useNavigate();

  const { products, isLoading, error, refetch } = useProducts();
  const { upload, isUploading, error: uploadError } = useUploadProduct();
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const clearLocalImageUrl = useCallback(() => {
    if (localImageUrlRef.current) {
      URL.revokeObjectURL(localImageUrlRef.current);
      localImageUrlRef.current = null;
    }
  }, []);

  const cleanUpForm = useCallback(() => {
    clearLocalImageUrl();
    setName("");
    setDesc("");
    setImage(null);
    setImageUrl(null);
    setInStock(true);
    setIsEditMode(false);
    setEditProductId(null);
    setOpenForm(false);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }, [clearLocalImageUrl]);

  useClickOutside(productFormRef, cleanUpForm, openFrom);

  useEffect(
    () => () => {
      clearLocalImageUrl();
    },
    [clearLocalImageUrl],
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    clearLocalImageUrl();
    setImage(file);
    const url = URL.createObjectURL(file);
    localImageUrlRef.current = url;
    setImageUrl(url);
  };

  const handleUploadProduct = async (product, image) => {
    if (!product.name || product.name.trim() === "") {
      gooeyToast.error("يرجى إدخال اسم البضاعة", { displayDuration: 500 });
      return;
    }

    //console.log(image);

    try {
      await upload(product, image);
      setOpenForm(false);
      await refetch();
      gooeyToast.success("تمت إضافة البضاعة بنجاح", { displayDuration: 500 });
      console.log("Product Posted.");
      setName("");
      setDesc("");
      setImage(null);
      setImageUrl(null);
      setInStock(true);
      clearLocalImageUrl();
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (err) {
      console.log("Error uploading product: ", uploadError || err);
      gooeyToast.error(uploadError?.message || "تعذرت إضافة البضاعة", {
        displayDuration: 500,
      });
    }
  };

  const handleEditProduct = async (product, image) => {
    if (!editProductId) return;

    try {
      setLoadingEditProdut(true);
      const updatedProduct = { ...product };
      if (image) {
        const uploadedImage = await uploadImage(image);
        updatedProduct.image_url = uploadedImage.imageUrl;
      } else {
        updatedProduct.image_url = imageUrl;
      }

      const { error } = await supabase
        .from("products")
        .update(updatedProduct)
        .eq("id", editProductId);
      if (error) {
        throw error;
      }

      console.log("Product updated successfully");
      cleanUpForm();
      gooeyToast.success("تم تعديل البضاعة بنجاح", {
        displayDuration: 500,
      });
      await refetch();
    } catch (err) {
      console.log("Error updating product: ", err);
      gooeyToast.error("تعذر تعديل البضاعة", { displayDuration: 500 });
    } finally {
      setLoadingEditProdut(false);
    }
  };

  const signOut = async () => {
    try {
      setIsSigningOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      gooeyToast.success("تم تسجيل الخروج بنجاح", { displayDuration: 500 });
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(`Error signing out: ${err}`);
      gooeyToast.error("تعذر تسجيل الخروج", { displayDuration: 500 });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Main dir="rtl">
      <GooeyToaster position="top-center" />
      <TopContainer dir="rtl">
        {/* <Heading dir="rtl">إدارة البضائع</Heading>
        <ArrowContainer onClick={() => navigate(-1)}>
          <BackArrow
            width={"40px"}
            height={"40px"}
            color={"var(--dark-primary-bg)"}
          />
        </ArrowContainer> */}
        <SignOutButton disabled={isSigningOut} onClick={signOut} dir="rtl">
          {isSigningOut ? "تسجيل الخروج…" : " تسجيل الخروج"}

          <SignoutIcon
            width={"30px"}
            height={"30px"}
            color={"var(--primary-bg)"}
          />
        </SignOutButton>
      </TopContainer>

      <AddProductButton
        onClick={() => {
          setOpenForm(true);
        }}
        dir="rtl"
      >
        أضف بضاعة
        <Plus width={"30px"} height={"30px"} color={"white"} />
      </AddProductButton>

      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="search"
        placeholder="ابحث عن بضاعة"
        dir="rtl"
        aria-label="البحث عن بضاعة"
      />

      <ProductsWrapper>
        {isLoading ?
          Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : error ?
          <p>an error occured {error}</p>
        : filteredProducts.length === 0 ?
          <p style={{ textAlign: "center" }} dir="rtl">
            لا توجد بضائع مطابقة للبحث
          </p>
        : filteredProducts.map((product) => (
            <ProductCard key={product.id}>
              <ContentBlock>
                <ImageFigure>
                  {product.image_url ?
                    <img src={product.image_url} />
                  : ""}
                </ImageFigure>
                <ProductName>
                  {" "}
                  {product.name.length > 7 ?
                    product.name.slice(0, 7) + "..."
                  : product.name}{" "}
                </ProductName>
              </ContentBlock>

              <ContentBlock>
                <EditButton
                  onClick={() => {
                    setName(product.name);
                    setDesc(product?.description || "");
                    setImage(null);
                    setImageUrl(product?.image_url || null);
                    clearLocalImageUrl();
                    if (imageInputRef.current) {
                      imageInputRef.current.value = "";
                    }
                    setInStock(product.in_stock);
                    setOpenForm(true);
                    setIsEditMode(true);
                    setEditProductId(product.id);
                  }}
                  dir="rtl"
                >
                  تعديل
                </EditButton>

                <DeleteButton
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setShowOverlay(true);
                    setShowDeleteModal(true);
                  }}
                  dir="rtl"
                >
                  حذف
                </DeleteButton>
              </ContentBlock>
            </ProductCard>
          ))
        }
      </ProductsWrapper>

      {showDeleteModal && selectedProductId ?
        <DeleteModal
          productId={selectedProductId}
          refetch={refetch}
          setSelectedProductId={setSelectedProductId}
          setShowDeleteModal={setShowDeleteModal}
          setShowOverlay={setShowOverlay}
        />
      : null}

      <Overlay $isOpen={openFrom || showOverlay ? true : false} />

      <ProductForm
        ref={productFormRef}
        onSubmit={(e) => e.preventDefault()}
        $isOpen={openFrom ? true : false}
      >
        <CloseIconContainer onClick={cleanUpForm}>
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

        <ImageInput
          ref={imageInputRef}
          type="file"
          id="product-image-input"
          onChange={(e) => handleFileUpload(e)}
        />

        <ImageUploadContainer>
          <ImageInputLabel htmlFor="product-image-input">
            {imageUrl ?
              <PreviewImage src={imageUrl} />
            : <ImageIcon width={"60px"} height={"60px"} color={"gray"} />}

            <p style={{ color: "gray" }}>
              {imageUrl ? "الصورة الحالية" : "إنقر لإضافة صورة البضاعة"}
            </p>
          </ImageInputLabel>
          {imageUrl && (
            <ImageActions>
              <ImageActionButton
                type="button"
                onClick={() => imageInputRef.current?.click()}
              >
                تغيير الصورة
              </ImageActionButton>
              <RemoveImageButton
                type="button"
                onClick={() => {
                  clearLocalImageUrl();
                  setImage(null);
                  setImageUrl(null);
                  if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                  }
                }}
              >
                إزالة الصورة
              </RemoveImageButton>
            </ImageActions>
          )}
        </ImageUploadContainer>

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

        <SubmitButton
          disabled={isUploading || loadingEditProduct ? true : false}
          $grey={isUploading || loadingEditProduct ? true : false}
          type="submit"
          onClick={() => {
            if (!isEditMode) {
              handleUploadProduct(
                { name, description: desc, in_stock: inStock },
                image,
              );
            } else {
              handleEditProduct(
                { name, description: desc, in_stock: inStock },
                image,
              );
            }
          }}
        >
          {" "}
          {isUploading || loadingEditProduct ?
            isEditMode ?
              "جارٍ حفظ التعديلات…"
            : "جارٍ إضافة المنتج…"
          : isEditMode ?
            "حفظ التعديلات"
          : "إضافة"}
        </SubmitButton>
      </ProductForm>
    </Main>
  );
};

export default Dashboard;
