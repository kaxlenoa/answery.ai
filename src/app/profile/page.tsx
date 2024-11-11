'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useClerk } from '@clerk/nextjs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";



const ProfilePage = () => {
    const clerk = useClerk();
    const { user } = clerk;
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteUserData = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:4000/delete-user-data/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user data');
            }
            return response.json();
        } catch (error) {
            console.error('Error deleting user data:', error);
            throw error;
        }
    };

    const handleDeleteAccount = async () => {
        if (!user?.id) return;
        setIsDeleting(true);
        try {
            await deleteUserData(user.id);
            // Handle successful deletion (e.g., log out user, show success message)
            console.log('User data deleted successfully');
            // You might want to add logic here to sign out the user or redirect them
        } catch (error) {
            console.error('Failed to delete user data:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col w-full space-y-6 text-gray-800 dark:text-white mr-5 mb-5 ml-5">
            <div className="space-y-6 mx-auto w-full">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
                        <CardDescription>Update your personal details here</CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardContent className="space-y-2">
                        <div className='flex w-1/3 justify-between mb-5 mt-5'>
                            <div className="flex flex-col items-left">
                                <label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={user?.fullName || ''}
                                />
                            </div>
                            <div className="flex flex-col items-left">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={user?.emailAddresses[0].emailAddress || ''}
                                />
                            </div>
                        </div>
                        <div className="flex items-left">
                            <div></div>
                            <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                                Change Password
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold">Delete Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button disabled={isDeleting} variant='ghost'>
                                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white">
                                        {isDeleting ? 'Deleting...' : 'Delete Account'}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProfilePage;
