import React, {useState} from 'react';
import * as rooms from "../firebase/rooms";
import firebase from "firebase";
import {Link} from "react-router-dom";
import {addMember} from "../firebase/waiting-room";

export default function CreateRoomView({ history }) {
    function getUserID() {
        const userID = localStorage.getItem('myId'); // 방을 만드는 유저의 아이디
        return userID;
    }

    function getRoomNumber() {
        const userRoomNumber = localStorage.getItem('roomNumber');
        return userRoomNumber;
    }

    const makeRoom = async () => {
        const roomNumber = await rooms.createRoom(); // 방만들기
        localStorage.setItem('roomNumber', roomNumber); // 룸 넘버 웹에 저장
        const myId = getUserID();
        await firebase.firestore().collection("rooms").doc(`${roomNumber}`).set({
            game:"",
            members: [myId],
            captain: myId,

        }, {merge:true});

        await firebase.firestore().collection("game").doc(`${roomNumber}`).set({
            liar: {
                liarword:"",
            },
        }, {merge:true});

        console.log(roomNumber);
        history.push(`/rooms/${roomNumber}`);
    }

    // 닉네임 변화 감지
    const [goRoom,setGoRoom] = useState('')
    const handleOnChange = (e) => {
        setGoRoom(e.target.value);
    }

    const inRoom = () => {
        firebase.firestore().collection('rooms').get().then((snapshot) => {
            snapshot.forEach(doc => {
                if (doc.id === goRoom) { // 이미 생성된 룸넘버 입력 시에만 유저 정보 추가
                    localStorage.setItem('roomNumber', goRoom);
                    firebase.firestore().collection("users").doc(`${getUserID()}`).get().then((doc) => {
                        if (doc.exists) { // 현재 웹스토리지에 있는 유저아이디로 된 문서가 있는지 확인
                            const addUser = async () => {
                                await addMember(goRoom, getUserID());
                            }
                            addUser();
                            // setInterval(async () => { // 유저 접속 시간 주기적으로 받기
                            //     const time = new Date().getTime()
                            //     localStorage.setItem('connection',time)
                            //     await firebase.firestore().collection('rooms').doc(`${goRoom}`).collection('members').doc(`${getUserID()}`).update({
                            //         lastConnection : time
                            //     }, {merge:true})
                            // }, 6000);
                        } else {
                            console.log("No user data");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                }
            })
            if (getRoomNumber() !== goRoom) {
                alert('에러')
            }
        })
    }

    // 뱃지 개수 늘리기
    const badges1 = () => {
        firebase.firestore().collection("rooms").doc( `${getRoomNumber()}`).collection("members").doc(`${getUserID()}`).set({
            badges : { alcohol: firebase.firestore.FieldValue.increment(1)}
        }, {merge:true});
    }
    const badges2 = () => {
        firebase.firestore().collection("rooms").doc( `${getRoomNumber()}`).collection("members").doc(`${getUserID()}`).set({
            badges : { roulette: firebase.firestore.FieldValue.increment(1)}
        }, {merge:true});
    }
    const badges3 = () => {
        firebase.firestore().collection("rooms").doc( `${getRoomNumber()}`).collection("members").doc(`${getUserID()}`).set({
            badges : { liar: firebase.firestore.FieldValue.increment(1)}
        }, {merge:true});
    }

    const resetInfo = () => {
        // 웹에서는 컬렉션 삭제 지원 안 한대여. 그래서 일단 웹스토리지만 초기화
        localStorage.setItem('roomNumber','')
    }

    return (
        <>
            <div>
                <>
                    <div>
                        <button onClick={makeRoom}>방 만들기</button>
                        <Link to={'/rooms/'+`${getRoomNumber()}`}>방 입장</Link>
                    </div>
                    <div>
                        <input onChange={handleOnChange}/>
                        <button onClick={inRoom}>Go</button>
                    </div>
                    <div>
                        <button onClick={badges1}>알콜</button>
                        <button onClick={badges2}>룰렛</button>
                        <button onClick={badges3}>라이어</button>
                    </div>
                    <div>
                        <button onClick={resetInfo}>exit</button>
                        <Link to={'/changecharacter'}>캐릭터 바꾸기</Link>
                    </div>
                </>
            </div>
        </>
    )
}