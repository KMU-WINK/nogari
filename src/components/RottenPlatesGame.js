import react, {useState,createContext,memo} from 'react';
import Table from './Table';
import Users from './Users';
import './css/RottenPlatesGame.css'

export const TableContext = createContext();

export const CODE = {
  NORMAL : -1,
  CLICKED : 1,
}
export const INIT = "INIT";
export const GAME_START = "GAME_START";
export const OTHER_TURN = "OTHER_TURN";
export const MY_TRUN = "MY_TRUN";
export const END_GAME = "END_GAME";

const shuffle = (myList) => {
  const temp = [...myList];
  temp.sort( ()=> Math.random() - 0.5 );
  return temp;
}

const SeverPenaltyList = [
      {id: 0, penalty : "게임0", status : -1},{id: 1, penalty : "게임1", status : -1},{id: 2, penalty : "게임2", status : -1},{id: 3, penalty : "게임3", status : -1},{id: 4, penalty : "게임4", status : -1},
      {id: 5, penalty : "게임5", status : -1},{id: 6, penalty : "게임6", status : -1},{id: 7, penalty : "게임7", status : -1},{id: 8, penalty : "게임8", status : -1},{id: 9, penalty : "게임9", status : -1},
      {id: 10, penalty : "게임10", status : -1},{id: 11, penalty : "게임11", status : -1},{id: 12, penalty : "게임12", status : -1},{id: 13, penalty : "게임13", status : -1},
      {id: 14, penalty : "게임14", status : -1},{id: 15, penalty : "게임15", status : -1},{id: 16, penalty : "게임16", status : -1},{id: 17, penalty : "게임17", status : -1},
      {id: 18, penalty : "게임18", status : -1},{id: 19, penalty : "게임19", status : -1},{id: 20, penalty : "게임20", status : -1}
    ];

const ServerUsers = [
  {id : 0, userName : "user0",status : -1},{id : 1, userName : "user1",status : -1},{id : 2, userName : "user2",status : -1},{id : 3, userName : "user3",status : -1},
  {id : 4, userName : "user4",status : -1},{id : 5, userName : "user5",status : -1},
]

const RottenPlatesGame = memo(() => {
  const [table,setTable] = useState(SeverPenaltyList);
  const [message,setMessage] = useState("벌칙룰렛 게임입니다.");
  const [gameStatus,setGameStatus] = useState(INIT);
  const [halted,setHalted] = useState(true);
  const [curUser,setCurUser] = useState(-1);
  const [userlist,setUserlist] = useState(ServerUsers);
  const [selectedPlate,setSelectPlate] = useState();

  const initData = {
    table,
    setTable,
    message,
    setMessage,
    gameStatus,
    setGameStatus,
    halted,
    setHalted,
    curUser,
    setCurUser,
    userlist,
    setUserlist,
    selectedPlate,
    setSelectPlate,
  }

  const onClickNextBtn = () => {

    if (gameStatus === INIT) {
      setTable(SeverPenaltyList);
      setUserlist(ServerUsers);
      setMessage("벌칙룰렛 게입니다.");
      setHalted(true);
      setCurUser(-1);
      setGameStatus(GAME_START);

    } else if(gameStatus === GAME_START) {

      setHalted(true);
      setTable(shuffle(table));
      setCurUser((prev)=>prev+1);
      setGameStatus(OTHER_TURN);

    } else if(gameStatus === OTHER_TURN) {
        if(curUser === 1) {
          setCurUser((prev)=>prev+1);
          setGameStatus(MY_TRUN);
          setHalted(false);
          return;
        }
        if (curUser === 5 ) {
          setGameStatus(END_GAME);
          setHalted(true);
          alert(`Result :  ${selectedPlate.cellId} / ${selectedPlate.cellPenalty}`);
          return;
        }
        setCurUser((prev)=> prev+1);
        setHalted(true);
        setGameStatus(OTHER_TURN);
      }
  }

  const onClickStartBtn = () => {
    if (gameStatus === INIT) {
      setHalted(true);
      setTable(SeverPenaltyList);
      setTable(shuffle(table));
      setCurUser((prev)=>prev+1);
      setGameStatus(GAME_START);
    } else if (gameStatus === END_GAME) {
      setHalted(true);
      setTable(SeverPenaltyList);
      setTable(shuffle(table));
      // setCurUser((prev)=>prev+1);
      setGameStatus(INIT);
    }
  }
  
  return(
    <div className="MainContainer">
      <TableContext.Provider value={initData}>
        {(gameStatus === OTHER_TURN ) || (gameStatus === MY_TRUN) ? <div className="message">{`${curUser} 차례입니다.`}</div> : <div className="message">썩은접시 찾기</div> }
        <div className="GameStatus">gameStatus : {gameStatus}</div>
        <div>curUser : {curUser} </div>
        {gameStatus === INIT ? <button onClick={onClickStartBtn}>시작</button> : null}
        {gameStatus === END_GAME ? <button onClick={onClickStartBtn}>다시하기</button> : null}
        <button onClick={onClickNextBtn}>Next_Status</button>
        <Table/>
        <Users/>
      </TableContext.Provider>
    </div>
  )
})




export default RottenPlatesGame;