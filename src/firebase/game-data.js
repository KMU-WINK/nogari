import firebase from './firebase-manager';


export async function getGameData(roomNumber) {
    console.log(roomNumber);
    const game = await firebase.firestore().collection('game').doc(roomNumber).get();
    return game.data();
}


export async function getGameRoomData(roomNumber, callback) {
    await firebase.firestore().collection('game').doc(roomNumber).onSnapshot((doc)=> {
        callback(doc.data());
    });
}

export async function setPlayers(roomNumber, players) {
    console.log(players);
    await firebase.firestore().collection("game").doc(roomNumber).update({
        players
    });
}

export async function setLiarPlayerData(roomNumber, nickname, field, fieldValue){
    const gameData = await getGameData(roomNumber);
    console.log("!");

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [nickname]: {
                ...gameData.players[nickname],
                liar: {
                    ...gameData.players[nickname].liar,
                    [field]: fieldValue,
                }
            },
        },
    });
}

export async function setLiarData(roomNumber, field, fieldValue){
    const gameData = await getGameData(roomNumber);
    console.log("!");

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        liar : {
            ...gameData.liar,
            [field]: fieldValue,
        }
    });
}


export async function updateTurn(roomNumber, nickname, nextNickname){
    const gameData = await getGameData(roomNumber);

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [nickname]: {
                ...gameData.players[nickname],
                liar: {
                    ...gameData.players[nickname].liar,
                    'order': false,
                }
            },
            [nextNickname]: {
                ...gameData.players[nextNickname],
                liar: {
                    ...gameData.players[nextNickname].liar,
                    'order': true,
                }
            },
        },
    });
}
