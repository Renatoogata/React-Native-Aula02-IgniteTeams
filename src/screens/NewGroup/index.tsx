import { useState } from "react";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export default function NewGroup() {
    const [group, setGroup] = useState('');


    const navigation = useNavigation();

    async function handleNew() {
        try {
            if (group.trim().length === 0) { /* .trim() remove espaços ex: Na hora de digitar o nome do grupo se o usuario der somente "espaço" e cadastras não vai contar pro length*/
                return Alert.alert('Novo Grupo', 'Informe o nome da turma')
            }

            await groupCreate(group);
            navigation.navigate('players', { group })

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Novo Grupo', error.message)
            } else {
                Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo')
                console.log(error)
            }
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