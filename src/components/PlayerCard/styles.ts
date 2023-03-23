import styled, { css } from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View`
    width: 100%;
    height: 56px;

    background-color: ${({ theme }) => theme.COLORS.GRAY_500};

    border-radius: 6px;

    flex-direction: row;
    align-items: center;
    
    margin-bottom: 10px;
`;

export const PlayerName = styled.Text`
    flex: 1;

    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.GRAY_200};
    `}
`;

export const PlayerIcon = styled(MaterialIcons).attrs(({ theme }) => ({
    size: 24,
    color: theme.COLORS.GRAY_200,
}))`
    margin-left: 16px;
    margin-right: 10px;
`;
