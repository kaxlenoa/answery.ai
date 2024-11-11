'use client'
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArrowRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const LandingPage = () => {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/plans');
    }
  }, [isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Redirecting...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-[64px]"> {/* Add padding-top to account for fixed header */}
        {/* Hero Section */}
        <section className="dark:bg-[#FFFCF5]  py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-fustat text-[72px] font-semibold leading-[72px] text-center mb-6 dark:text-black">
              Smart customer communication for businesses
            </h1>
            <p className="text-xl mb-8 mt-6 ">
              Effortless customer support with AI-powered chat responses
            </p>
            <Button
              size="lg"
              className="font-fustat text-[14px] font-medium leading-[27px] text-left w-[163px] h-[59px] px-10 py-4 rounded-[24px] bg-[#004BA8] hover:bg-[#003d8a] text-white"
            >
              Get started
            </Button>
          </div>
        </section>

        {/* New Black Background Section */}
        <section className="dark:bg-[#FFFCF5]">
          <div className="flex justify-between items-center text-white gap-20">
            <div className="flex flex-col items-left justify-center ml-40">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-4 dark:text-black">Advanced AI training</h3>
                <p className='dark:text-black'>Fine-tune how the AI answers your customers by editing and refining the responses. The more data you provide, the smarter the system becomes, providing increasingly accurate responses. .</p>
              </div>
              <Button
                size="lg"
                className="font-fustat text-[14px] font-medium leading-[27px] text-left w-[163px] h-[59px] px-10 py-4 rounded-[24px] bg-[#004BA8] hover:bg-[#003d8a] text-white"
              >
                Get started
              </Button>
            </div>

            <Image
              src="/images/ai_training.png"
              alt="Knowledge Base Interface"
              width={700}
              height={720}
            />
          </div>
        </section>

        {/* New Knowledge Base Section */}
        <section id='about' className="bg-[#FFFCF5] h-[1100px] py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
              <div className="flex justify-between items-start w-full mb-16">
                <div className="w-1/2">
                  <h2 className="text-4xl font-bold mb-6 dark:text-black">Create and manage knowledge database</h2>
                </div>
                <div className="w-1/2">
                  <p className="text-lg dark:text-black">
                    Build a custom knowledge base for frequently asked questions. Add, modify, or delete responses quickly using our intuitive interface. Our AI will select the best match from your database to ensure that customers get accurate responses every time.
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full gap-12">
                <Image
                  src="/images/add_question.png"
                  alt="Knowledge Base Interface"
                  width={300}
                  height={720}
                />
                <Image
                  src="/images/questions_base.png"
                  alt="AI Matching Process"
                  width={1135}
                  height={720}
                />
              </div>
            </div>
          </div>
        </section>



        {/* New Black Background Section */}
        <section className="bg-[#FFFCF5] h-[825px] ">
          <div className="flex flex-col items-center space-y-8">
            <div className=" flex flex-col items-center mx-auto text-white mt-24" style={{ width: '800px' }} >
              <h3 className="text-2xl font-bold mb-4 dark:text-black">Connect platforms</h3>
              <p className='dark:text-black'>Integrate Answery.ai with your existing communication tools, including WhatsApp, with ease. Simply scan a QR code to authorize your number and start answering customer queries automatically.</p>
            </div>

            <Image
              src="/images/platforms.png"
              alt="Knowledge Base Interface"
              width={700}
              height={720}
            />
            <Button
              size="lg"
              className="text-[14px] text-left w-[163px] h-[59px] border border-white rounded-full bg-black text-white"
            >
              Get started
            </Button>
          </div>


        </section>

        {/* New User Profile Management Section */}
        <section className="bg-[#FFFCF5] py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                <span className="font-bold dark:text-black">User profile management</span>
              </h2>
              <p className="text-lg mb-12 dark:text-black">
                Update your personal and business information easily. Manage user roles, adjust notification settings, and ensure that your team has the appropriate permissions to handle customer queries.
              </p>
              <Image
                src="/images/profile.png"
                alt="User Profile Management"
                width={800}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-[#FFFCF5] py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex flex-col w-full md:w-1/2">
                <h2 className="text-3xl font-normal ">Build your work with us:</h2>
                <h3 className="text-3xl font-normal dark:text-black">Take full advantage of the <b>AI Assistant</b></h3>
                <p className="text-gray-600 dark:text-gray-300 mb-12 dark:text-black ">
                  You can regulate the work of the AI assistant yourself and what answers it should give to customers, and all this is under your control and in one place                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard
                    icon="/icons/ai.svg"
                    title="AI-powered Responses"
                    description="Provide quick and accurate responses to customers."
                  />
                  <FeatureCard
                    icon="/icons/seamlessIntegration.svg"
                    title="Seamless Integration"
                    description="Easily integrate with your existing systems."
                  />
                  <FeatureCard
                    icon="/icons/chat.svg"
                    title="24/7 Support"
                    description="Ensure your customers are supported around the clock."
                  />
                </div>
              </div>

              <div className="bg-[#FFFCF5] w-full md:w-1/2">
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {[1, 2, 3].map((index) => (
                      <CarouselItem key={index}>
                        <Image
                          src={`/images/payment.png`}
                          alt={`Feature ${index}`}
                          width={600}
                          height={400}
                          className="w-full h-auto"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="bg-[#004BA8] h-[511px] flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center space-y-8">
              <Button
                size="lg"
                className="bg-white text-black rounded-full  hover:bg-gray-100 h-[59px]"
              >
                Get started
              </Button>
              <div className="text-white max-w-md">
                <h3 className="text-2xl font-bold mb-4 dark:text-[#CDCDCD]">Have more questions?</h3>
                <p className="text-[#CDCDCD]">Reach out to our support team. We're always happy to help.</p>
              </div>
              <Button
                variant="ghost"
                className="border border-white border-solid text-white rounded-full hover:bg-white/10"
              >
                Talk to us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-white py-12 dark:bg-[#FFFCF5]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              Answery.ai – Smart AI Solutions for Customer Communication Answery.ai is a powerful platform that helps businesses automate customer interactions with AI-driven responses. Seamlessly integrate with popular messaging platforms like WhatsApp and improve response times while reducing the need for manual support. Why choose Answery.ai: Automated responses – Instant and accurate answers to frequently asked questions using AI technology. Easy integration – Connect to your existing communication channels effortlessly. Cost-effective – Save resources by automating common inquiries, allowing your team to focus on complex tasks. Personalized experience – Maintain a human-like tone in every AI-generated response. Start your free trial today and experience the benefits of AI-powered customer service. Optimize your business with Answery.ai!            </p>
          </div>
          <div className="flex items-center mt-12">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.9999 1.33337V24.6667M21.2495 4.75046L4.75034 21.2496M24.6666 13H1.33325M21.2495 21.2496L4.75034 4.75046" stroke="#004BA8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span className="font-sen text-[28px] font-bold leading-[28px] tracking-[-0.04em] text-left text-accent-logoC ml-2" style={{ color: '#004BA8' }}>Answery</span>
          </div>
          <hr className='mt-6 mb-6 border-gray-300' />
          <div className="mt-8 text-left text-sm text-gray-400">
            ©2024 All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="flex  flex-col items-start">
    <div className="mb-4">
      <Image src={icon} alt={title} width={40} height={40} />
    </div>
    <h3 className="text-l font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-l">{description}</p>
  </div>
);

export default LandingPage;
