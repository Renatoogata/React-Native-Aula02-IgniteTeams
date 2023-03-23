import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

export default function Groups() { /*Através do NavigationContainer(routes/index.tsx), consigo acessar o navigation.navigate através das props*/
    const [groups, setGroups] = useState<string[]>([]);

    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate('new')
    }

    async function fetchGroups() {
        try {
            const data = await groupsGetAll()
            setGroups(data);

        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(useCallback(() => { /* qaundo o foco voltar para essa tela(Groups) o useFocusEffect vai ser disparado denovo */
        fetchGroups();
    }, []))

    return (
        <Container>
            <Header />
            <Highlight
                title='Turmas'
                subtitle='Jogue com sua turma'
            />

            <FlatList
                data={groups}
                keyExtractor={item => item} /*item e cada valor do estado, então ele ta pegando o proprio valor do estado como key*/
                renderItem={({ item }) => (
                    <GroupCard
                        title={item}
                    />
                )}
                contentContainerStyle={groups.length === 0 && { flex: 1 }} /*centralizar o ListEmpty*/
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Que tal cadastrar a primeira turma??"
                    />
                )}
                showsVerticalScrollIndicator={false}
            />

            <Button
                title='Criar nova Turma'
                onPress={handleNewGroup}
            />
        </Container>
    );
}
