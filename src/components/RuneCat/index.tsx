import { useRunes } from "../../hooks/useRunes"
import { CommonFigureContainer } from "../common/FigureContainer/styles";
import { CommonPre } from "../common/Pre/styles";
import { Text } from "../Text";

export const RuneCat = () => {
  const { runes } = useRunes();
  
  const renderDefaultCat = () => {
    return <>
      <CommonPre $isInline>
        {`
    |\\__/,|   (\`\\ 
  _.|o o  |_   ) )
-(((---(((--------
`}
      </CommonPre>
      <Text>A cat approaches. It visibly wants some runes.<br /><small>If only you had some to spare...</small></Text>
    </>
  }

  const renderSleepingCat = () => {
    return <>
      <CommonPre $isInline>{`
   |\\      _,,,---,,_
ZZZzz /,\`.-'\`'    -.  ;-;;,_
     |,4-  ) )-,_. ,\\ (  \`'-'
    '---''(_/--'  \`-'\\_)  
    `}
      </CommonPre>
      <Text>Its hunger quickly put the poor thing to sleep. <br /><small>For shame!</small></Text>
    </>
  }

  const renderFromRuneState = () => {
    switch (true) {
      case runes <= 200:
        return renderDefaultCat();
      case runes > 200:
        return renderSleepingCat();
    }
  }

  return (
    <CommonFigureContainer>
      {renderFromRuneState()}
    </CommonFigureContainer>
  )
}