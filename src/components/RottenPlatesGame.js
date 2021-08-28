import react, {useState,createContext,memo,useRef, useEffect} from 'react';
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

const userColor = () => {
  return { 
    color: '#FCCE39',
    // fontSize: "24px",
  }
}

const SeverPenaltyList = [
      {id: 0, penalty : "pass", status : -1},{id: 1, penalty : "pass", status : -1},{id: 2, penalty : "pass", status : -1},{id: 3, penalty : "pass", status : -1},{id: 4, penalty : "pass", status : -1},
      {id: 5, penalty : "pass", status : -1},{id: 6, penalty : "pass", status : -1},{id: 7, penalty : "pass", status : -1},{id: 8, penalty : "pass", status : -1},{id: 9, penalty : "pass", status : -1},
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
  const [selectedPlate,setSelectPlate] = useState({isPass : true, id : -1 ,penalty : "default"});
  const [sec,setSec] = useState(15);
  const [timeout,setTimeout] = useState(false);

  const timer = useRef();

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

  // useEffect(()=>{
  //   if ( gameStatus === END_GAME) {
  //     clearInterval(timer.current);
  //     setSec(0);
  //   }
  //   if(timeout && sec ==0) {
  //     clearInterval(timer.current);
  //     setSec(15);
  //   }

  //   if(sec == 0 ){
  //     clearInterval(timer.current);
  //     setTimeout(true);
  //   }
  //   if(sec>0) {
  //     timer.current = setInterval(()=>{
  //       setSec((prev)=>prev-1);
  //     },500);
  //     setTimeout(false);
  //   }
    
  //   return () => {
  //     clearInterval(timer.current);
  //   }
  // },[sec,curUser]);



  

  // 테스트를 위해 만든 버튼 (순서)
  const onClickNextBtn = () => { 
    
    if (gameStatus === INIT) {
      setHalted(true);
      setTable(shuffle(table));
      setCurUser((prev)=>prev+1);
      setGameStatus(GAME_START);


    } else if(gameStatus === GAME_START) {

      setCurUser((prev)=>prev+1);
      setHalted(true);
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

  }




  return(

    <div className="MainContainer">
      <TableContext.Provider value={initData}>
        {(gameStatus === OTHER_TURN ) || (gameStatus === MY_TRUN) || (gameStatus === GAME_START) ? <div className="message"> <span style={userColor()}>{curUser}</span> 차례입니다. 접시를 선택해주세요</div> : <div className="message">썩은접시 찾기</div> }
        {gameStatus !== INIT ? <div className="timer"> {sec} 초 남았습니다.</div> : null}
        <button onClick={onClickNextBtn} className="nextBtn">Next_Status</button>
        {/* <button onClick={onClickStartBtn} className="startBtn">START</button> */}
        <Table/>
        <Users/>
      </TableContext.Provider>
    </div>
  )
})



export default RottenPlatesGame;