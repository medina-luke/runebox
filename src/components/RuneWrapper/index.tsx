import React, { useEffect, useState } from 'react'
import { useRunes } from '../../hooks/useRunes';

interface Props {
    threshold?: number;
    children: React.ReactNode
}

export const RuneWrapper = ({ threshold = 0, children }: Props) => {
    const { runes, setThreshold, threshold: storeThreshold } = useRunes();
    const [isWithinLimit, setWithinLimit] = useState<boolean>(false);

    useEffect(() => {
        if (runes >= threshold && threshold > 0 && !isWithinLimit) {
            setThreshold(runes);
            setWithinLimit(true);
        }
    }, [runes, setThreshold, threshold, isWithinLimit, setWithinLimit]);

    const isValidThreshold = storeThreshold >= threshold;
    return isValidThreshold ? children : null;
}
