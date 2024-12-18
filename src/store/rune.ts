import { produce } from "immer";
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type IncomeType = "passive" | "click";
type EventType = "something_came_up";

interface RuneStore {
    runes: number;
    income: {
        passive: number;
        click: number;
    },
    progress: {
        total_lifespan: number;
        threshold: number;
        chapter: number,
        event: EventType | null,
        dialogueStep: number
    },
    actions: {
        incrementLifespan: (v?: number) => void;
        addToRunes: (v?: number) => void,
        setRunesTo: (v: number) => void,
        addToIncome: (type: IncomeType, v: number) => void,
        setThreshold: (v: number) => void,
        chapterNext: () => void,
        setEvent: (v: EventType) => void,
        dialogueNext: () => void,
        dialogueSet: (v: number) => void
    }
}

type StorageableRuneStore = Omit<RuneStore, "actions">

export const useRuneStore = create(devtools(persist<RuneStore>(set => ({
    runes: 0,
    income: {
        passive: 1,
        click: 1,
    },
    progress: {
        total_lifespan: 0,
        threshold: 0,
        chapter: 0,
        event: null,
        dialogueStep: 0,
    },
    actions: {
        incrementLifespan: (increment?: number) => set(
            produce<RuneStore>(state => {
                state.progress.total_lifespan += increment || 1;
            }),
            false,
            // @ts-expect-error this is valid, but ts says otherwise meh
            "progress/lifespan"
        ),
        // @ts-expect-error this is valid, but ts says otherwise meh
        addToRunes: (value?: number) => set(state => ({ runes: state.runes + (value || state.income.passive) }), false, "runes/add"),
        setRunesTo: (value: number) => set(() => ({ runes: value })),
        addToIncome: (type: IncomeType, value: number) => set(state => ({ [state.income[type]]: value })),
        setThreshold: (value: number) => set(produce<RuneStore>(state => {
            state.progress.threshold = value > state.progress.threshold ? value : state.progress.threshold
        })),
        chapterNext: () => set(produce<RuneStore>(state => {
            state.progress.chapter += 1;
        })),
        setEvent: (event: EventType) => set(produce<RuneStore>(state => {
            state.progress.event = event;
            state.progress.dialogueStep = 0;
        })),
        dialogueNext: () => set(produce<RuneStore>(state => {
            state.progress.dialogueStep += 1;
        })),
        dialogueSet: (step: number) => set(produce<RuneStore>(state => {
            state.progress.dialogueStep = step;
        })) 
    }
}), {
    name: "app-state",
    // @ts-expect-error must type partialize, but not for now hehe
    partialize: (state: StorageableRuneStore) => ({
        runes: state.runes,
        income: state.income,
        progress: state.progress
    })
})));

