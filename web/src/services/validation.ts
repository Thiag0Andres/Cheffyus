// import { toast } from 'react-toastify';

export const checkPassword = (password: string, confirmPassword: string) => {
  const validate = password === confirmPassword;
  if (validate) {
    return true;
  }
  // toast.error('Senhas não coincidem');
  return false;
};

export const checkAuth = (validationCase: string, value: string | any) => {
  let validation = false;
  switch (validationCase) {
    case "email":
      if (value !== "" && validateEmail(value) === false) {
        // toast.error('Email inválido!');
        validation = false;
        return false;
      }
      validation = true;
      return true;
    case "password":
      if (value === "") {
        // toast.error('Preencha a senha!');
        validation = false;
        return false;
      }
      validation = true;
      return true;

    case "auth":
      if (
        value.email !== "thiagoapalacios@hotmail.com" ||
        value.password !== "123456"
      ) {
        // toast.error(value);
        validation = false;
        return false;
      }
      validation = true;
      return true;
    default:
      break;
  }
  return validation;
};

export const validateEmail = (email: string) => {
  const re = /[\w'+-]+(\.[\w'+-]+)*@\w+([-.]\w+)*\.\w{2,24}/;
  return re.test(String(email).toLowerCase());
};
