import react, {useState,useEffect} from 'react';
import Plates from "./Plates"
export const statusCode = {
  INIT : -1,
  OTHERCOHICE : 0,
  OTHERCOHICEDONE : 1,
  MYCHOICE : 2,
  MYCHOICEDONE : 3,
  GAMESTART : 8,
  ALLDONE : 9,
}

const shuffle = (myList) => {
  const temp = [...myList];
  temp.sort( ()=> Math.random() - 0.5 );
  return temp;
}



const RottenPlatesGame = () => {
  const [status,setStatus] = useState();
  const [message,setMessage] = useState();
  const [timer,setTimer] = useState(10);
  const [penaltyList,setPenaltyList] = useState();
  const [opendList,setOpendList] = useState();
  const [unOpendList,setUnOpendList] = useState();


  useEffect(()=>{
    console.log("ComponentDidMount");
    //ComponentDidMount
    const SeverPenaltyList = [
      {id: 0, penalty : "게임0"},{id: 1, penalty : "게임1"},{id: 2, penalty : "게임2"},{id: 3, penalty : "게임3"},{id: 4, penalty : "게임4"},
      {id: 5, penalty : "게임5"},{id: 6, penalty : "게임6"},{id: 7, penalty : "게임7"},{id: 8, penalty : "게임8"},{id: 9, penalty : "게임9"},
      {id: 10, penalty : "게임10"},{id: 11, penalty : "게임11"},{id: 12, penalty : "게임12"},{id: 13, penalty : "게임13"},
      {id: 14, penalty : "게임14"},{id: 15, penalty : "게임15"},{id: 16, penalty : "게임16"},{id: 17, penalty : "게임17"},
      {id: 18, penalty : "게임18"},{id: 19, penalty : "게임19"},{id: 20, penalty : "게임20"},{id: 21, penalty : "게임21"},
      {id: 22, penalty : "게임22"},{id: 23, penalty : "게임23"},{id: 24, penalty : "게임24"},{id: 25, penalty : "게임25"},
      {id: 26, penalty : "게임26"},{id: 27, penalty : "게임27"},{id: 28, penalty : "게임28"},{id: 29, penalty : "게임29"},
    ];
    setPenaltyList(SeverPenaltyList);
    setStatus(statusCode.INIT);
    console.log(penaltyList);
    console.log(status);
    console.log("DONE");
  },[]);


  const onClickStartBtn = () => {
    setStatus(statusCode.GAMESTART);
    setMessage("게임을 시작합니다.");
    setTimer(0);
    setOpendList([]);
    setUnOpendList(shuffle(penaltyList));
    console.log("unOpendList : ", unOpendList);
    console.log(status);
  }

  return (
    <>
      <section className="Message">
        <div>message : {message}</div> 
        <div>timer : {timer}</div>
        <div>status : {status}</div>
        <button onClick={onClickStartBtn}>시작</button>
      </section>


      <section className="Plates">
        {status === statusCode.GAMESTART ? <Plates penaltyList={penaltyList} opendList={opendList} unOpendList={unOpendList}></Plates> : null}
        
      </section>

      <section className="Cards">
        
      </section>

      <hr></hr>

    </>
  )

}

export default RottenPlatesGame;