import { useState, useCallback } from 'react';


type UserPaymentStatus = {
    hasActiveSubscription: boolean;
    lastPaymentDate?: string;
    cardInfo?: {
        last4: string;
        expMonth: string;
        expYear: string;
    };
};

const checkUserPayment = async (userId: string) => {
    const response = await fetch(`http://localhost:4000/check-user-payment/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to check user payment status');
    }
    return response.json();
};

export const useCheckUserStatus = (userId: string) => {
    const [userPaymentStatus, setUserPaymentStatus] = useState<UserPaymentStatus | null>(null);
    const [errorStatus, setErrorStatus] = useState<string | null>(null);

    const checkUserStatus = useCallback(async (userId: string) => {
        try {
            const status = await checkUserPayment(userId);
            setUserPaymentStatus(status);
        } catch (error) {
            console.error('Error checking user payment status:', error);
            setErrorStatus('Failed to check payment status');
        }
    }, [userId]);

    return { userPaymentStatus, errorStatus, checkUserStatus };
};
