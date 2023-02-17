import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { getError } from "@/utils/get-error";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required*"),
  password: Yup.string()
    .required("Required*")
    .min(6, "Too Short!")
    .max(30, "Too long!"),
});

export default function login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={async ({ email, password }) => {
        try {
          const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });
          if (result?.error) {
            toast.error(result.error);
          }
          if (result.ok) toast.success("Login Succesful!");
        } catch (error) {
          toast.error(getError(error));
        }
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
            <button className="primary-button" type="submit">
              Login
            </button>
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
