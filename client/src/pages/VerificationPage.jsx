import React, { useEffect, useState } from "react";
import { useUsers } from "../context/UsersContext";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/ModalPassword.jsx";

function VerificationPage() {
  const { getUser } = useUsers();
  const { id } = useParams();
  const [changePassword, setChangePassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function loadChangePassword() {
      const user = await getUser(id);
      const changePassword = user.passwordChange;

      if (isMounted) {
        setChangePassword(changePassword);

        if (!changePassword) {
          setShowModal(true);
        } else {
          navigate("/horses");
        }
      }
    }

    loadChangePassword();

    return () => {
      isMounted = false;
    };
  }, [id, getUser, navigate]);

  return <div>{showModal && !changePassword && <Modal />}</div>;
}

export default VerificationPage;
