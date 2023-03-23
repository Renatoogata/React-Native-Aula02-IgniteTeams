import { useState } from "react";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";
import { groupCreate } from "@storage/group/groupCreate";

export default function NewGroup() {
    const [group, setGroup] = useState('');


    const navigation = useNavigation();

    async function handleNew() {
        try {
            await groupCreate(group);
            navigation.navigate('players', { group })

        } catch (error) {
            console.log(error)
        }


    }

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
                    onChangeText={text => setGroup(text)}

                />

                <Button
                    onPress={handleNew}
                    title="Criar"
                    style={{ marginTop: 20 }}
                />
            </Content>
        </Container>
    )
}