import { useRuneStore } from '../../store/rune'

export default function useCycle() {
  const lifespan = useRuneStore(state => state.progress.total_lifespan);
  const incrementLifespan = useRuneStore(state => state.actions.incrementLifespan);

  return {
    incrementLifespan,
    lifespan
  }
}
