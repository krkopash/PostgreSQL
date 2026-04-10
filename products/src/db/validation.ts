import { string, object, email, minLength, pipe, safeParse } from "valibot";

export const userSchema = object({
  name: pipe(string(), minLength(3, "name char must be more than 3")),
  email: pipe(string(), email("invalid email string")),
});

export const validateUser = (data: any) => {
  return safeParse(userSchema, data);
};