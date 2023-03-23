import { useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'

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
