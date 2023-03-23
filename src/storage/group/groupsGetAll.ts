import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
    try {
        const storage = await AsyncStorage.getItem(GROUP_COLLECTION); /* Pegando todas as informações da chave GROUP_COLLECTION e armazenando na const storage como string */

        const groups: string[] = storage ? JSON.parse(storage) : []; /*  transformando em objeto o conteudo string do GROUP_COLLECTION */

        return groups;
    } catch (error) {
        throw error
    }
}