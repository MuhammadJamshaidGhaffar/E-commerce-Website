import { loadStripe } from "@stripe/stripe-js";

export default async function checkout({ lineItems }) {
  const stripe = await loadStripe(
    "pk_test_51Mg9cdCw2RqfMKEKKXlvSpKfTPE9n8R4t1J2bFnmUFWCsZ365AYpHV4pBiEjS795IjYJwdI8WP7j5UkIGcxQbVkg00PkLMksds"
  );
  await stripe?.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}/api/test`,
    cancelUrl: `${window.location.origin}/api/test`,
  });
}
