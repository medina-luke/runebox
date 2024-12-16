import { useRunes } from "../../hooks/useRunes"
import { RuneCat } from "../RuneCat";
import { RuneWrapper } from "../RuneWrapper";
import { ActionContainer, Container, RuneCount } from "./styles";

export default function Room() {
    const { runes, addValueToRunes, setRunesTo } = useRunes();

    const handleGarbage = () => {
        setRunesTo(0);
    }

    const getRune = () => {
        addValueToRunes(1);
    }

    return (
        <Container>
            <p>The world feels vast and uneasy. You look beyond the horizon towards what feels like a great adventure, though ridiculous as it may seem.</p>
            <p>Currently, you have <RuneCount>{JSON.stringify(runes)}</RuneCount> runes.</p>
            <RuneWrapper threshold={60}>
                <RuneCat />
            </RuneWrapper>
            <ActionContainer>
                <button onClick={handleGarbage}>Throw them in the garbage.</button>
                <button onClick={getRune}>Get a rune</button>
            </ActionContainer>
        </Container>
    )
}
