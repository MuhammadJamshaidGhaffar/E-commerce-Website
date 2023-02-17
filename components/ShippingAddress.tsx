import { setShippingAddress, ShippingAddressType } from "@/store/reducer";
import { selectShippingAddress } from "@/store/store";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const shippingSchema = Yup.object().shape({
  fullName: Yup.string().required("Required*"),
  address: Yup.string()
    .required("Required*")
    .min(2, "Address should be more than 2 chars"),
  city: Yup.string().required("Required*"),
  postalCode: Yup.string().required("Required*"),
  country: Yup.string().required("Required*"),
});

type props = {
  step: number;
  updateStep: any;
};

export default function ShippingAddress({ step, updateStep }: props) {
  const shippingAdress = useSelector(selectShippingAddress);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={shippingAdress}
      validationSchema={shippingSchema}
      onSubmit={(form) => {
        dispatch(setShippingAddress(form));
        updateStep(step + 1);
      }}
    >
      {({ errors, touched }) => (
        <Form className="mx-auto max-w-screen-md">
          <h1 className="mb-4 text-xl">Shipping Address</h1>
          <div className="mb-4">
            <label htmlFor="fullName">Full Name</label>
            <Field id="fullName" name="fullName" className="w-full" autoFocus />
            {touched.fullName && errors.fullName && (
              <div className="text-red-500">{errors.fullName}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="address">Address</label>
            <Field id="address" name="address" className="w-full" autoFocus />
            {touched.address && errors.address && (
              <div className="text-red-500">{errors.address}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="city">City</label>
            <Field id="city" name="city" className="w-full" autoFocus />
            {touched.city && errors.city && (
              <div className="text-red-500">{errors.city}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode">Postal Code</label>
            <Field
              id="postalCode"
              name="postalCode"
              className="w-full"
              autoFocus
            />
            {touched.postalCode && errors.postalCode && (
              <div className="text-red-500">{errors.postalCode}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="country">Country</label>
            <Field id="country" name="country" className="w-full" autoFocus />
            {touched.country && errors.country && (
              <div className="text-red-500">{errors.country}</div>
            )}
          </div>

          <div className="mb-4">
            <button className="primary-button" type="submit">
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
