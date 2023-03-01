import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { getError } from "@/utils/get-error";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toastFunc } from "@/functions/toast";
import { CircularProgress } from "@mui/material";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(3, "UserName should not be less than 3 letters"),
  email: Yup.string().email("Invalid email").required("Required*"),
  password: Yup.string().min(6, "Too Short!").max(30, "Too long!"),
  confirmPassword: Yup.string()
    .min(6, "Too Short!")
    .oneOf(
      [Yup.ref("password")],
      "Confirm password does not matches with Password"
    ),
});

export default function Register() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);

  if (!session)
    return (
      <div>
        <CircularProgress
          size={100}
          sx={{
            color: "red",
            position: "absolute",
            top: "30%",
            left: "50%",
          }}
        />
        ;
      </div>
    );

  return (
    <Formik
      initialValues={{
        name: session.user.name,
        email: session.user.email,
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={async ({ name, email, password }) => {
        console.log(name, email, typeof password, password.length);

        try {
          const response = await (
            await fetch("/api/auth/update", {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
              }),
            })
          ).json();
          console.log(response);
          if (password.length > 0) {
            const result = await signIn("credentials", {
              redirect: false,
              email,
              password: password,
            });
            if (result) {
              if (result?.error) {
                toastFunc.error(result.error);
              }
              if (result.ok) toastFunc.success("Profile Updated successfully!");
            }
          } else {
            toastFunc.success(
              "Profile Updated successfully! Please Login Again"
            );
            signOut({ redirect: true, callbackUrl: "/" });
          }
        } catch (error) {
          toastFunc.error(getError(error));
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="mx-auto max-w-screen-md">
          <h1 className="mb-4 text-xl">Update Profile</h1>
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" className="w-full" autoFocus />
            {touched.name && errors.name && (
              <div className="text-red-500">{errors.name}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" className="w-full" autoFocus />
            {touched.email && errors.email && (
              <div className="text-red-500">{errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">New Password</label>
            <Field id="password" name="password" className="w-full" />
            {touched.password && errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              className="w-full"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="text-red-500">{errors.confirmPassword}</div>
            )}
          </div>
          <div className="mb-4">
            <button className="primary-button" type="submit">
              Update
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
