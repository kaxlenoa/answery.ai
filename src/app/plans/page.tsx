'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClerk } from '@clerk/nextjs';
import { loadStripe } from "@stripe/stripe-js";
import { CheckIcon } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PricingTierProps {
    title: string;
    price: number;
    features: string[];
    onSelect: () => void;
}

const PricingTier: React.FC<PricingTierProps> = ({ title, price, features, onSelect }) => (
    <Card className="w-full md:w-[calc(50%-1rem)] flex flex-col">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
                <span className="text-3xl font-bold">${price}</span> / month
            </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
            <ul className="space-y-2 mb-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                    </li>
                ))}
            </ul>
            <Button onClick={onSelect} className="w-full mt-auto">
                Select Plan
            </Button>
        </CardContent>
    </Card>
);

const PlansPage: React.FC = () => {
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
                    sessionId: session.id,
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
        <div className="flex flex-col w-full text-gray-800 dark:text-white pr-6 pb-6 pl-6">
            <Card className="w-full mb-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Choose Your Plan</CardTitle>
                    <CardDescription>Select the plan that best fits your needs</CardDescription>
                </CardHeader>
            </Card>

            <div className="flex flex-wrap justify-between gap-4">
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
    );
};

export default PlansPage;
