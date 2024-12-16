import { create } from "zustand"
import { devtools } from "zustand/middleware"

type IncomeType = "passive" | "click";

interface RuneStore {
    runes: number;
    income: {
        passive: number;
        click: number;
    },
    actions: {
        addToRunes: (v?: number) => void,
        setRunesTo: (v: number) => void,
        addToIncome: (type: IncomeType, v: number) => void
    }
}

export const useRuneStore = create(devtools<RuneStore>(set => ({
    runes: 0,
    income: {
        passive: 1,
        click: 1,
    },
    actions: {
        addToRunes: (value?: number) => set(state => ({ runes: state.runes + (value || state.income.passive) }), false, "stats/addToRunes"),
        setRunesTo: (value: number) => set(() => ({ runes: value }), false, "stats/setRunesTo"),
        addToIncome: (type: IncomeType, value: number) => set(state => ({ [state.income[type]]: value }), false, "stats/addToIncome")
    }
})));
