import { TouchableOpacity } from "react-native"
import theme from "src/theme"
import styled, { css } from "styled-components/native"

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY'

type Props = {
    type: ButtonTypeStyleProps
}

export const Container = styled(TouchableOpacity) <Props>`
    flex: 1;

    min-height: 56px;
    max-height: 56px; /* manter tamanho padronizado(independente das configurações do container o botao vai ter esse padrao definido) */

    background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
    
    border-radius: 6px;
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    ${({ theme }) => css`  /* Uma forma mais pratica de obter o tema */
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.WHITE};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `}   
`