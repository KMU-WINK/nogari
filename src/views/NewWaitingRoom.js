import React, { useState, useEffect } from 'react';
import '../components/css/WatingRoom.css'
import Modal from 'react-modal';
import Exit from '../components/modal/exit'
import CopyLink from '../components/modal/copylink'
import SelectGame from "../components/modal/selectGame";
import { getRoomInfo } from "../firebase/waiting-room";
import { getUserInfo } from '../firebase/users';
import firebase from "firebase";
import { setPlayers } from "../firebase/game-data";
import RankMenu from '../components/modal/RankMenu';
import MainGameModal from "../components/modal/mainGameInfo";

import Roulette from './img/상한안주.png';
import Liar from './img/안주라이어.png';
import Marble from './img/노가리마블.png';
import Midterm from './img/중간고사.png';
import GameInfo from "../components/modal/gameInfo";

Modal.setAppElement('#root');
export default function NewWaitingRoom({ match, history }) {
    const [users, setUsers] = useState([]);

    const [room, setRoom] = useState({
        isSelected: true,
        isInfoOpen: false,
        isMenuOpen: true,
        selectedGameName: '',
        selectedGameRule: '',
        exitModalOpen: false,
        linkCopyModalOpen: false,
        selectGameModal: false,
    });
    // room 안돼서 새로 만듦
    const [selectedGameInfo, setSelectedGameInfo] = useState([
        {
            isSelected: false,
            selectedGameStory: '',
            selectedGameName: '',
            selectedGameRule: '',
            playTime: '',
            background: '', // 선택된 게임 일러스트가 들어갈 변수
        },
    ])

    const [gamedata, setGamedata] = useState({}); //파이어베이스로 가져온 데이터
    const setRoomState = (key, value) => setRoom({ ...room, [key]: value });

    // 다른 방 찾기, 링크로 초대하기 버튼에 관한 변수, 함수
    const exitModal = (isOpen) => {
        setRoomState('exitModalOpen', isOpen);
        history.push("/find");
    }
    const linkCopyModal = (isOpen) => {
        setRoomState('linkCopyModalOpen', isOpen)
        if (isOpen) {
            navigator.clipboard.writeText(window.location.href);
        }
    }

    // 게임 선택 버튼에 관한 변수, 함수
    const selectGameModal = (isOpen) => setRoomState('selectGameModal', isOpen);
    const isMenuOpenFun = () => setRoomState('isMenuOpen', !room.isMenuOpen);
    const isInfoOpenFun = () => setRoomState('isInfoOpen', !room.isInfoOpen);

    const getFromSelectMenu = (data) => {
        // console.log(data.gameName);
        // console.log(data.description);
        // const roomData = {
        //     ...room,
        //     selectedGameName: data.gameName,
        //     selectedGameRule: data.description,
        //     isSelected: true,
        // };
        // setRoom(roomData);
        // console.log(room);
        const tempData = [...selectedGameInfo];
        tempData[0].isSelected = true
        tempData[0].selectedGameName = data.gameName;
        tempData[0].selectedGameRule = data.description;
        tempData[0].selectedGameStory = data.story;
        tempData[0].playTime = data.runningTime;
        if(data.gameName === "노가리마블") {tempData[0].background = Marble;}
        else if (data.gameName === "안주 라이어") {tempData[0].background = Liar;}
        else if (data.gameName === "중간고사 서바이벌") {tempData[0].background = Midterm;}
        else if (data.gameName === "상한 안주찾기") {tempData[0].background = Roulette;}

        setSelectedGameInfo(tempData);
    }

    // 새로운 참여자가 발생하거나 룸 정보가 바뀔때 실행되는 함수
    const changedRoomInfo = async (roomInfo) => {
        console.log(roomInfo)
        // const captainInfo = await getUserInfo(roomInfo.captain);
        // setCaptain(captainInfo);
        let members = [];
        let membersGamedata = {};
        // console.log(roomInfo);
        for await (const member of roomInfo.members) {
            const memberInfo = await getUserInfo(member);
            if (!memberInfo) continue;
            members.push(memberInfo);
        }
        const memberProps = members.map((member) => member.nickname);
        // console.log(memberProps);
        setUsers(memberProps);

        for await (const member of memberProps) {
            const gameMember = {liar: {isCheckWord: false, isliar: false, order:false}, wordGame : {isCorrected: false}}
            membersGamedata[member] = gameMember;
        }
        await setPlayers(match.params.roomId, membersGamedata);
    }

    const [gameInfoModal, setGameInfoModal] = useState(false);
    const infoOpenModal = () => {
        setGameInfoModal(true);

    }
    const infoCloseModal = () => {
        setGameInfoModal(false);
    }
    const startCallback = (data) => {
        setGamedata(data);
    }

    const gameStart = () => {
        getRoomInfo(match.params.roomId, startCallback);
        if(gamedata.game === "노가리마블") {history.push(`/rooms/${match.params.roomId}/marble`)}
        else if (gamedata.game === "안주 라이어") {history.push(`/rooms/${match.params.roomId}/liarCategory`)}
        else if (gamedata.game === "중간고사 서바이벌") {history.push(`/rooms/${match.params.roomId}/wordCategory`)}
        else if (gamedata.game === "상한 안주찾기") {history.push(`/rooms/${match.params.roomId}/roulette`)}
    }


    useEffect(() => {
        getRoomInfo(match.params.roomId, changedRoomInfo);
    }, []);
    return (
        <>
            <div id="mainWrap">
                <section className="navi">
                    <div className="btnContainer">
                        <button className="modal" onClick={isMenuOpenFun}>메뉴판 일러스트</button>
                        <button className="modal" onClick={() => linkCopyModal(true)}>링크로 초대하기</button>
                        <button className="modal" onClick={() => exitModal(true)}>다른방 찾기</button>
                    </div>

                    <Exit open={room.exitModalOpen} close={() => exitModal(false)}></Exit>
                    <CopyLink open={room.linkCopyModalOpen} close={() => linkCopyModal(false)}></CopyLink>
                    <RankMenu id="menuModal" stateData={room} isMenuOpenFun={isMenuOpenFun} > </RankMenu>
                </section>

                <section className="Main">
                    <div className="char1">
                        {
                            users.filter((item, index) => index < 3)
                                .map((item, index) => {
                                    return <div key={index}>
                                        <div className="character"></div>
                                        <div className="userName">{item}</div>
                                    </div>;
                                })
                        }
                    </div>

                    <div className="gameMain">
                        <button className="selectGameBtn" onClick={() => selectGameModal(true)}>게임 선택</button>
                        <div className="selectedGame">{selectedGameInfo[0].isSelected ?
                            <div className="gameContainer" style={{
                                width: 450,
                                height: 315.46,
                                borderRadius: '5%',
                                backgroundImage: `url(${selectedGameInfo[0].background})`,
                                backgroundSize: 'cover',
                            }}>
                                <div className="gameTitle">
                                    {selectedGameInfo[0].selectedGameName}
                                </div>
                                <span className="main-info-btn" onClick={infoOpenModal}></span>
                                <MainGameModal open={gameInfoModal} close={infoCloseModal} gameInfo={selectedGameInfo[0]}/>
                            </div> :
                            <div className="selecteMessage">
                                게임을 선택해주세요
                            </div>
                        }
                            {/* <div className="infoBtn" onClick={isInfoOpenFun}>i</div>
                    <Modal id="infoModal" isOpen={isInfoOpen} onRequestClose={() => setIsInfoOpen(false)} style={
                        {
                            overlay: {
                                position: 'absolute',
                                top: '400px',
                                left: '470px',
                                right: 0,
                                bottom: 0,
                                width: '1000px',
                                height: '300px',
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                zIndex: 99
                            }
                        }
                    }>
                        {selectedGameRule ? <div>{selectedGameRule}</div> : <div>게임을 먼저 선택해 주세요.</div>}
                    </Modal> */}
                        </div>
                        {room.isSelected ? <button className="startBtn" onClick={gameStart}>시작</button> :
                            <button className="stopBtn" disabled>시작</button>}
                    </div>

                    <div className="char2">
                        {
                            users.filter((item, index) => index >= 3)
                                .map((item, index) => {
                                    return <div key={index}>
                                        <div className="character"></div>
                                        <div className="userName">{item}</div>
                                    </div>;
                                })
                        }
                    </div>
                </section>
                <SelectGame open={room.selectGameModal} close={() => selectGameModal(false)}
                            parentFunction={getFromSelectMenu}></SelectGame>
            </div>

        </>
    )
}