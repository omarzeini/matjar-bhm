import styled from "styled-components";
import BackArrow from "../../icons/back-arrow";
import { supabase } from "../../supabase";
import { replace, useNavigate } from "react-router-dom";
import { useState } from "react";
const LoginForm = styled.form`
  width: 100%;
  height: fit-content;
  background-color: var(--body-bg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
  margin-top: 40%;

  @media (min-width: 768px) {
    margin-top: 100px;
  }
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
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

const SubmitButton = styled.button`
  width: 90%;
  border-radius: 10px;
  padding: 10px;
  background-color: var(--dark-primary-bg);
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1rem;
  //opacity: ${(props) => (props.$grey ? "0.5" : "1")};
  color: ${(props) => (props.$grey ? "#ffffff69" : "white")};
`;

const ArrowContainer = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
`;

const Login = () => {
  const [signingIn, setSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignin = async (email, password) => {
    if (!email || !password) {
      setError("يرجى إدخال كلمة المرور و البريد إلكتروني");
      return;
    }
    try {
      setError(null);
      setSigningIn(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      navigate("/", { replace: true });
    } catch (err) {
      console.log("Error signing in: ", err.message || err);
      setError(`خطأ في تسجيل الدخول. يرجى التأكد من البريد و كلمة المرور`);
      // UI Error dispaly
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <LoginForm dir="rtl" onSubmit={(e) => e.preventDefault()}>
      <ArrowContainer onClick={() => navigate(-1)}>
        <BackArrow
          width={"40px"}
          height={"40px"}
          color={"var(--dark-primary-bg)"}
        />
      </ArrowContainer>

      <Heading dir="rtl">تسجيل دخول المشرف</Heading>

      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="البريد الإلكتروني"
        required
        onFocus={() => setError("")}
        dir={email ? "ltr" : "rtl"}
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="كلمة المرور"
        dir={password ? "auto" : "rtl"}
        onFocus={() => setError("")}
        required
      />

      <SubmitButton
        disabled={signingIn ? true : false}
        onClick={() => handleSignin(email, password)}
        $grey={signingIn ? true : false}
        type="submit"
      >
        {" "}
        {signingIn ? "جار تسجيل الدخول…" : " تسجيل الدخول"}
      </SubmitButton>

      {error ?
        <p
          dir="rtl"
          style={{
            fontSize: "1.1rem",
            color: "red",
            textAlign: "center",
            marginTop: "1rem",
            fontWeight: "600",
            width: "80%",
            
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          {error}
        </p>
      : ""}
    </LoginForm>
  );
};

export default Login;
