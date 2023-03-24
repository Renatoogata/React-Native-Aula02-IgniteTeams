import { TextInput, TextInputProps } from "react-native";
import { useTheme } from 'styled-components/native'

import { Container } from "./styles";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput> /* Tirar o foco do input */
}

export function Input({ inputRef, ...rest }: Props) {
    const { COLORS } = useTheme();

    return (
        <Container
            ref={inputRef} /* Tirar o foco do input */
            placeholderTextColor={COLORS.GRAY_300}
            {...rest}
        />
    )
}