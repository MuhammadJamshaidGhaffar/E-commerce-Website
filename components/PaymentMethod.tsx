import { setPaymentMethod } from "@/store/reducer";
import { selectPaymentMethod } from "@/store/store";
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
  const selectedPaymentMethod = useSelector(selectPaymentMethod);

  return (
    <Formik
      initialValues={{ paymentMethod: selectedPaymentMethod }}
      validationSchema={PaymentMethodSchema}
      onSubmit={({ paymentMethod }) => {
        console.log("Setting payment method", paymentMethod);
        dispatch(setPaymentMethod(paymentMethod));
        updateStep(step + 1);
      }}
    >
      {({ errors, touched }) => (
        <Form className="mx-auto max-w-screen-md">
          <h1 className="mb-4 text-xl">Payment Method</h1>
          {["Paypal", "Stripe", "CashOnDelivery"].map((payment) => (
            <div className="mb-4" key={payment}>
              <label htmlFor={payment}>
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
