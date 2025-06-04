"use client";
import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface PaymentFormProps {
  clientSecret: string;
  amount: number;
  currency: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const STRIPE_PUBLISHABLE_KEY = "pk_test_51RWCoEQhAcgp7Y5mbu6ms7vd40n4JTKVF9gz5awwo5snPvRs2mgf3o2GNRYGsSiZvyu74C5GBRHMerQwb7IazJjl00pFeAiomY";

const PaymentFormContent = ({
  amount,
  currency,
  onSuccess,
  onError,
}: Omit<PaymentFormProps, "clientSecret">) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!stripe) {
      setMessage("Initializing payment...");
    } else {
      setMessage("");
    }
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or Elements not initialized");
      return;
    }
    setIsProcessing(true);
    setMessage("");
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message || "Payment failed");
        onError(error.message || "Payment failed");
      } else if (paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
        onSuccess();
      } else {
        setMessage(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setMessage(err.message || "Payment failed");
      onError(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {message && (
        <div className={`text-sm ${message.includes("failed") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </div>
      )}
      
      <PaymentElement />
      
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Total amount:</span>
        <span className="font-semibold">
          {amount.toFixed(2)} {currency.toUpperCase()}
        </span>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-md font-semibold
          ${(!stripe || isProcessing) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {isProcessing ? "Processing..." : "Pay now"}
      </button>
    </form>
  );
};

const PaymentForm = ({ clientSecret, ...props }: PaymentFormProps) => {
  const [stripePromise, setStripePromise] = useState<any>(null);

  useEffect(() => {
    console.log("Initializing Stripe with clientSecret:", clientSecret);
    setStripePromise(loadStripe(STRIPE_PUBLISHABLE_KEY));
  }, [clientSecret]);

  if (!stripePromise) {
    return <div>Loading Stripe...</div>;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#f97316',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '6px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentFormContent {...props} />
    </Elements>
  );
};

export default PaymentForm; 