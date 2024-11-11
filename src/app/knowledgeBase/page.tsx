'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { PlusCircle } from 'lucide-react';

const KnowledgeBasePage = () => {
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [questions, setQuestions] = useState([
        { question: "What are your business hours?", answer: "We are open 24/7." },
        { question: "Do you offer refunds?", answer: "Yes, within 30 days of purchase." },
        { question: "How can I contact support?", answer: "You can reach our support team at support@example.com." },
    ]);

    const handleAddQuestion = () => {
        if (newQuestion && newAnswer) {
            setQuestions([...questions, { question: newQuestion, answer: newAnswer }]);
            setNewQuestion('');
            setNewAnswer('');
            setIsModalOpen(false);
        }
    };

    return (
        <div className="flex flex-col w-full space-y-6 text-gray-800 dark:text-white pb-6 pr-6 pl-6">
            <Card className="w-full">
                <div className="flex flex-row justify-between">
                    <CardHeader className="flex flex-col gap-2">
                        <CardTitle className="text-2xl font-bold">Knowledge Base</CardTitle>
                        <CardDescription>Manage your frequently asked questions</CardDescription>
                    </CardHeader>
                    <div className="flex justify-between items-center pr-6">
                        <Button
                            variant="default"
                            className="flex items-center space-x-2 bg-black text-white hover:bg-gray-800"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span>Add question</span>
                        </Button>
                    </div>
                </div>
            </Card>

            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Add new question</ModalTitle>
                        <ModalDescription>Enter the question and answer below</ModalDescription>
                    </ModalHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="question">Question</Label>
                            <Input
                                id="question"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="answer">Answer</Label>
                            <Input
                                id="answer"
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                            />
                        </div>
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddQuestion}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Card className="w-full">
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="dark:bg-gray-800 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4 mb-4 font-normal text-sm text-gray-400">
                                <div>Question</div>
                                <div>Answer</div>
                            </div>
                            <hr className="mb-2" />
                            <div>
                                {questions.map((item, index) => (
                                    <div key={index}>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white dark:bg-gray-700 pt-3 pb-3 pr-3">
                                                {item.question}
                                            </div>
                                            <div className="bg-white dark:bg-gray-700 pt-3 pb-3 pr-3">
                                                {item.answer}
                                            </div>
                                        </div>
                                        <hr className="mb-2" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default KnowledgeBasePage;
