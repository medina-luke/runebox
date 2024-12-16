import { create } from "zustand"
import { devtools } from "zustand/middleware"

type IncomeType = "passive" | "click";

interface RuneStore {
    runes: number;
    income: {
        passive: number;
        click: number;
    },
    progress: {
        total_lifespan: number;
        threshold: number;
    },
    actions: {
        incrementLifespan: () => void;
        addToRunes: (v?: number) => void,
        setRunesTo: (v: number) => void,
        addToIncome: (type: IncomeType, v: number) => void,
        setThreshold: (v: number) => void
    }
}

export const useRuneStore = create(devtools<RuneStore>(set => ({
    runes: 0,
    income: {
        passive: 1,
        click: 1,
    },
    progress: {
        total_lifespan: 0,
        threshold: 0,
    },
    actions: {
        incrementLifespan: () => set(state => ({
            progress: {
                ...state.progress,
                total_lifespan: state.progress.total_lifespan + 1
            }
        }), false, "progress/incrementLifespan"),
        addToRunes: (value?: number) => set(state => ({ runes: state.runes + (value || state.income.passive) }), false, "stats/addToRunes"),
        setRunesTo: (value: number) => set(() => ({ runes: value }), false, "stats/setRunesTo"),
        addToIncome: (type: IncomeType, value: number) => set(state => ({ [state.income[type]]: value }), false, "stats/addToIncome"),
        setThreshold: (value: number) => {
            set(state => ({ 
                progress: {
                    ...state.progress,
                    threshold: value > state.progress.threshold ? value : state.progress.threshold 
                }
            }), false, "progress/setThreshold")
        }
    }
})));
