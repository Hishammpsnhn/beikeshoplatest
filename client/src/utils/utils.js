
import validator, { isNumeric } from "validator";

export const isValidUsername = (username) => {
  const isValidLength = validator.isLength(username, { min: 3, max: 16 });
  const isValidCharacters = validator.matches(username, /^[a-zA-Z0-9_-]+$/);
  return isValidLength && isValidCharacters;
};
export const validation = (data) => {
  if (!validator.isEmail(data.email)) return `Enter valid email address`;
  if (!isValidUsername(data.userName)) return `Enter valid UserName`;
  if (!isNumeric(data.phoneNumber)) return `Enter valid phone number`;
};
