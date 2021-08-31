import firebase from '../firebase-manager';

const db = firebase.firestore();


export async function getWordGameCategory() {
  const category = await db.collection("game").doc("category").get();
  return category.data();
}

export async function getPlayers(roomId) {
  const players = await db.collection('game').doc(roomId).get();
  return players.data();
}
