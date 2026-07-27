import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import arrowRightIcon from "@/assets/images/icons/arrow-right.svg";
import authBackground from "@/assets/images/auth/bg.png";

import NameIcon from "@/assets/images/auth/name.svg?react";
import EmailIcon from "@/assets/images/auth/email.svg?react";
import PasswordHiddenIcon from "@/assets/images/auth/password.svg?react";
import PasswordVisibleIcon from "@/assets/images/auth/password-visible.svg?react";

import "./AuthPage.scss";
import { ApiError } from "@/shared/api/httpClient";

type AuthMode = "register" | "login";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginForm = {
  email: string;
  password: string;
};

type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;
type LoginErrors = Partial<Record<keyof LoginForm, string>>;

const SUCCESS_MODAL_TIMEOUT_MS = 2200;
const PROFILE_NAVIGATION_DELAY_MS = 900;

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEXP = /^[A-Za-zА-Яа-яЁёІіЇїЄє0-9_ .'-]{2,30}$/;
const PASSWORD_UPPERCASE_REGEXP = /[A-Z]/;
const PASSWORD_LOWERCASE_REGEXP = /[a-z]/;
const PASSWORD_NUMBER_REGEXP = /[0-9]/;

const DEFAULT_REGISTER_FORM: RegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const DEFAULT_LOGIN_FORM: LoginForm = {
  email: "",
  password: "",
};

const validateName = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Name is required";
  }

  if (!NAME_REGEXP.test(trimmedValue)) {
    return "Use 2-30 characters: letters, numbers, spaces or _ . ' -";
  }

  return "";
};

const validateEmail = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Email is required";
  }

  if (!EMAIL_REGEXP.test(trimmedValue)) {
    return "Enter a valid email address";
  }

  return "";
};

const validatePassword = (value: string) => {
  if (!value) {
    return "Password is required";
  }

  if (value.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (!PASSWORD_UPPERCASE_REGEXP.test(value)) {
    return "Add at least one uppercase letter";
  }

  if (!PASSWORD_LOWERCASE_REGEXP.test(value)) {
    return "Add at least one lowercase letter";
  }

  if (!PASSWORD_NUMBER_REGEXP.test(value)) {
    return "Add at least one number";
  }

  return "";
};

const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};

const getRegisterFieldError = (
  field: keyof RegisterForm,
  form: RegisterForm,
): string => {
  switch (field) {
    case "name":
      return validateName(form.name);

    case "email":
      return validateEmail(form.email);

    case "password":
      return validatePassword(form.password);

    case "confirmPassword":
      return validateConfirmPassword(form.password, form.confirmPassword);

    default:
      return "";
  }
};

const getLoginFieldError = (
  field: keyof LoginForm,
  form: LoginForm,
): string => {
  switch (field) {
    case "email":
      return validateEmail(form.email);

      case "password":
        return form.password.length === 0 ? "Password is required" : "";

    default:
      return "";
  }
};

type SuccessModalProps = {
  isOpen: boolean;
  title: string;
  text: string;
};

const AuthSuccessModal = ({ isOpen, title, text }: SuccessModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="auth-success-modal" role="status" aria-live="polite">
      <div className="auth-success-modal__overlay" />

      <div className="auth-success-modal__content">
        <div className="auth-success-modal__check" aria-hidden="true">
          <span className="auth-success-modal__check-mark">✓</span>
        </div>

        <h2 className="auth-success-modal__title">{title}</h2>

        <p className="auth-success-modal__text">{text}</p>
      </div>
    </div>
  );
};

export const AuthPage = () => {
  const navigate = useNavigate();
  const { register, login } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  const mode: AuthMode =
    searchParams.get("mode") === "login" ? "login" : "register";

  const [registerForm, setRegisterForm] =
    useState<RegisterForm>(DEFAULT_REGISTER_FORM);
  const [loginForm, setLoginForm] = useState<LoginForm>(DEFAULT_LOGIN_FORM);

  const [registerTouched, setRegisterTouched] = useState<
    Partial<Record<keyof RegisterForm, boolean>>
  >({});
  const [loginTouched, setLoginTouched] = useState<
    Partial<Record<keyof LoginForm, boolean>>
  >({});

  const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] =
    useState(false);
  const [isRegisterConfirmPasswordVisible, setIsRegisterConfirmPasswordVisible] =
    useState(false);
  const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
  const emailFromQuery = searchParams.get("email");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { isAuthenticated, isLoadingUser } = useAuth();

useEffect(() => {
  if (isAuthenticated && !isLoadingUser) {
    navigate("/profile");
  }
}, [isAuthenticated, isLoadingUser, navigate]);

  useEffect(() => {
    if (!isSuccessModalOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSuccessModalOpen(false);
    }, SUCCESS_MODAL_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSuccessModalOpen]);

  useEffect(() => {
    if (mode === "login") {
      setLoginForm({
        email: emailFromQuery || "",
        password: "",
      });
    }
  }, [mode, emailFromQuery]);

  useEffect(() => {
    if (mode === "login" && emailFromQuery) {
      const input = document.getElementById("loginPassword");
      input?.focus();
    }
  }, [mode, emailFromQuery]);

  const registerErrors = useMemo<RegisterErrors>(() => {
    return {
      name: getRegisterFieldError("name", registerForm),
      email: getRegisterFieldError("email", registerForm),
      password: getRegisterFieldError("password", registerForm),
      confirmPassword: getRegisterFieldError("confirmPassword", registerForm),
    };
  }, [registerForm]);

  const loginErrors = useMemo<LoginErrors>(() => {
    return {
      email: loginTouched.email
        ? getLoginFieldError("email", loginForm)
        : "",
      password: loginTouched.password
        ? getLoginFieldError("password", loginForm)
        : "",
    };
  }, [loginForm, loginTouched]);

  const isRegisterFormValid =
    !registerErrors.name &&
    !registerErrors.email &&
    !registerErrors.password &&
    !registerErrors.confirmPassword;

  const isLoginFormValid = !loginErrors.email && !loginErrors.password;

  const isNameValid = registerForm.name.trim() !== "" && !registerErrors.name;

  const isRegisterEmailValid =
    registerForm.email.trim() !== "" && !registerErrors.email;

  const isRegisterPasswordValid =
    registerForm.password !== "" && !registerErrors.password;

  const isConfirmPasswordValid =
    registerForm.confirmPassword !== "" && !registerErrors.confirmPassword;

  const isLoginEmailValid =
    loginForm.email.trim() !== "" && !loginErrors.email;

  const handleSwitchMode = useCallback(
    (nextMode: AuthMode) => {
      if (isSubmitting) {
        return;
      }

      setSubmitError("");
      setSearchParams({ mode: nextMode });
    },
    [isSubmitting, setSearchParams],
  );

  const handleRegisterInputChange = useCallback(
    (field: keyof RegisterForm, value: string) => {
      setSubmitError("");

      setRegisterForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleLoginInputChange = useCallback(
    (field: keyof LoginForm, value: string) => {
      setSubmitError("");

      setLoginForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleRegisterBlur = useCallback((field: keyof RegisterForm) => {
    setRegisterTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  const handleLoginBlur = useCallback((field: keyof LoginForm) => {
    setLoginTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  const handleRegisterSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      setRegisterTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });

      if (!isRegisterFormValid) {
        setSubmitError("Please fix the highlighted fields");

        return;
      }

      setSubmitError("");
      setIsSubmitting(true);


      try {
        const email = registerForm.email.trim();
      
        await register({
          name: registerForm.name.trim(),
          email: email.trim(),
          password: registerForm.password,
        });
      
        setRegisterTouched({});
        setIsRegisterPasswordVisible(false);
        setIsRegisterConfirmPasswordVisible(false);
      
        setTimeout(() => {
          navigate(`/auth?mode=login&email=${encodeURIComponent(email)}`);
        }, PROFILE_NAVIGATION_DELAY_MS);
      
        setRegisterForm(DEFAULT_REGISTER_FORM);

      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 409) {
            setSubmitError("User already exists");
          } else {
            setSubmitError(error.message);
          }
        } else {
          setSubmitError("Something went wrong. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [isRegisterFormValid, isSubmitting, navigate, register, registerForm],
  );

  const handleLoginSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      setLoginTouched({
        email: true,
        password: true,
      });

      if (!isLoginFormValid) {
        setSubmitError("Please enter a valid email and password");

        return;
      }

      setSubmitError("");
      setIsSubmitting(true);

      try {
        await login({
          email: loginForm.email.trim(),
          password: loginForm.password,
        });

        setIsSuccessModalOpen(true);

        setLoginForm(DEFAULT_LOGIN_FORM);
        setLoginTouched({});
        setIsLoginPasswordVisible(false);

        window.setTimeout(() => {
          navigate("/profile");
        }, PROFILE_NAVIGATION_DELAY_MS);
      } catch (error) {
        if (error instanceof ApiError) {
          setSubmitError(error.message);

          return;
        }

        setSubmitError("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isLoginFormValid, isSubmitting, login, loginForm, navigate],
  );

  return (
    <>
      <main
        className="auth-page"
        style={{
          backgroundImage: `url(${authBackground})`,
        }}
      >
        <div className="auth-page__overlay" />

        <div className="container">
          <div className="auth-page__content">
            <section className="auth-page__form-side">
              <h1 className="auth-page__title">
                {mode === "register" ? "Create an account" : "Welcome back"}
              </h1>

              {mode === "register" ? (
                <form
                  className="auth-page__form"
                  onSubmit={handleRegisterSubmit}
                  noValidate
                >
                  <div className="auth-page__fields">
                    <div className="auth-page__field">
                      <label className="auth-page__field-label" htmlFor="name">
                        Your name
                      </label>

                      <div
                        className={`auth-page__input-wrap ${
                          isNameValid ? "auth-page__input-wrap--valid" : ""
                        } ${
                          registerTouched.name && registerErrors.name
                            ? "auth-page__input-wrap--error"
                            : ""
                        }`}
                      >
                        <div className="auth-page__field-caption">
                          Your name
                        </div>

                        <div className="auth-page__input-icon">
                          <NameIcon aria-hidden="true" focusable="false" />
                        </div>

                        <input
                          id="name"
                          className="auth-page__input"
                          type="text"
                          name="name"
                          placeholder="Your name"
                          value={registerForm.name}
                          autoComplete="name"
                          disabled={isSubmitting}
                          onChange={(event) =>
                            handleRegisterInputChange(
                              "name",
                              event.target.value,
                            )
                          }
                          onBlur={() => handleRegisterBlur("name")}
                        />

                        {isNameValid && (
                          <div
                            className="auth-page__status"
                            aria-hidden="true"
                          >
                            <span className="auth-page__status-mark">✓</span>
                          </div>
                        )}
                      </div>

                      {registerTouched.name && registerErrors.name && (
                        <p className="auth-page__error">
                          {registerErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="auth-page__field">
                      <label className="auth-page__field-label" htmlFor="email">
                        Email
                      </label>

                      <div
                        className={`auth-page__input-wrap ${
                          isRegisterEmailValid
                            ? "auth-page__input-wrap--valid"
                            : ""
                        } ${
                          registerTouched.email && registerErrors.email
                            ? "auth-page__input-wrap--error"
                            : ""
                        }`}
                      >
                        <div className="auth-page__field-caption">Email</div>

                        <div className="auth-page__input-icon">
                          <EmailIcon aria-hidden="true" focusable="false" />
                        </div>

                        <input
                          id="email"
                          className="auth-page__input"
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={registerForm.email}
                          autoComplete="email"
                          disabled={isSubmitting}
                          onChange={(event) =>
                            handleRegisterInputChange(
                              "email",
                              event.target.value,
                            )
                          }
                          onBlur={() => handleRegisterBlur("email")}
                        />

                        {isRegisterEmailValid && (
                          <div
                            className="auth-page__status"
                            aria-hidden="true"
                          >
                            <span className="auth-page__status-mark">✓</span>
                          </div>
                        )}
                      </div>

                      {registerTouched.email && registerErrors.email && (
                        <p className="auth-page__error">
                          {registerErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="auth-page__field">
                      <label
                        className="auth-page__field-label"
                        htmlFor="password"
                      >
                        Create password
                      </label>

                      <div
                        className={`auth-page__input-wrap ${
                          isRegisterPasswordValid
                            ? "auth-page__input-wrap--valid"
                            : ""
                        } ${
                          registerTouched.password && registerErrors.password
                            ? "auth-page__input-wrap--error"
                            : ""
                        }`}
                      >
                        <div className="auth-page__field-caption">
                          Create password
                        </div>

                        <div className="auth-page__input-icon">
                          {isRegisterPasswordVisible ? (
                            <PasswordVisibleIcon
                              aria-hidden="true"
                              focusable="false"
                            />
                          ) : (
                            <PasswordHiddenIcon
                              aria-hidden="true"
                              focusable="false"
                            />
                          )}
                        </div>

                        <input
                          id="password"
                          className="auth-page__input"
                          type={isRegisterPasswordVisible ? "text" : "password"}
                          name="password"
                          placeholder="Create password"
                          value={registerForm.password}
                          autoComplete="new-password"
                          disabled={isSubmitting}
                          onChange={(event) =>
                            handleRegisterInputChange(
                              "password",
                              event.target.value,
                            )
                          }
                          onBlur={() => handleRegisterBlur("password")}
                        />

                        <div className="auth-page__input-actions">
                          <button
                            className="auth-page__visibility-toggle"
                            type="button"
                            disabled={isSubmitting}
                            onClick={() =>
                              setIsRegisterPasswordVisible((prev) => !prev)
                            }
                          >
                            {isRegisterPasswordVisible ? "Hide" : "Show"}
                          </button>

                          {isRegisterPasswordValid && (
                            <div className="auth-page__status">
                              <span className="auth-page__status-mark">✓</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {registerTouched.password && registerErrors.password && (
                        <p className="auth-page__error">
                          {registerErrors.password}
                        </p>
                      )}
                    </div>

                    <div className="auth-page__field">
                      <label
                        className="auth-page__field-label"
                        htmlFor="confirmPassword"
                      >
                        Confirm password
                      </label>

                      <div
                        className={`auth-page__input-wrap ${
                          isConfirmPasswordValid
                            ? "auth-page__input-wrap--valid"
                            : ""
                        } ${
                          registerTouched.confirmPassword &&
                          registerErrors.confirmPassword
                            ? "auth-page__input-wrap--error"
                            : ""
                        }`}
                      >
                        <div className="auth-page__field-caption">
                          Confirm password
                        </div>

                        <div className="auth-page__input-icon">
                          {isRegisterConfirmPasswordVisible ? (
                            <PasswordVisibleIcon
                              aria-hidden="true"
                              focusable="false"
                            />
                          ) : (
                            <PasswordHiddenIcon
                              aria-hidden="true"
                              focusable="false"
                            />
                          )}
                        </div>

                        <input
                          id="confirmPassword"
                          className="auth-page__input"
                          type={
                            isRegisterConfirmPasswordVisible
                              ? "text"
                              : "password"
                          }
                          name="confirmPassword"
                          placeholder="Confirm password"
                          value={registerForm.confirmPassword}
                          autoComplete="new-password"
                          disabled={isSubmitting}
                          onChange={(event) =>
                            handleRegisterInputChange(
                              "confirmPassword",
                              event.target.value,
                            )
                          }
                          onBlur={() => handleRegisterBlur("confirmPassword")}
                        />

                          <div className="auth-page__input-actions">
                            <button
                              className="auth-page__visibility-toggle"
                              type="button"
                              disabled={isSubmitting}
                              onClick={() =>
                                setIsRegisterConfirmPasswordVisible((prev) => !prev)
                              }
                            >
                              {isRegisterConfirmPasswordVisible ? "Hide" : "Show"}
                            </button>

                            {isConfirmPasswordValid && (
                              <div className="auth-page__status">
                                <span className="auth-page__status-mark">✓</span>
                              </div>
                            )}
                          </div>
                      </div>

                      {registerTouched.confirmPassword &&
                        registerErrors.confirmPassword && (
                          <p className="auth-page__error">
                            {registerErrors.confirmPassword}
                          </p>
                        )}
                    </div>

                    {submitError && (
                      <p className="auth-page__submit-error">{submitError}</p>
                    )}
                  </div>

                  <button
                    className="auth-page__submit"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? "Please wait..." : "Continue"}</span>

                    <img src={arrowRightIcon} alt="" aria-hidden="true" />
                  </button>

                  <p className="auth-page__switch-text">
                    Already have an account?{" "}
                    <button
                      className="auth-page__switch-button"
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleSwitchMode("login")}
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              ) : (
                <form
                  className="auth-page__form"
                  onSubmit={handleLoginSubmit}
                  noValidate
                >
                  <div className="auth-page__fields">
                    <div className="auth-page__field">
                      <label
                        className="auth-page__field-label"
                        htmlFor="loginEmail"
                      >
                        Email
                      </label>

                      <div
                        className={`auth-page__input-wrap ${
                          isLoginEmailValid
                            ? "auth-page__input-wrap--valid"
                            : ""
                        } ${
                          loginTouched.email && loginErrors.email
                            ? "auth-page__input-wrap--error"
                            : ""
                        }`}
                      >
                        <div className="auth-page__field-caption">Email</div>

                        <div className="auth-page__input-icon">
                          <EmailIcon aria-hidden="true" focusable="false" />
                        </div>

                        <input
                          id="loginEmail"
                          className="auth-page__input"
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={loginForm.email}
                          autoComplete="email"
                          disabled={isSubmitting}
                          onChange={(event) =>
                            handleLoginInputChange("email", event.target.value)
                          }
                          onBlur={() => handleLoginBlur("email")}
                        />

                        {isLoginEmailValid && (
                          <div
                            className="auth-page__status"
                            aria-hidden="true"
                          >
                            <span className="auth-page__status-mark">✓</span>
                          </div>
                        )}
                      </div>

                      {loginTouched.email && loginErrors.email && (
                        <p className="auth-page__error">{loginErrors.email}</p>
                      )}
                    </div>

                    <div className="auth-page__field">
                      <label
                        className="auth-page__field-label"
                        htmlFor="loginPassword"
                      >
                        Password
                      </label>

                      <div
                        className={`auth-page__input-wrap ${
                          loginTouched.password && loginErrors.password
                            ? "auth-page__input-wrap--error"
                            : ""
                        }`}
                      >
                        <div className="auth-page__field-caption">
                          Password
                        </div>

                        <div className="auth-page__input-icon">
                          {isLoginPasswordVisible ? (
                            <PasswordVisibleIcon
                              aria-hidden="true"
                              focusable="false"
                            />
                          ) : (
                            <PasswordHiddenIcon
                              aria-hidden="true"
                              focusable="false"
                            />
                          )}
                        </div>

                        <input
                          id="loginPassword"
                          className="auth-page__input"
                          type={isLoginPasswordVisible ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={loginForm.password}
                          autoComplete="current-password"
                          disabled={isSubmitting}
                          onChange={(event) =>
                            handleLoginInputChange("password", event.target.value)
                          }
                          onBlur={() => handleLoginBlur("password")}
                        />

                        <button
                          className="auth-page__visibility-toggle"
                          type="button"
                          aria-label={
                            isLoginPasswordVisible ? "Hide password" : "Show password"
                          }
                          disabled={isSubmitting}
                          onClick={() =>
                            setIsLoginPasswordVisible((prev) => !prev)
                          }
                        >
                          {isLoginPasswordVisible ? "Hide" : "Show"}
                        </button>
                      </div>

                      {loginTouched.password && loginErrors.password && (
                        <p className="auth-page__error">
                          {loginErrors.password}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <p className="auth-page__submit-error">{submitError}</p>
                    )}
                  </div>

                  <button
                    className="auth-page__submit"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? "Please wait..." : "Continue"}</span>

                    <img src={arrowRightIcon} alt="" aria-hidden="true" />
                  </button>

                  <p className="auth-page__switch-text">
                    Don’t have an account?{" "}
                    <button
                      className="auth-page__switch-button"
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleSwitchMode("register")}
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              )}
            </section>
          </div>
        </div>
      </main>

      <AuthSuccessModal
        isOpen={isSuccessModalOpen}
        title="Login successful"
        text="You have successfully signed into your account"
      />
    </>
  );
};
