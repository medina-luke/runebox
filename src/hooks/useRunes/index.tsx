import { useCallback, useEffect, useMemo } from "react";
import { useRuneStore } from "../../store/rune";

export const useRunes = () => {
    const { addToIncome, addToRunes, setRunesTo } = useRuneStore(state => state.actions);
    const runes = useRuneStore(state => state.runes);
    const income = useRuneStore(state => state.income);

    const addValueToRunes = useCallback((value?: number) => {
        addToRunes(value)
    }, [addToRunes]);

    useEffect(() => {
        const incomeFlow = setInterval(() => {
            addValueToRunes();
        }, 1000);

        return () => {
            clearInterval(incomeFlow);
        }
    }, [addValueToRunes]);

    return {
        ...useMemo(() => ({ runes, income}), [runes, income]),
        addValueToRunes,
        setRunesTo,
        addToRunes,
        addToIncome
    };
}