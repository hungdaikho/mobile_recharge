import React, { useState } from 'react';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { IPaymentResponse, IPaymentStatus } from '../checkout/payment';
import { getApiKey } from '@/utils/variable';

type Props = {
    paymentResponse: IPaymentResponse;
    resetPaymentForm: (status: IPaymentStatus) => void;
};

const CheckoutForm = ({ resetPaymentForm }: { resetPaymentForm: (status: IPaymentStatus) => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {}, // ⛔️ No return_url
            redirect: 'if_required', // ⬅️ IMPORTANT: only redirect if Stripe requires
        });

        if (error) {
            setMessage(error.message || 'An unexpected error occurred.');
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            resetPaymentForm({
                status: 1,
                message: `Payment successful ${paymentIntent.amount} ${paymentIntent.currency} - reference code: ${paymentIntent.id}`,
            })
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            <button
                type="submit"
                disabled={isLoading || !stripe || !elements}
                className={`w-full bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-md font-semibold
                    ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
            >
                {isLoading ? 'Processing...' : 'Pay'}
            </button>
            {message && <div className="text-red-600">{message}</div>}
        </form>
    );
};

const PaymentForm = ({ paymentResponse, resetPaymentForm }: Props) => {
    const { clientSecret } = paymentResponse;
    const stripePromise = loadStripe(getApiKey() || '');

    if (!clientSecret) return <div>Payment information not found.</div>;

    return (
        <div
            className="space-y-6 col-span-3 border-r-2 p-12"
            style={{ borderColor: '#e5e7eb' }}
        >
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm resetPaymentForm={resetPaymentForm} />
            </Elements>
        </div>
    );
};

export default PaymentForm;
