'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const SettingsPage = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [answeringDelay, setAnsweringDelay] = useState(0);

    const handleAnsweringDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 0 && value <= 30) {
            setAnsweringDelay(value);
        }
    };

    return (
        <div className="flex flex-col w-full space-y-6 text-gray-800 dark:text-white mr-5 mb-5 ml-5">
            <div className="space-y-6  mx-auto w-full">
                <Card className="w-full flex items-center justify-between">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Settings</CardTitle>
                        <CardDescription>Customize your experience</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="w-full overflow-hidden">
                    <CardContent className="space-y-6 pt-6">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="auto-answer"
                                checked={notificationsEnabled}
                                onCheckedChange={setNotificationsEnabled}
                            />
                            <div className="space-y-1">
                                <Label htmlFor="auto-answer" className="text-sm font-medium">Auto Answer</Label>
                                <p className="text-sm text-gray-500 dark:text-gray-400"></p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="answering-delay"
                                    type="number"
                                    min={0}
                                    max={30}
                                    value={answeringDelay}
                                    onChange={handleAnsweringDelayChange}
                                    className="w-20"
                                />
                                <Label htmlFor="answering-delay" className="text-sm font-medium">Answering Delay</Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SettingsPage;
