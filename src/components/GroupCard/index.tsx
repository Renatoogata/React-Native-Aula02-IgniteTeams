import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

type Props = TouchableOpacityProps & { /* Props é igual as propriedades de TouchableOpacity e as propriedades declarado a baixo( ex: title:string) */
    title: string;
}

export function GroupCard({ title, ...rest }: Props) { /* rest são todas as props não explicitas ou seja as props que vieram do TouchbleOpacityProps */
    return (
        <Container {...rest}>
            <Icon />

            <Title>
                {title}
            </Title>
        </Container>
    )
}