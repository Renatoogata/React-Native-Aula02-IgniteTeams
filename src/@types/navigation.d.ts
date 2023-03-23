export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            groups: undefined /*Esse arquivo é para definir as tipagens das rotas da aplicação, por exemplo quando eu usar o useNavigation */
            new: undefined    /* e usar o metodo navigate e apertar control espaço, o vscode vai me suregir qual rota eu tenho */
            players: {
                group: string;
            }
        }
    }
}
