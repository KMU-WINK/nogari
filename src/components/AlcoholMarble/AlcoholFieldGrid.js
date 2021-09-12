import React, {useEffect, useState} from "react";
import './AlcoholFieldGrid.css';
import Finish from '../../images/finish.png';
import {Wheel} from 'react-custom-roulette'
import '../../firebase/firebase-manager';
import firebase from "../../firebase/firebase-manager";
import '../../firebase/waiting-room';
import {getRoomInfo} from "../../firebase/waiting-room";
import {getUserInfo} from "../../firebase/users";
import { Chr } from '../../views/beforeGame/Choose_Char';
import {setFirstUserOder, updateLocationAndOrder, updateRoulettePlayersOrder} from "../../firebase/game-data";
import {setRoulettePlayerData} from "../../firebase/game-data";

const db = firebase.firestore();
const roomId = localStorage.getItem('roomNumber');
let point = 0;

const getMapLocation = (location) => {
    if (location <= 35 && location >= 30) {
        return 35 - location;
    } else if (location <= 5 && location >= 0) {
        return location + 10;
    } else if (location % 6 === 0) {
        return 10 - (location / 6);
    } else {
        return location + (5 * (2 - parseInt(location / 6)));
    }
};

function Field(props) {
    return <div style={{
        ...styles.field,
        ...(props.hidden ? {visibility: 'hidden'} : {})
    }}>
        {props.children && props.children}
        {props.users && props.users.length && props.users.map((user) => user.nickname)}
        {props.content}
    </div>;
}

function isFieldHidden(fieldIndex) {
    const row = fieldIndex / 6;
    const standard = [
        !(((row - 1) * 6) % 6 === 0), // 왼쪽 찾기
        !(fieldIndex % 6 === 5), // 오른쪽 찾기
        !(fieldIndex < 6), // 윗줄 찾기
        !(30 < fieldIndex || fieldIndex > 35), // 아래줄 찾기
    ];
    return standard.filter((s) => s).length === 4;
}

export function AlcoholFieldGrid() {
    const [userProfile, setUserProfile] = useState([]);

    const [players, setPlayers] = useState([]);

    // 유저 위치를 갱신하는 함수
    // 돌림판 돌린 유저 이름과 해당 유저의 최신 위치를 인자로 받아 파이어스토어에 갱신한다.
    const setUserLocation = async (userName, location) => {

        // 필드 데이터 받아오는 부분
        await updateLocationAndOrder(roomId, userName, point+1, location);
        // console.log(gameData);

        // 해당 유저의 위치를 최신화 하여 파이어스토어에 저장하는 부분


        // await updateRoulettePlayersOrder(roomId, point, point+1);
    }

    // 파이어스토어에서 유저 정보를 받아와 유저 리스트에 저장 => 그러면 화면에 뿌려짐
    const initializeUser = async (userData) => {

        // 유저 정보 불러오기 전 파이어스토어에서 첫 번째 유저의 order를 true로 변경하기
        // 그리고 끝나면 players 라는 useState 변수에 디비에서 불러온 유저 정보를 저장시킴
        setFirstUserOder(roomId).then(() => {
            let temp_list = []
            let values = Object.values(userData.players); // players 하위 데이터를 가져옴
            for (let i = 0; i<values.length; i++) {
                let userName = Object.keys(userData.players)[i]; // ex) 원성임
                let userLocation = values[i].alcoholRoulette.location; // 0~19 사이
                let userOrder = values[i].alcoholRoulette.order; // true or false

                temp_list.push({name: userName, location: userLocation, order: userOrder});
            }
            setPlayers(temp_list);
        });
    }

    // 해당 방의 필드 정보들을 가져와서 initializeUser 함수에 넘겨줌
    useEffect(async () => {
        let docRef = db.collection("game").doc(roomId); // roomId

        await docRef.get().then((doc) => {
            if (doc.exists) {
                let resultData = doc.data();
                initializeUser(resultData);
            } else {
                console.log("No such document data");
            }
        })
            .catch((error) => {
                console.log("Error getting document..", error);
            });
    }, []);

    //////////////////////////여기서부터 게임 유저 및 프로필 가져오는 코드////////////////////////////
    // 게임에 참가한 유저들 프로필 이미지, 이름 가져오기
    const setUserInfo = async (roomInfo) => {
        // await console.log(roomInfo);
        let members = [];

        for await (let member of roomInfo.members) {
            const memberInfo = await getUserInfo(member);
            if (!memberInfo) continue;

            members.push(memberInfo);
        }
        setUserProfile(members)
    }

    // 렌더링 시 해당 방의 참가 유저 정보를 가져오는 함수 호출
    useEffect(() => {
        getRoomInfo(roomId, setUserInfo);
    }, []);

    const users = userProfile.map((user) => {
        return (
            <>
                <div style={styles.userContainer}>
                    <img style={styles.userImg} src={Chr[user.profile]} alt="profile"/>
                    <div style={styles.userName}>{user.nickname}</div>
                </div>

            </>
        )
    });
    ///////////////////////////////////////////////////////


    // 라이브러리 이용한 룰렛 구현
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
    }
    const data = [
        {option: '1', style: {backgroundColor: '#F8B62B'}},
        {option: '2', style: {backgroundColor: '#EEEEEE'}},
        {option: '3', style: {backgroundColor: '#F8B62B'}},
        {option: '4', style: {backgroundColor: '#EEEEEE'}},
        {option: '5', style: {backgroundColor: '#F8B62B'}},
        {option: '6', style: {backgroundColor: '#EEEEEE'}},
    ]
    // 여기까지 //

    const row = 6;
    const column = 6;
    // 0~35까지 만들기
    const fields = Array.from(Array(row * column).keys()).map((v) => v);

    const [orderUser, setOrderUser] = useState("");

    return (
        <div className={'AlcoholMarbleBody'}>
            <div className={'AlcoholMarbleMain'}>
                <div style={styles.fields}>
                    {fields.map((field) => {
                        const inPlayers = players.filter((i) => i.location === getMapLocation(field))
                        return <div className={'AlcoholMarbleGrid'}>
                            <Field content={getMapLocation(field)} hidden={isFieldHidden(field)} className={field}>
                                <div style={{position:'relative'}} >
                                    {inPlayers.map((i, index) => {
                                        const user = userProfile.find((u) => u.nickname === i.name);
                                        return <div style={{position:`absolute`, width:'60px', left:`${index*10}%`, textAlign:'center',}}>
                                            <img src={Chr[(user && user.profile) ?? 0]} style={{ width:'100%', }} />
                                            <div>{(user && user.nickname)??"guest"}</div>
                                        </div>
                                    })}
                                </div>
                            </Field>
                        </div>
                    })}
                </div>
            </div>

            {users}
            <div style={styles.roulette}>
                <div style={styles.orderUser}>‘{orderUser}’ 님 차례입니다!</div>
                <button id="trigger" style={styles.goBtn} onClick={handleSpinClick}>GO!</button>
                <img src={Finish} alt="" style={styles.finishImg}/>
                <div style={styles.circle}>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        fontSize={40}
                        perpendicularText={true}
                        onStopSpinning={() => {
                            setMustSpin(false)
                            // console.log(data[prizeNumber].option)
                            let temp_user_list = [...players];
                            for (let i = 0; i < temp_user_list.length; i++) {
                                if (temp_user_list[i].order === true) {
                                    temp_user_list[i].location = (temp_user_list[i].location + parseInt(data[prizeNumber].option)) % 20;
                                    setUserLocation(temp_user_list[i].name, temp_user_list[i].location); // 돌림판 돌린 사용자의 이름, 나온 위치를 해당 함수의 인자로 넘김
                                }
                            }
                            // 필요없을듯 이거
                            // setPlayers(temp_user_list);
                        }}
                    />
                </div>


            </div>
        </div>
    );
}

const styles = {
    fields: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridColumnGap: '2px',
        gridRowGap: '2px',

    },
    field: {
        width: '80px',
        height: '80px',
    },
    players: {
        display: 'grid',
        width: '10px',
        height: '5px',
        gridRowGap: '5px',
    },
    player: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        color: 'white'
    },

    roulette: {
        width: '220px',
        height: '220px',
        position: 'absolute',
        marginLeft: '-110px',
        marginTop: '-160px',
        left: '50%',
        top: '50%',
    },
    wheelAnimate: {
        transition: '1000ms',
        width: '220px',
        height: '220px'
    },
    rotate: [

        {transform: 'rotate(330deg)'},
        {transform: 'rotate(270deg)'},
        {transform: 'rotate(210deg)'},
        {transform: 'rotate(150deg)'},
        {transform: 'rotate(90deg)'},
        {transform: 'rotate(30deg)'},
    ],
    goBtn: {
        position: 'absolute',
        zIndex: 100,
        width: 80,
        height: 80,
        fontSize: 30, cursor: 'pointer',
        borderRadius: '50%',
        border: '6px solid #287F39',
        backgroundColor: '#FFF',
        top: '60%', left: '50%', transform: 'translate(-49%,-50%)',
    },
    circle: {
        position: 'absolute',
        transform: 'scale(0.5)',
        top: '-40%',
        left: '-50%',
    },
    orderUser: {
        width: 424,
        height: 70,
        backgroundColor: '#0C8247',
        color: '#FCCE39',
        fontSize: 26,
        textAlign: 'center',
        lineHeight: 2.9,
        borderRadius: 15,
        zIndex: 1,
        position: 'absolute',
        top: '-30%',
        left: '-47%',
    },
    finishImg: {
        position: 'absolute', right: '-18%', bottom: '-18%',
    },
    userContainer: {
        bottom: 0, display: 'inline-block',
        width: 123.23, height: 188, margin: 10,
        backgroundColor: '#032213', borderRadius: 3.41, textAlign: 'center',
    },
    userImg: {
        width: 118.23, height: 138, marginTop: 14,
    },
    userName: {
        color: '#FCCE39', fontSize: 11.23,  textAlign: 'center',
    },
};
