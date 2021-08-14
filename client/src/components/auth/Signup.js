import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { register as signup } from "../../actions/auth";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const password = useRef({});
  password.current = watch("password", "");

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const onSubmit = async ({ name, email, password }) => {
    dispatch(signup({ name, email, password }));
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="Login">
      <svg
        viewBox="0 0 24 24"
        aria-label="Twitter"
        className="bird r-13gxpu9 r-4qtqp9 r-yyyyoo r-16y2uox r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
      >
        <g>
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
        </g>
      </svg>
      <h1 className="lead bold">Create Your Account</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <span role="alert">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && <span role="alert">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
              pattern: {
                message: "Please enter a valid password with at least 6 chars",
              },
            })}
          />
          {errors.password && (
            <span role="alert">{errors.password.message}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: {
                value: (value) =>
                  value === password.current || "The passwords do not match",
              },
            })}
          />
          {errors.confirmPassword && (
            <span role="alert">{errors.confirmPassword.message}</span>
          )}
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          disabled={!isValid || isSubmitting}
          value="Signup"
        />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
