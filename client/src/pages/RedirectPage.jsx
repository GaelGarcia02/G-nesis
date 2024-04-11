import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(`/verification/${user.id}`);
    } else {
      navigate("/");
    }
  }, [user, navigate]);
};

export default RedirectPage;
