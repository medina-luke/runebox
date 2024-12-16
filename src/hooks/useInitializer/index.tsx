import { useCallback, useEffect, useRef, useState } from "react";
import { useRunes } from "../useRunes";

export const useInitializer = () => {
    const incomeFlow = useRef<number>(0);
    const [timeDiff, setTimeDiff] = useState<number>(new Date().getTime());
    const { addValueToRunes, income } = useRunes();

    const startIncomeFlow = useCallback(() => {
        console.log("on");
        incomeFlow.current = setInterval(() => {
            addValueToRunes();
        }, 1000);
    }, [addValueToRunes]);

    const stopIncomeFlow = useCallback(() => {
        console.log("off");
        clearInterval(incomeFlow.current);
    }, []);

    const adjustByTimeInflation = useCallback(() => {
        const currentTime = new Date().getTime();
        const timeDiffTicks = Math.round((currentTime - timeDiff) / 1000);
        
        const dueRunes = timeDiffTicks * income.passive;
        console.log({ dueRunes, timeDiffTicks, currentTime, timeDiff });
        addValueToRunes(dueRunes);
    }, [addValueToRunes, income.passive])

    const handleVisibilityChange = useCallback((event: Event) => {
        console.log("visibility change")
        const isVisible = document.visibilityState === "visible";
        if (!isVisible) {
            console.log("page is hidden, time has stopped");
            stopIncomeFlow();
            setTimeDiff(new Date().getTime());
        } else {
            console.log("page is back");
            adjustByTimeInflation();
            startIncomeFlow();
        }
    }, [adjustByTimeInflation, startIncomeFlow, stopIncomeFlow]);

    // Consistent passive income flow
    useEffect(() => {
        console.log("useEffect mount");
        startIncomeFlow();

        window.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            console.log("useEffect unmount");
            stopIncomeFlow();
            window.removeEventListener("visibilitychange", handleVisibilityChange);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}