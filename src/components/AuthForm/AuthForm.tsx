import type { AuthData } from "../../types/auth";

import css from "./AuthForm.module.css";

interface AuthFormProps {
  onSubmit: (authData: AuthData) => void;
}

export const AuthForm = ({ onSubmit }: AuthFormProps) => {
  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onSubmit({ email, password });
  };

  return (
    <form
      action={handleSubmit}
      className={css.form}
    >
      <label className={css.label}>
        Email:
        <input
          type="email"
          name="email"
          className={css.input}
        />
      </label>
      <label className={css.label}>
        Password:
        <input
          type="password"
          name="password"
          className={css.input}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};
