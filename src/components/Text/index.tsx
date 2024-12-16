import * as S from './styles'

interface Props {
    children: React.ReactNode;
}

export const Text = ({ children }: Props) => {
  return (
    <S.TextLabel>{children}</S.TextLabel>
  )
}
