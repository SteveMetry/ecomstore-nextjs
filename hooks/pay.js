import { loadStripe } from "@stripe/stripe-js";

export async function pay({ lineItems }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
    }
    return stripePromise;
  };
  const stripe = await getStripe();
  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `https://shop.sendnet.co/checkout/order?order_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}`
  });
}
