import { useState } from "react";
import styled from "styled-components";
import { supabase } from "../../supabase";

const Container = styled.div`
  width: 80%;
  height: fit-content;
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Heading = styled.h3`
  color: black;
`;

const Paragraph = styled.p`
  color: gray;
  font-size: 0.9rem;
  width: 90%;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-top: 1rem;
`;

const DeleteButton = styled.button`
  background-color: red;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  width: 80px;
  min-width: fit-content;
  opacity: ${(props) => (props.$grey ? ".5" : "1")};
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 10px;
  font-size: 1rem;
  color: black;
  padding: 5px 10px;
  cursor: pointer;
  width: 80px;
`;

const DeleteModal = ({
  productId,
  refetch,
  setSelectedProductId,
  setShowDeleteModal,
  setShowOverlay,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const closeModal = () => {
    setShowOverlay(false);
    setShowDeleteModal(false);
    setSelectedProductId(null);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setDeleteError("");
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId)
        .select("id");
      if (error) {
        throw error;
      }
      if (!data?.length) {
        throw new Error(
          "No product was deleted. Check that the product exists and that the DELETE policy allows this operation.",
        );
      }

      await refetch();
      console.log("Product deleted");
      closeModal();
    } catch (err) {
      console.log("Error deleting product: ", err);
      setDeleteError(
        err instanceof Error ? err.message : "تعذر حذف البضاعة. حاول مرة أخرى.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Container dir="rtl">
      <Heading dir="rtl">حذف البضاعة</Heading>
      <Paragraph dir="rtl">هل أنت متأكد من حذف هذه البضاعة ؟</Paragraph>

      <ButtonsContainer dir="rtl">
        <CancelButton
          onClick={closeModal}
          dir="rtl"
        >
          إلغاء
        </CancelButton>
        <DeleteButton
          $grey={isDeleting ? true : false}
          disabled={isDeleting ? true : false}
          onClick={handleDelete}
          dir="rtl"
        >
          {isDeleting ? "جارٍ الحذف…" : "حذف"}
        </DeleteButton>
      </ButtonsContainer>
      {deleteError && <ErrorMessage role="alert">{deleteError}</ErrorMessage>}
    </Container>
  );
};

export default DeleteModal;
