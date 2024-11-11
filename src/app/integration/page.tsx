'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';
import QRCode from 'react-qr-code';
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "@/components/ui/modal";



const HostifySVG = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IntegrationPage: React.FC = () => {
    const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [whatsappConnected, setWhatsappConnected] = useState(false);
    const [hostifyConnected, setHostifyConnected] = useState(false);
    const clerk = useClerk();
    const { user } = clerk;

    useEffect(() => {
        if (user?.id) {
            fetchQRCode();
        }
    }, [user]);

    console.log(user, 'user')

    const fetchQRCode = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:4001/session/qr/${123}/image`);
            if (!response.ok) {
                throw new Error(`Failed to fetch QR code: ${response.statusText}`);
            }

            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setQrImageUrl(imageUrl);
        } catch (e) {
            console.error('Error in QR code process:', e);
            setError(`Failed to complete QR code process: ${(e as Error).message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleWhatsAppConnect = () => {
        // Simulating connection process
        setIsLoading(true);
        setTimeout(() => {
            setWhatsappConnected(true);
            setIsLoading(false);
        }, 2000);
    };

    const handleHostifyConnect = () => {
        // Simulating connection process
        setIsLoading(true);
        setTimeout(() => {
            setHostifyConnected(true);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col w-full space-y-6 text-gray-800 dark:text-white pb-6 pr-6 pl-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Integrations</CardTitle>
                    <CardDescription>Connect your favorite services to enhance your experience</CardDescription>
                </CardHeader>
            </Card>

            <Card className="w-full">
                <CardContent className="p-6 space-y-6">
                    <IntegrationItem
                        title="WhatsApp"
                        description="Connect with WhatsApp to send and receive messages"
                        isConnected={whatsappConnected}
                        onConnect={handleWhatsAppConnect}
                        isLoading={isLoading}
                    >
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                {isLoading ? (
                                    <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
                                ) : error ? (
                                    <div className="text-center">
                                        <p className="text-red-500 mb-2">{error}</p>
                                        <Button onClick={fetchQRCode} variant="outline">Retry</Button>
                                    </div>
                                ) : qrImageUrl ? (
                                    <Image src={qrImageUrl} alt="QR Code" width={200} height={200} />
                                ) : (
                                    <p>No QR code available</p>
                                )}
                            </div>
                        </div>
                    </IntegrationItem>

                    <IntegrationItem
                        title="Hostify"
                        description="Integrate with Hostify to manage your hosting services"
                        isConnected={hostifyConnected}
                        onConnect={handleHostifyConnect}
                        isLoading={isLoading}
                    >
                        <div className="space-y-4">
                            <h4 className="font-semibold">Connect Hostify</h4>
                            <div className="flex items-center space-x-4">
                                <Label htmlFor="apiKey" className="w-1/3 text-right">API Key</Label>
                                <Input id="apiKey" placeholder="Enter your Hostify API key" className="w-2/3" />
                            </div>
                        </div>
                    </IntegrationItem>
                </CardContent>
            </Card>
        </div>
    );
};

interface IntegrationItemProps {
    title: string;
    description: string;
    isConnected: boolean;
    onConnect: () => void;
    isLoading: boolean;
    children: React.ReactNode;
}

const IntegrationItem: React.FC<IntegrationItemProps> = ({
    title,
    description,
    isConnected,
    onConnect,
    isLoading,
    children
}) => {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
        >
            <div className="flex items-center space-x-4">
                <div className="dark:bg-gray-700 p-2 rounded-full">
                    {title === 'WhatsApp' ? (
                        <Image
                            src="/svg/whatsapp.svg"
                            alt="WhatsApp"
                            width={64}
                            height={64}
                        />
                    ) : (
                        <Image
                            src="/svg/hostify.svg"
                            alt="Hostify"
                            width={64}
                            height={64}
                        />
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                </div>
            </div>
            <Modal open={open} onOpenChange={setOpen}>
                <Button
                    onClick={() => setOpen(true)}
                    variant="outline"
                    className={`min-w-[100px] text-gray-700`}
                >
                    {isConnected ? (
                        <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Connected
                        </>
                    ) : (
                        <>
                            Add
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Connect {title}</ModalTitle>
                        <ModalDescription>Set up your {title} integration</ModalDescription>
                    </ModalHeader>
                    <div className="py-4">
                        {title === 'Hostify' ? (
                            <div className="grid gap-4">
                                <h4 className="font-bold leading-none">Add Hostify Integration</h4>
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="apiKey" className="w-1/2 text-right">Hostify API Key</Label>
                                    <Input id="apiKey" placeholder="Enter your API key" className="w-1/2" />
                                </div>
                            </div>
                        ) : (
                            children
                        )}
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={onConnect}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Connect'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </motion.div>
    );
};

export default IntegrationPage;
