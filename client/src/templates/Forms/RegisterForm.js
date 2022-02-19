import React, { useState } from "react";
import "./FormStyle.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ registerUser }) => {
  let navigate = useNavigate();

  const [formInfo, setFormInfo] = useState();

  const registerRequest = async (e) => {
    e.preventDefault();
    const registered = await registerUser(formInfo);
    if (registered) navigate("/profile");
  };

  return (
    <form>
      <input
        type="text"
        name="username"
        placeholder="Create a Username"
        onChange={(e) => {
          setFormInfo({ ...formInfo, username: e.target.value });
        }}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter your E-mail"
        onChange={(e) => {
          setFormInfo({ ...formInfo, email: e.target.value });
        }}
      />

      <input
        type="password"
        name="password"
        placeholder="Password must include a number"
        onChange={(e) => {
          setFormInfo({ ...formInfo, password: e.target.value });
        }}
      />

      <input
        type="password"
        name="repassword"
        placeholder="Re-enter your Password"
        onChange={(e) => {
          setFormInfo({ ...formInfo, confirmPassword: e.target.value });
        }}
      />

      <Button
        {...{
          label: "Submit",
          extraClass: "submit-register",
          transparent: false,
          onClick: registerRequest,
        }}
      />
    </form>
  );
};

export default RegisterForm;
