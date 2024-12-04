import { useCallback, useEffect, useState } from "react";

export const useRunes = () => {
    const [income, setIncome] = useState<number>(1);
    const [runes, setRunes] = useState<number>(0);

    const addToRunes = useCallback((value?: number) => {
        setRunes((prevState) => prevState + (value || income));
    }, [income]);

    const setRunesTo = (value: number) => {
        setRunes(value);
    }

    useEffect(() => {
        const incomeFlow = setInterval(() => {
            addToRunes();
        }, 1000);

        return () => {
            clearInterval(incomeFlow);
        }
    }, [addToRunes]);

    return {
        runes,
        setRunesTo,
        addToRunes,
        setIncome
    }
}