import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string) {
    try {

        const storedGroups = await groupsGetAll(); /* Pegando todos os grupos ja criados */

        const groupAlreadyExists = storedGroups.includes(newGroup)

        if (groupAlreadyExists) {
            throw new AppError('Já existe um grupo cadastrado com esse nome.');
        }

        const storage = JSON.stringify([...storedGroups, newGroup]) /* transformando tudo em string */

        await AsyncStorage.setItem(GROUP_COLLECTION, storage); /* salvando todos os grupos */

    } catch (error) {
        throw error
    }
}