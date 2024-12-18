import { useProgression } from "../../hooks/useProgression"
import Room from "../Room"
import Chapter0 from "./components/Chapter0"

export default function StoryContainer() {
    const { chapter } = useProgression()

    return (
        <>
            {chapter === 0 && <Chapter0 />}
            {chapter >= 1 && <Room />}
        </>
    )
}
