import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Payment = {
    paymentHistory: {
        id: string;
        amount: number;
        date: string;
    }[];
}

type PaymentHistoryProps = {
    userId: string;
    activeContent: string;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ userId, activeContent }) => {
    const [payments, setPayments] = useState<Payment>({ paymentHistory: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (activeContent === 'billing' && userId) {
            fetchPaymentHistory();
        }
    }, [userId, activeContent]);

    const fetchPaymentHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:4000/user-payment-history/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch payment history');
            }
            const data = await response.json();

            console.log(data, 'data')
            setPayments(data);
        } catch (error) {
            console.error('Error fetching payment history:', error);
            setError('Unable to load payment history. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    console.log(payments, 'payments')

    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <p>Loading payment history...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : payments?.paymentHistory?.length > 0 ? (
                    <ul className="space-y-2">
                        {payments?.paymentHistory?.map((payment) => (
                            <li key={payment.id} className="flex justify-between">
                                <span>{new Date(payment.date).toLocaleDateString()}</span>
                                <span>${(payment.amount / 100).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No payment history available.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default PaymentHistory;