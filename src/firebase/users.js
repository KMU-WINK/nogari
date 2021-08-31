import firebase from './firebase-manager';

const db = firebase.firestore();

export async function getUserInfo(userId) {
    const user = await db.collection("users").doc(userId).get();
    return user.data() ?? null;
}

export async function createUser(nickname, profile) {
    const res = await firebase.firestore().collection('users').add({ // 닉네임+프로필 데이터 추가
        nickname,
        profile,
        badges: {alcohol:0, roulette:0, liar:0},
        created: new Date().getTime()
    });
    return res.id;
}