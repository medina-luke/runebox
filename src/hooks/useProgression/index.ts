import { useEffect, useMemo, useRef } from 'react';
import { useRuneStore } from '../../store/rune'

export const useProgression = () => {
  const chapter = useRuneStore(state => state.progress.chapter);
  const event = useRuneStore(state => state.progress.event);
  const dialogueStep = useRuneStore(state => state.progress.dialogueStep);
  const dialogueStepRef = useRef<number>(0);
  const nextChapter = useRuneStore(state => state.actions.chapterNext);
  const nextDialogue = useRuneStore(state => state.actions.dialogueNext);
  const setDialogue = useRuneStore(state => state.actions.dialogueSet);
  const setEvent = useRuneStore(state => state.actions.setEvent);

  const dialogueTimeoutRef = useRef<number>(0);

  const advanceDialogueUntil = (goalStep: number, delay: number = 1000, callback: () => void = () => { }) => {
    console.log("advanceDialogue", dialogueStepRef, goalStep, delay)
    if (dialogueStepRef.current < goalStep) {
      console.log("next step is coming", dialogueStepRef.current, goalStep);
      dialogueTimeoutRef.current = setTimeout(() => {
        console.log("advancing step");
        nextDialogue();
        dialogueStepRef.current += 1;
        advanceDialogueUntil(goalStep, delay, callback);
      }, delay);
    } else {
      callback();
      dialogueStepRef.current = 0;
    }
  }

  useEffect(() => {
    return () => {
      console.log("cleared.")
      clearTimeout(dialogueTimeoutRef.current);
    }
  }, []);

  return {
    ...useMemo(() => ({
      chapter,
      event,
      dialogueStep
    }), [chapter, event, dialogueStep]),
    nextChapter,
    setEvent,
    advanceDialogueUntil,
    setDialogue,
  }
}

