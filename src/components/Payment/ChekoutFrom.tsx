import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import axios from "axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { userId } from "app/slices/userSlice";

export default function CheckoutForm({ cart }) {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const user = useSelector(userId);

  const calculTot = (items) => {
    let total = 0;
    items.map((item) => (total += item.price * item.qte));

    return total + 5 + (total * 5) / 100;
  };
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    const addPayment = async (payment) => {
      let cartId = cart.map((item) => item.productid);
      const invoice = {
        customer: user,
        amount: calculTot(cart),
        paymentId: payment.id,
        products: cartId,
      };
      const response = axios.post("/payment/add", invoice);
    };

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          setId(paymentIntent.id);
          addPayment(paymentIntent);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/mi/payment`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
      >
        <i className="mdi mdi-lock-outline mr-1"></i>{" "}
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message === "Payment succeeded!" && (
        <button
          onClick={() => history.push(`/mi/invoice/${id}`)}
          className="block w-full max-w-xs mx-auto mt-3 bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
        >
          Chek invoice
        </button>
      )}

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
