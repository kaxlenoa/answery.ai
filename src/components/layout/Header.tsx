'use client'
import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon, PersonIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import {
    SignInButton, SignOutButton, SignedIn, SignedOut
} from '@clerk/nextjs'

const Header: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-black  px-6 h-[64px] flex flex-col justify-center mb-[24px]"
        >
            <div className="flex justify-between items-center h-[40px]">
                <motion.div className="flex items-center space-x-2">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9999 1.33337V24.6667M21.2495 4.75046L4.75034 21.2496M24.6666 13H1.33325M21.2495 21.2496L4.75034 4.75046" stroke="#004BA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h1 className="font-sen text-[28px] font-bold leading-[28px] tracking-[-0.04em] text-left text-accent-logoC ml-10" style={{ color: '#004BA8' }}>Answery</h1>
                </motion.div>

                <div className="flex items-center space-x-4">
                    <motion.div
                        className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full h-[30px]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <SunIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-300" />
                        <Switch
                            checked={theme === 'dark'}
                            onCheckedChange={toggleTheme}
                            aria-label="Toggle theme"
                        />
                        <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </motion.div>

                    <motion.button
                        className="hidden md:flex items-center space-x-2 text-white text-sm px-4 py-2 rounded-full transition duration-300 h-[30px]"
                        style={{ backgroundColor: '#004BA8' }}
                    >
                        <PersonIcon className="h-5 w-5" />
                        <SignedIn>
                            <SignOutButton />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                    </motion.button>

                    <motion.button
                        className="md:hidden bg-gray-100 dark:bg-gray-800 p-2 rounded-full"
                    >
                        <HamburgerMenuIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
