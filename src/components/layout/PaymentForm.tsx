'use client'
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StripeCardElement } from '@stripe/stripe-js';
import { useCheckUserStatus } from '../utils/helpers';
import Image from 'next/image';

const createPaymentIntent = async ({ amount, userId }: { amount: number, userId: string }) => {
    console.log('Sending request to create payment intent');
    const response = await fetch('http://localhost:4000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount, userId }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
    }
    return response.json();
};

const checkPaymentStatus = async (paymentIntentId: string) => {
    try {
        const response = await fetch(`http://localhost:4000/check-payment/${paymentIntentId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to check payment status: ${errorData.error || response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error checking payment status:', error);
        throw error;
    }
};

// Create a client
const queryClient = new QueryClient()

interface UserPaymentStatus {
    hasActiveSubscription: boolean;
    lastPaymentDate?: string;
    cardInfo?: {
        last4: string;
        expMonth: string;
        expYear: string;
    };
}

const PaymentFormContent = ({ userId }: { userId: string }) => {
    const [amount, setAmount] = useState<number>(1000);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [paymentInfo, setPaymentInfo] = useState<{ amount: number, currency: string, userId: string } | null>(null);
    const [error, setError] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const { userPaymentStatus, errorStatus, checkUserStatus } = useCheckUserStatus(userId)


    useEffect(() => {
        checkUserStatus(userId);
    }, [userId]);

    const mutation = useMutation({
        mutationFn: createPaymentIntent,
        onSuccess: (data: any) => console.log('Payment intent created:', data),
        onError: (error: any) => {
            console.error('Error creating payment intent:', error);
            setError(error.message || 'An error occurred while processing your payment.');
        },
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        if (!stripe || !elements || !userId) return;
        if (amount < 50) {
            setError('Amount must be at least 50 cents');
            return;
        }

        try {
            setPaymentStatus('processing');
            const { clientSecret } = await mutation.mutateAsync({ amount, userId });
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement) as StripeCardElement,
                    billing_details: { name: 'Jenny Rosen' },
                },
            });

            if (result.error) {
                console.log('Payment confirmation error:', result.error.message);
                setPaymentStatus('failed');
                setError(result.error.message || 'Payment failed');
            } else {
                try {
                    const paymentStatus = await checkPaymentStatus(result.paymentIntent.id);
                    console.log('Payment status response:', paymentStatus);
                    if (paymentStatus.status === 'succeeded') {
                        console.log('Payment succeeded');
                        setPaymentStatus('succeeded');
                    } else {
                        console.log('Payment status:', paymentStatus.status);
                        setPaymentStatus(paymentStatus.status);
                    }
                    setPaymentInfo(paymentStatus);
                } catch (statusError) {
                    console.error('Error checking payment status:', statusError);
                    setPaymentStatus('error');
                    setError('Error checking payment status');
                }
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setPaymentStatus('failed');
            setError('An error occurred while processing your payment');
        }
    };





    if (userPaymentStatus?.hasActiveSubscription) {
        return (
            <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg shadow-md text-white">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-lg font-semibold">Credit Card</div>
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    </div>
                    <div className="mb-4">
                        <div className="text-sm opacity-75">Card Number</div>
                        <div className="font-mono">**** **** **** {userPaymentStatus.cardInfo?.last4}</div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="text-sm opacity-75">Expiration Date</div>
                            <div>{userPaymentStatus.cardInfo?.expMonth}/{userPaymentStatus.cardInfo?.expYear}</div>
                        </div>
                        <div>
                            <div className="text-sm opacity-75">CVV</div>
                            <div>***</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Complete Your Payment</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount ($)</label>
                            <input
                                type="number"
                                id="amount"
                                value={(amount / 100)}
                                onChange={(e) => setAmount(Math.floor(parseFloat(e.target.value) * 100))}
                                min="0.50"
                                step="0.01"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Credit or debit card</label>
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                                <CardElement id="card-element" options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }} />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={!stripe || mutation.isPending || !userId || !amount}
                            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600"
                        >
                            {mutation.isPending ? 'Processing...' : `Pay $${(amount / 100) || ''}`}
                        </button>
                        <div className="flex items-center justify-center space-x-2">
                            <Image
                                src="/svg/stripe.svg"
                                alt="Powered by Stripe"
                                width={60}
                                height={25}
                            />
                        </div>
                    </form>
                </div>

                {/* Right column: Payment status and info */}
                <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Payment Status</h3>
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-md">
                            {error}
                        </div>
                    )}
                    {paymentStatus && !error && (
                        <div className={`p-4 rounded-md ${paymentStatus === 'processing' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                            paymentStatus === 'succeeded' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                                'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                            }`}>
                            <p className="font-semibold">
                                {paymentStatus === 'processing' && 'Processing payment...'}
                                {paymentStatus === 'succeeded' && 'Payment successful!'}
                                {paymentStatus === 'failed' && 'Payment failed. Please try again.'}
                            </p>
                            {paymentInfo && (
                                <div className="mt-3 text-sm">
                                    <p>Amount: ${paymentInfo.amount / 100}</p>
                                    <p>Currency: {paymentInfo.currency}</p>
                                    <p>User ID: {paymentInfo.userId}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="mt-6">
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Secure Payments</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            We use Stripe to ensure your payment information is secure. Your card details are encrypted and never stored on our servers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentForm = ({ userId }: { userId: string }) => {
    console.log(userId, 'userId')
    return (
        <QueryClientProvider client={queryClient}>
            <PaymentFormContent userId={userId} />
        </QueryClientProvider>
    );
};

export default PaymentForm;
