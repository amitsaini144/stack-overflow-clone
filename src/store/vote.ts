import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

interface VoteStore {
    totalVotes: number;
    isLoading: boolean;
    isSubmitting: boolean;

    fetchVotes: () => Promise<void>;
}

export const useQuestionStore = create<VoteStore>()(
    persist(
        immer((set) => ({
            totalVotes: 0,
            isLoading: false,
            isSubmitting: false,

            // Fetch all votes
            fetchVotes: async () => {
                set({ isLoading: true });

                try {
                    const response = await axios.get("/api/vote");
                    set({ totalVotes: response.data.data.total, isLoading: false });
                } catch (error) {
                    console.error("Error fetching questions:", error);
                    set({ isLoading: false });
                }
            }
        })),
        {
            name: "votes",
        }
    )
);
