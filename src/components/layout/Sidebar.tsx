'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HomeIcon, BookOpenIcon, PuzzlePieceIcon, CogIcon, UserCircleIcon, CreditCardIcon, BuildingOffice2Icon, FolderIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    const router = useRouter();
    const { signOut } = useClerk();

    const handleNavigation = (route: string) => {
        if (route === 'signout') {
            signOut();
        } else {
            router.push(`/${route}`);
        }
    };

    const sidebarItems = [
        { icon: HomeIcon, label: 'Plans', route: 'plans' },
        { icon: FolderIcon, label: 'Knowledge Base', route: 'knowledgeBase' },
        { icon: PuzzlePieceIcon, label: 'Integration', route: 'integration' },
        { icon: CogIcon, label: 'Settings', route: 'settings' },
    ];

    const sidebarItems2 = [
        { icon: UserCircleIcon, label: 'Profile', route: 'profile' },
        { icon: CreditCardIcon, label: 'Billing', route: 'billing' },
        { icon: BuildingOffice2Icon, label: 'Organization', route: 'settingsOrganization' },
        { icon: ArrowLeftOnRectangleIcon, label: 'Sign out', route: 'signout' },
    ];

    return (
        <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-black text-gray-800 dark:text-white md:relative md:translate rounded-[12px] ml-5 mb-5 flex flex-col justify-between h-[calc(100vh-80px)]"
        >
            <nav className="space-y-2 mt-2 py-4">
                {sidebarItems.map((item, index) => (
                    <div key={index}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 w-[300px]"
                            onClick={() => handleNavigation(item.route)}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </Button>
                    </div>
                ))}
            </nav>
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mb-4">
                {sidebarItems2.map((item, index) => (
                    <div key={index}>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${item.route === 'signout' ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'} hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800`}
                            onClick={() => handleNavigation(item.route)}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </Button>
                    </div>
                ))}
            </div>
        </motion.aside>
    );
};

export default Sidebar;
