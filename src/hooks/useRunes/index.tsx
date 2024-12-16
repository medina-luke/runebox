import { useCallback, useMemo } from "react";
import { useRuneStore } from "../../store/rune";

export const useRunes = () => {
    // Get all values from zustand
    const { addToIncome, addToRunes, setRunesTo, setThreshold } = useRuneStore(state => state.actions);
    const runes = useRuneStore(state => state.runes);
    const income = useRuneStore(state => state.income);
    const threshold = useRuneStore(state => state.progress.threshold);

    const addValueToRunes = useCallback((value?: number) => {
        addToRunes(value)
    }, [addToRunes]);

    return {
        ...useMemo(() => ({ 
            runes, 
            income, 
            threshold 
        }), [runes, income, threshold]),
        addValueToRunes,
        setRunesTo,
        addToRunes,
        addToIncome,
        setThreshold
    };
}