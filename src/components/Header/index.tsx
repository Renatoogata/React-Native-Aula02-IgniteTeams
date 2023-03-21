import { Container, Logo, BackButton, BackIcon } from "./styles";


import logoImg from '@assets/logo.png'

type Props = {
    showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {
    return (
        <Container>
            {
                showBackButton && /* se o showBackButton for false irá aparecer só o logo se for true irá aparecer o logo e a setinha */
                <BackButton>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={logoImg} />
        </Container>
    )
}