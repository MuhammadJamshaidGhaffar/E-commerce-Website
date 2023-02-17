import {
  setPaymentMethod,
  setShippingAddress,
  ShippingAddressType,
} from "@/store/reducer";
import { selectShippingAddress } from "@/store/store";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const PaymentMethodSchema = Yup.object().shape({
  paymentMethod: Yup.string().required("Please select payment method"),
});

type props = {
  step: number;
  updateStep: any;
};

export default function PaymentMethod({ step, updateStep }: props) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ paymentMethod: "" }}
      validationSchema={PaymentMethodSchema}
      onSubmit={({ paymentMethod }) => {
        dispatch(setPaymentMethod(paymentMethod));
        updateStep(step + 1);
      }}
    >
      {({ errors, touched }) => (
        <Form className="mx-auto max-w-screen-md">
          <h1 className="mb-4 text-xl">Payment Method</h1>
          {["Paypal", "Stripe", "CashOnDelivery"].map((payment) => (
            <div className="mb-4" key={payment}>
              <label htmlFor="fullName">
                <Field
                  id={payment}
                  name="paymentMethod"
                  className="p-2 outline-none focus:ring-0"
                  type="radio"
                  value={payment}
                />
                {payment}
              </label>
            </div>
          ))}
          {touched.paymentMethod && errors.paymentMethod && (
            <div className="text-red-500">{errors.paymentMethod}</div>
          )}

          <div className="mb-4 flex justify-between">
            <button
              className="default-button"
              onClick={() => {
                updateStep(step - 1);
              }}
            >
              Back
            </button>
            <button className="primary-button" type="submit">
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
