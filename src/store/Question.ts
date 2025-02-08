import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

export interface Question {
    id: string;
    title: string;
    content: string;
    tags: string[];
    authorId: string;
}

interface QuestionStore {
    questions: Question[];
    isLoading: boolean;
    isSubmitting: boolean;

    fetchQuestions: () => Promise<void>;
    // submitQuestion: (title: string, content: string, tags: string[], authorId: string) => Promise<boolean>;
    // deleteQuestion: (id: string) => Promise<boolean>;
    // editQuestion: (id: string, updatedData: Partial<Question>) => Promise<boolean>;
}

export const useQuestionStore = create<QuestionStore>()(
    persist(
        immer((set) => ({
            questions: [],
            isLoading: false,
            isSubmitting: false,

            // Fetch all questions
            fetchQuestions: async () => {
                set({ isLoading: true });

                try {
                    const response = await axios.get("/api/questions");
                    set({ questions: response.data.data.documents, isLoading: false });
                } catch (error) {
                    console.error("Error fetching questions:", error);
                    set({ isLoading: false });
                }
            },

            // // Submit (post) a new question
            // submitQuestion: async (title, content, tags, authorId) => {
            //     set({ isSubmitting: true });

            //     try {
            //         const response = await axios.post("/api/question", { title, content, tags, authorId });
            //         set((state) => {
            //             state.questions.push(response.data);
            //         });

            //         return true;
            //     } catch (error) {
            //         console.error("Error submitting question:", error);
            //         return false;
            //     } finally {
            //         set({ isSubmitting: false });
            //     }
            // },

            // // Delete a question
            // deleteQuestion: async (id) => {
            //     try {
            //         await axios.delete(`/api/question/${id}`);
            //         set((state) => {
            //             state.questions = state.questions.filter((q) => q.id !== id);
            //         });

            //         return true;
            //     } catch (error) {
            //         console.error("Error deleting question:", error);
            //         return false;
            //     }
            // },

            // // Edit a question
            // editQuestion: async (id, updatedData) => {
            //     try {
            //         const response = await axios.patch(`/api/question/${id}`, updatedData);
            //         set((state) => {
            //             const index = state.questions.findIndex((q) => q.id === id);
            //             if (index !== -1) {
            //                 state.questions[index] = { ...state.questions[index], ...updatedData };
            //             }
            //         });

            //         return true;
            //     } catch (error) {
            //         console.error("Error editing question:", error);
            //         return false;
            //     }
            // },
        })),
        {
            name: "questions",
        }
    )
);
