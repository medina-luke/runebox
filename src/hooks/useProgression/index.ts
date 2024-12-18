import { useRef } from 'react';
import { useRuneStore } from '../../store/rune'

export const useProgression = () => {
  const chapter = useRuneStore(state => state.progress.chapter);
  const event = useRuneStore(state => state.progress.event);
  const dialogueStep = useRuneStore(state => state.progress.dialogueStep);
  const nextChapter = useRuneStore(state => state.actions.chapterNext);
  const nextDialogue = useRuneStore(state => state.actions.dialogueNext);
  const setDialogue = useRuneStore(state => state.actions.dialogueSet);
  const setEvent = useRuneStore(state => state.actions.setEvent);

  const dialogueTimeoutRef = useRef<number>(0);

  const advanceDialogueUntil = (goalStep: number, delay: number = 1000, callback: () => void = () => { }) => {
    if (dialogueStep < goalStep) {
      console.log("next step is coming", dialogueStep, goalStep);
      dialogueTimeoutRef.current = setTimeout(() => {
        console.log("advancing step");
        nextDialogue();
        advanceDialogueUntil(goalStep)
      }, delay);
    } else {
      callback();
    }
  }

  return {
    chapter,
    event,
    nextChapter,
    setEvent,
    advanceDialogueUntil,
    setDialogue,
    dialogueStep,
  }
}

