import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";

export default function NewGroup() {
    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <Highlight
                    title="Nova Turma"
                    subtitle="crie a turma para adicionar as pessoas"
                />

                <Input
                    placeholder="Nome da Turma"
                />

                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                />
            </Content>
        </Container>
    )
}