"use client"

import QuestionCard from "./QuestionCard"
import { useQuestionStore } from "@/store/Question";
import { useEffect } from "react";

export default function QuestionSection() {
    const { fetchQuestions, questions } = useQuestionStore();

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);


    return (
        <div className="flex flex-col border border-[#494d50] rounded-lg w-full">
            {questions.map((question, index) => (
                <QuestionCard key={index} {...question} />
            ))}
        </div>
    )
}