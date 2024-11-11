import React from 'react';
import { SignInButton, SignedOut } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";

const LandingHeader: React.FC = () => {
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="bg-[#FFFCF5] px-6 h-[64px] flex items-center justify-between fixed w-full z-10">
            <div className="flex items-center">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9999 1.33337V24.6667M21.2495 4.75046L4.75034 21.2496M24.6666 13H1.33325M21.2495 21.2496L4.75034 4.75046" stroke="#004BA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h1 className="font-sen text-[28px] font-bold leading-[28px] tracking-[-0.04em] text-left text-accent-logoC ml-2" style={{ color: '#004BA8' }}>Answery</h1>
            </div>
            <nav className="space-x-40">
                <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-gray-900">About</button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-gray-900">How It Works</button>
                <button onClick={() => scrollToSection('contacts')} className="text-gray-600 hover:text-gray-900">Contacts</button>
            </nav>
            <div className='flex items-center justify-between'>
                <SignedOut>
                    <SignInButton mode="modal">
                        <p className='hover:cursor-pointer mr-6'>Log In</p>
                    </SignInButton>
                    <Button
                        size="lg"
                        className="font-fustat text-[14px] font-medium text-left w-[115px] h-[50px] px-10 py-4 rounded-[24px] bg-[#004BA8] hover:bg-[#003d8a] text-white"
                    >
                        Book a demo
                    </Button>
                </SignedOut>
            </div>
        </header>
    );
};

export default LandingHeader;
