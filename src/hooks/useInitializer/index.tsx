import { useCallback, useEffect, useRef } from "react";
import { useRunes } from "../useRunes";

export const useInitializer = () => {
    const incomeFlow = useRef<number>(0);
    const { addValueToRunes } = useRunes();

    const startIncomeFlow = useCallback(() => {
        incomeFlow.current = setInterval(() => {
            addValueToRunes();
        }, 1000);
    }, [addValueToRunes]);

    const stopIncomeFlow = useCallback(() => {
        clearInterval(incomeFlow.current);
    }, []);

    // Consistent passive income flow
    useEffect(() => {
        startIncomeFlow();
        return () => {
            stopIncomeFlow();
        }
    }, [startIncomeFlow, stopIncomeFlow]);
}