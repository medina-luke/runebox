import { useCallback, useEffect, useRef } from "react";
import { useRunes } from "../useRunes";
import useCycle from "../useCycle";

export const useInitializer = () => {
    const incomeFlow = useRef<number>(0);
    const timeDiff = useRef<number>(new Date().getTime());
    const { addValueToRunes, income } = useRunes();
    const { incrementLifespan } = useCycle();

    const startIncomeFlow = () => {
        incomeFlow.current = setInterval(() => {
            addValueToRunes();
            incrementLifespan();
        }, 1000);
    };

    const stopIncomeFlow = () => {
        clearInterval(incomeFlow.current);
    };

    const adjustByTimeInflation = () => {
        const currentTime = new Date().getTime();
        const timeDiffTicks = Math.round((currentTime - timeDiff.current) / 1000);

        const dueRunes = timeDiffTicks * income.passive;
        addValueToRunes(dueRunes);
        incrementLifespan(dueRunes);
    }

    const handleVisibilityChange = useCallback(() => {
        const isVisible = document.visibilityState === "visible";
        if (!isVisible) {
            timeDiff.current = new Date().getTime();
            stopIncomeFlow();
        } else {
            adjustByTimeInflation();
            startIncomeFlow();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Consistent passive income flow
    useEffect(() => {
        // startIncomeFlow();

        // window.addEventListener("visibilitychange", handleVisibilityChange);
        // return () => {
        //     stopIncomeFlow();
        //     window.removeEventListener("visibilitychange", handleVisibilityChange);
        // }

    }, []);
}