import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playerGetByGroup";

import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function playerRemoveByGroup(playerName: string, group: string) {
    try {
        const storedPlayers = await playersGetByGroup(group);

        const playerFiltered = storedPlayers.filter(player => player.name !== playerName); /* contém todos os players menos o que foi passado por parametro */

        const players = JSON.stringify(playerFiltered);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);


    } catch (error) {
        throw (error)
    }
}