import React, {useState, useEffect} from 'react';
import '../../src/components/css/liarGame.css'
import SuggestionModal from "../components/LiarGame/suggestionModal";
import SpeakComponent from "../components/LiarGame/SpeakComponent";
import SelectLiarComponent from "../components/LiarGame/SelectLiarComponent";
import {getGameRoomData} from "../firebase/game-data";

export default function LiarGameView({ match }) {

    //게임 데이터 불러오기
    const [liarGamedata, setLiarGamedata] = useState({});
    const [users, setUsers] = useState([]);

    const changedgamedata = async (gamedata) => {
        setUsers(gamedata.players);
        setLiarGamedata(gamedata.liar);
    }
    useEffect(() => {
        getGameRoomData(match.params.roomId, changedgamedata)
    }, []);

    //나의 게임 데이터
    const myNickname = localStorage.getItem('nickname');
    const myGameData = users[myNickname];

    //제시어
    const word = liarGamedata.liarword;

    //프론트
    const [isStart, setIsStart] = useState(false); // 게임 실행 중 확인 여부 변수
    const [continueGame, setContinueGame] = useState(false);
    const startGame = () => { // 게임이 시작되면 발언하는 화면으로 이동
        setIsStart(true);
    }
    const goStop = (result) => { // true 이면, 투표 화면으로 이동. false 인 경우 첫 사용자부터 다시 발언 재개
        setContinueGame(result);
    }

    useEffect(()=> {
        const userArray = Object.entries(users);
        let checkCount = 0;
        userArray.forEach(user => {
                if(user[1]['liar'].isCheckWord) checkCount +=1;
            }
        )
        if(checkCount==userArray.length) setIsStart(true);
    })


    if (isStart && !continueGame) {
        return (
            <>
                <div className='container'>
                    <div className='inner-container'>
                        <SpeakComponent
                            goStopResult={goStop}
                            myGameData={myGameData}
                            users={users}
                        />
                    </div>
                </div>
            </>
        )
    } else if (isStart && continueGame) {
        return (
            <>
                <div className='container'>
                    <div className='inner-container'>
                        <SelectLiarComponent
                            setIsStart = {setIsStart}
                            setContinueGame = {setContinueGame}
                        />
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='container'>
                    <div className='inner-container'>
                        <SuggestionModal
                            word = {word}
                            users = {users}
                            myGameData = {myGameData}
                        />
                    </div>
                </div>
                <input type="button" value="누르면 게임 실행됨" onClick={startGame} className="tempBtn"/>
            </>
        );
    }
}