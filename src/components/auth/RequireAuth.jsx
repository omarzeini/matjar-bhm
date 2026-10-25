import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabase";

const RequireAuth = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession);
      }
    });

    supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (!isMounted) return;

        if (sessionError) {
          setError(sessionError);
          return;
        }

        setSession(data.session);
      })
      .catch((sessionError) => {
        if (isMounted) {
          setError(sessionError);
        }
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (error) {
    return <p role="alert">تعذر التحقق من تسجيل الدخول: {error.message}</p>;
  }

  if (session === undefined) {
    return <p role="status">جارٍ التحقق من تسجيل الدخول...</p>;
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
