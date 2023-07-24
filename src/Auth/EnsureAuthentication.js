import { useNavigate } from "react-router-dom";
import { selectAdminUser } from "../redux/states/adminSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const EnsureAuthentication = () => {
  const adminUser = useSelector(selectAdminUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (adminUser === null) {
      // navigate("/"); // Replace "/" with the desired page path
    }
  }, [adminUser, navigate]);
};
