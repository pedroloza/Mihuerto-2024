import React, { useState } from "react";
import { InputGroup, InputGroupText, Input, FormFeedback } from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldProps } from "formik";

interface PasswordInputProps extends FieldProps {
  placeholder?: string;
  disabled?: boolean;
}

const CustomPasswordInput: React.FC<PasswordInputProps> = ({
  field,
  form,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <InputGroup>
      <Input
        {...field}
        {...props}
        autocomplete="off"
        autoComplete="off"
        type={passwordVisible ? "text" : "password"}
      />
      <InputGroupText onClick={togglePasswordVisibility}>
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </InputGroupText>
    </InputGroup>
  );
};

export default CustomPasswordInput;
