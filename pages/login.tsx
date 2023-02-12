import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required*"),
  password: Yup.string()
    .required("Required*")
    .min(6, "Too Short!")
    .max(30, "Too long!"),
});

export default function login() {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="mx-auto max-w-screen-md">
          <h1 className="mb-4 text-xl">Login</h1>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" className="w-full" autoFocus />
            {touched.email && errors.email && (
              <div className="text-red-500">{errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" className="w-full" />
            {touched.password && errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <div className="mb-4">
            <button className="primary-button">Login</button>
          </div>
          <div className="mb-4">
            Don&apos;t have an account? &nbsp;{" "}
            <Link href="register">Register</Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
