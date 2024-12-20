import { useEffect, useState } from 'react'
import { useProgression } from '../../../../hooks/useProgression'

import * as Styles from "./styles"
import { CommonButtonContainer } from '../../../common/ButtonContainer/styles';

type Chapter0State = "start" | "look-around" | "close-to-door" | "do-nothing" | "end";

export default function Chapter0() {
    const { dialogueStep, advanceDialogueUntil, setDialogue, nextChapter } = useProgression();
    const [chapterState, setChapterState] = useState<Chapter0State>("start");
    const [hasCheckedTheRoom, setHasCheckedTheRoom] = useState<boolean>(false);
    const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);
    const [IsPostLightScreen, setIsPostLightScreen] = useState<boolean>(false);

    useEffect(() => {
        console.log("useeffect")
        setDialogue(0);
        switch (chapterState) {
            case "start":
                return advanceDialogueUntil(5, 2500);
            case "look-around":
                advanceDialogueUntil(9, 1500);
                setHasCheckedTheRoom(true);
                break;
            case "do-nothing":
                advanceDialogueUntil(9, 2500);
                break;
            case "close-to-door":
                advanceDialogueUntil(6, 2000);
                break;
            case "end":
                advanceDialogueUntil(9, 2000, () => {
                    setHasReachedEnd(true);
                    advanceDialogueUntil(15, 3000, () => {
                        setIsPostLightScreen(true);
                        setTimeout(() => {
                            nextChapter();
                        }, 5000);
                    });
                });
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chapterState])

    const handleLookAround = () => {
        setChapterState("look-around")
    }

    const handleApproachDoor = () => {
        setChapterState("close-to-door");
    }

    const handleDoNothing = () => {
        setChapterState("do-nothing");
    }

    const handleAcrossTheWall = () => {
        setChapterState("end");
    }

    const renderIntro = () => {
        return <>
            <p>
                You wake up in an empty, but somewhat familiar room.<br />
                {dialogueStep > 1 && <>
                    It's pretty much filled with chairs, tables, but other than that, nothing that really seems useful or interesting.<br />
                </>}
                {dialogueStep > 2 && <>
                    You see a door on the very opposide side, across the room.<br />
                </>}
                {dialogueStep > 3 && <>
                    The door seems to have been sealed shut. From a closer distance, maybe you could check it out...
                </>}
            </p>
            {dialogueStep > 4 &&
                <CommonButtonContainer>
                    <button onClick={handleApproachDoor}>Approach the sealed door</button>
                    <button onClick={handleLookAround}>Look around</button>
                </CommonButtonContainer>
            }
        </>
    }

    const renderLookAround = () => {
        return <>
            <p>.{dialogueStep > 0 && "."}{dialogueStep > 1 && "."}</p>
            <p>{dialogueStep > 2 && "Huh."}</p>
            {dialogueStep > 3 && <p>
                After looking around for a while, something starts becoming clear to you. <br />
                {dialogueStep > 4 && <>
                    You start to slowly realize that, <br />
                </>}
                {dialogueStep > 5 && <>
                    despite all your instinct and intuiton, <br />
                </>}
                {dialogueStep > 6 && <>
                    looking around this empty room really felt... <br />
                </>}
                {dialogueStep > 7 && <>
                    like a waste of time.
                </>}
            </p>}
            {dialogueStep > 8 && <>
                <p>You can't help but notice a keen attention to detail, from whoever was responsible for organizing all the chairs.</p>
                <CommonButtonContainer>
                    <button onClick={handleApproachDoor}>Approach the sealed door</button>
                    <button onClick={handleDoNothing}>Do absolutely nothing</button>
                </CommonButtonContainer>
            </>}
        </>
    }

    const renderDoNothing = () => {
        return <>
            {dialogueStep > 1 && <>
                <p>Well, it really <em>feels like</em> a great day outside the closed-off room. <br />
                    {dialogueStep > 2 && <>
                        It's really such a pity you won't be able to fully enjoy it.
                    </>}
                </p>
                {dialogueStep > 3 && <p><Styles.Unless shouldAnimate={true}>Unless...</Styles.Unless></p>}
                {dialogueStep > 4 &&
                    <CommonButtonContainer>
                        <button onClick={handleApproachDoor}>Approach the sealed door</button>
                        <button onClick={handleLookAround}>Look around</button>
                    </CommonButtonContainer>
                }
            </>}
        </>
    }

    const renderCloseToDoor = () => {
        return <>
            <p>As you approach the door, you see a ring-shaped engraving, marked by many different runes around its edges.</p>
            {dialogueStep > 0 && <p>
                A faint light surges from the shape on the door. <br />
                {dialogueStep > 1 && <>
                    Small sparks of light form around you, as you look to the symbol in front of you.
                </>}
            </p>}
            <p>
                {dialogueStep > 2 && (hasCheckedTheRoom ? <>
                    Unlike <em>that</em> previous failed attempt at finding something in an otherwise empty room, <br />
                    {dialogueStep > 3 && <>
                        this time, things feel definitely different.
                    </>}
                </> : <>
                    This is a very different feeling from anything you've seen until now. <br />
                    {dialogueStep > 3 && <>
                        A sense of curiosity fills the air.
                    </>}
                </>)}
            </p>
            <p>
                {dialogueStep > 4 && <>
                    It's just like the engraving on the wall is <em>calling</em> to you.
                </>}
            </p>
            {dialogueStep > 5 && <>
                <p>You can't help but feel curious as to what might be on the other side.</p>
                <button onClick={handleAcrossTheWall}>Touch the ring-shaped engraving.</button>
            </>}
        </>
    }

    const renderEnd = () => {
        return <>
            <p>.{dialogueStep > 0 && "."}{dialogueStep > 1 && "."}</p>
            {dialogueStep > 2 && <p>*THUD*</p>}
            <p>{dialogueStep > 3 && <>
                You feel the door open slightly, while the wind gently hits your face. <br />
                {dialogueStep > 4 && <>
                    As you keep pushing the door, the way makes itself clear to you. <br />
                </>}
            </>}</p>
            <p>
                {dialogueStep > 5 && <>
                    However, as you walk outside and try to better understand your surrodings, <br />
                </>}
                {dialogueStep > 6 && <>
                    you are hit by a <strong>strong light</strong>, that shows you a prophetic vision.
                </>}
            </p>
        </>
    }

    const renderMessage = () => {
        return <p>
            {dialogueStep > 10 && <>
                <Styles.AnimatedSpan>You. Are. Light.</Styles.AnimatedSpan><br />
            </>}
            {dialogueStep > 11 && <>
                <Styles.AnimatedSpan>As I show this light to you.</Styles.AnimatedSpan>
            </>}
            {dialogueStep > 12 && <>
                <Styles.AnimatedSpan>Shine light on this desolate land.</Styles.AnimatedSpan>
            </>}
            {dialogueStep > 13 && <>
                <Styles.AnimatedSpan>Find Elizabeth.</Styles.AnimatedSpan>
            </>}
            {dialogueStep > 14 && <>
                <Styles.AnimatedSpan>Your path has just begun.</Styles.AnimatedSpan>
            </>}
        </p>
    }


    return <>
        {chapterState === "start" && renderIntro()}
        {chapterState === "look-around" && renderLookAround()}
        {chapterState === "do-nothing" && renderDoNothing()}
        {chapterState === "close-to-door" && renderCloseToDoor()}
        {chapterState === "end" && renderEnd()}
        {hasReachedEnd && <>
            <Styles.LightScreen shouldFade={IsPostLightScreen}>
                {renderMessage()}
            </Styles.LightScreen>
        </>}
    </>

}
