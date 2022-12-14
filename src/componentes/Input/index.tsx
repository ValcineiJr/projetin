import React, { useState } from "react";
import InputMask from "react-input-mask";

import { Container, NormalInput } from "./styles";

interface InputProps {
  mask?: any;
  type?: string;
  value: any;
  onChange: (e: any) => void;
  placeholder: string;
  errorMessage?: string;
  showError?: boolean;
  onBlur?: () => void;
  required?: boolean;
}

const Input = ({
  mask = "",
  errorMessage = "",
  showError = false,
  required = true,
  ...props
}: InputProps) => {
  const [value, setValue] = useState(false);

  if (mask !== "") {
    return (
      <Container>
        <InputMask {...props} mask={mask} />
        {errorMessage !== "" && (
          <p className="error message">Preencha corretamente.</p>
        )}
      </Container>
    );
  } else {
    return (
      <Container>
        <NormalInput required={required} {...props} />
      </Container>
    );
  }
};

export default Input;
