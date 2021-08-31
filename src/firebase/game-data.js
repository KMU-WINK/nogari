import firebase from './firebase-manager';


export async function getGameData() {
    const game = await firebase.firestore().collection('game').get();
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