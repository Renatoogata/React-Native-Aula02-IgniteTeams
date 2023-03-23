import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from './PlayerStorageDTO'
import { playersGetByGroup } from "./playerGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {

        const storedPlayers = await playersGetByGroup(group);

        const playerAlredyExists = storedPlayers.filter(player => player.name === newPlayer.name);

        if (playerAlredyExists.length > 0) {
            throw new AppError('Essa pessoa já está adicionada em um time aqui.')
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer])

        /* 
            @ignite-teams:players-rocket: [] -> vou poder criar um array pra cada grupo diferente
            @ignite-teams:players-amigos: []
            @ignite-teams:players-ignite: []
        */
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);

    } catch (error) {
        throw (error)
    }
}