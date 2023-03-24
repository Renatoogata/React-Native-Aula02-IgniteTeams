import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";

import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";


type RouteParams = {
    group: string
}

export default function Players() {
    const [newPlayerName, setNewPlayerName] = useState('')

    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const route = useRoute(); /*useRoute permite acessar os parametros passados pela rota*/
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur(); /* Tirar o foco do input */

            setNewPlayerName('');
            fetchPlayerByTeam();

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
            }
        }
    }

    async function fetchPlayerByTeam() {
        try {

            const playersByTeam = await playersGetByGroupAndTeam(group, team);

            setPlayers(playersByTeam)

        } catch (error) {
            console.log(error);
            Alert.alert('Pessoas', "Não foi possível carregar as pessoa do time selecionado")
        }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            Alert.alert("Remover", `Deseja remover a(o) ${playerName} do grupo?`, [
                {
                    text: 'Sim',
                    onPress: async () => {
                        await playerRemoveByGroup(playerName, group)
                        fetchPlayerByTeam();
                    },
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ])

        } catch (error) {
            console.log(error);
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa')
        }
    }

    useEffect(() => {
        fetchPlayerByTeam();
    }, [team]);

    return (
        <Container>
            <Header
                showBackButton
            />

            <Highlight
                title={group}
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef} /* Tirar o foco do input */
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false} /* corretor de texto desabilitado na hora de digitar */
                    onSubmitEditing={handleAddPlayer} /* Usando o certinho do teclado executa a função */
                    returnKeyType="done" /* auxilia a linha de cima */
                />

                <ButtonIcon
                    icon="add"
                    onPress={() => handleAddPlayer()}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>


            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => { handlePlayerRemove(item.name) }}
                    />
                )}
                contentContainerStyle={[
                    { paddingBottom: 100 }, /* Colocando uma margem no fim da listagem parar mostrar para o usuario que a lista acabou */
                    players.length === 0 && { flex: 1 } /* condicional para aplicar o flex: 1 */
                ]}

                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Não há pessoas nesse time"
                    />
                )}
                showsVerticalScrollIndicator={false}
            />

            <Button
                title="Remover Turma"
                type="SECONDARY"
            />
        </Container>
    )
}