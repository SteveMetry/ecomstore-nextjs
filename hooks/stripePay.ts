import { loadStripe } from "@stripe/stripe-js";

import { StripeItem } from ".entities/stripeItem.interface";

export async function stripePay(lineItems: StripeItem[]) {
  const stripePromise = await loadStripe(
    process.env.NEXT_PUBLIC_API_KEY as string
  );

  if (stripePromise != null) {
    await stripePromise.redirectToCheckout({
      mode: "payment",
      lineItems,
      successUrl: `https://shop.sendnet.co/checkout/order?order_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}`
    });
  }
}
