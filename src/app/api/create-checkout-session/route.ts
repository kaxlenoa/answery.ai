import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-09-30.acacia', // Updated to the latest version
});

export async function POST(req: Request) {
    const { priceId, userId } = await req.json();

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `http://localhost:6000/billing?success=true`,
            cancel_url: `http://localhost:6000/billing?canceled=true`,
            client_reference_id: userId,
        });

        return NextResponse.json({ id: session.id });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
