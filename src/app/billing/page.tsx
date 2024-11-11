'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClerk } from '@clerk/nextjs';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/layout/PaymentForm";
import PaymentHistory from "@/components/layout/PaymentHistory";
import { CheckIcon } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const BillingPage: React.FC = () => {
    const clerk = useClerk();
    const { user } = clerk;

    const handleCheckout = async (priceId: string) => {
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId,
                    userId: user?.id,
                }),
            });

            const session = await response.json();
            const stripe = await stripePromise;
            if (stripe) {
                const { error } = await stripe.redirectToCheckout({
                    sessionId: session.id, // Use the session ID returned from our API
                });

                if (error) {
                    console.error('Error:', error);
                }
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="flex flex-col space-y-6 text-gray-800 dark:text-white mr-5 mb-5 ml-5">
            <div className="space-y-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Billing Information</CardTitle>
                    </CardHeader>
                    <Elements stripe={stripePromise}>
                        <PaymentForm userId={user?.id || ''} />
                    </Elements>
                </Card>
                <div className="flex space-x-4">
                    <Card className="w-1/2">
                        <CardHeader>
                            <CardTitle>Daily Usage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">$24.50</div>
                            <p className="text-sm text-gray-500">Today's usage</p>
                        </CardContent>
                    </Card>
                    <PaymentHistory userId={user?.id || ''} activeContent="billing" />
                </div>
                <div className="flex space-x-4">
                    <PricingTier
                        title="Basic Plan"
                        price={10}
                        features={[
                            "100 API calls per day",
                            "Basic support",
                            "1 user included"
                        ]}
                        onSelect={() => handleCheckout('price_1QBLsq2KeRuqWAb1gfvVkcRR')}
                    />
                    <PricingTier
                        title="Pro Plan"
                        price={20}
                        features={[
                            "Unlimited API calls",
                            "Priority support",
                            "5 users included",
                            "Advanced analytics"
                        ]}
                        onSelect={() => handleCheckout('price_1QBLsq2KeRuqWAb1gfvVkcRR')}
                    />
                </div>
            </div>
        </div>
    );
};

interface PricingTierProps {
    title: string;
    price: number;
    features: string[];
    onSelect: () => void;
}

const PricingTier: React.FC<PricingTierProps> = ({ title, price, features, onSelect }) => (
    <Card className="w-1/2">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
                <span className="text-3xl font-bold">${price}</span> / month
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                    </li>
                ))}
            </ul>
            <Button onClick={onSelect} className="w-full mt-4">
                Select Plan
            </Button>
        </CardContent>
    </Card>
);

export default BillingPage;
