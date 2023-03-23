import { ButtonIcon } from "@components/ButtonIcon"
import { View } from "react-native"
import { Container, PlayerIcon, PlayerName } from "./styles"

type Props = {
    name: string;
    onRemove: () => void;
}

export function PlayerCard({ name, onRemove }: Props) {
    return (
        <Container>

            <PlayerIcon name="person" />

            <PlayerName>
                {name}
            </PlayerName>

            <ButtonIcon
                icon='close'
                type="SECONDARY"
                onPress={onRemove}
            />
        </Container>
    )
}