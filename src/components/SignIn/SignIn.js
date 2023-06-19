import "./SignIn.scss";
import { Formik, Form, useField } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const SignIn = () => {
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label className="signin-form__label" htmlFor={props.id || props.name}>
          {label}
        </label>
        <input className="signin-form__input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
      <div>
        <label className="signin-form__checkbox">
          <input type="checkbox" {...field} {...props} />
          <span className="signin-form__slider"></span>
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <section className="signin">
      <h1>Sign In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(8, "password should be 8 characters or more")
            .required("Required"),
          rememberMe: Yup.boolean(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="signin-form">
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="abc@email.com"
          />
          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Your password"
          />
          <div className="signin-form__rememberme-container">
            <MyCheckbox name="rememberMe" />
            <p className="signin-form__rememberme-text">Remember Me</p>
          </div>
          <button className="signin-form__button" type="submit">
            Sign In
          </button>
        </Form>
      </Formik>
      <div className="signin-form__signup-container">
        <p className="signin-form__signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
