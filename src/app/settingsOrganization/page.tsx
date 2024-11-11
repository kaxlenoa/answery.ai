'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const SettingsOrganisationPage = () => {
    const [orgNotificationsEnabled, setOrgNotificationsEnabled] = useState(false);
    return (
        <div className="flex flex-col w-full space-y-6 text-gray-800 dark:text-white mr-5 mb-5 ml-5">

            <div className="space-y-6 mx-auto w-full ">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Organization Settings</CardTitle>
                        <CardDescription>Manage settings for your organization</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Organization Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center">
                            <Switch
                                checked={orgNotificationsEnabled}
                                onCheckedChange={setOrgNotificationsEnabled}
                            />
                            <span className="ml-2">Enable organization-wide notifications</span>
                        </div>
                        <div>
                            <span>Organization notification email</span>
                            <Input
                                type="email"
                                placeholder="org@example.com"
                                className="w-full mb-2"
                            />
                            <Button className="w-full">Update Organization Email</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Organization Members</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <span>Invite new member</span>
                            <Input
                                type="email"
                                placeholder="newmember@example.com"
                                className="w-full mb-2"
                            />
                            <Button className="w-full">Send Invitation</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Organization Billing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full">Manage Organization Billing</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SettingsOrganisationPage;