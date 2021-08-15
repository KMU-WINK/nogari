import react, {useContext,memo} from 'react';
import {TableContext,CODE, OTHER_TURN} from './RottenPlatesGame';

const getCellStyle = (code) => {


  if (code === CODE.NORMAL) {
    return {
      background : '#444',
    }
  } else if (code === CODE.CLICKED) {
    return {
      background : '#444',
      pointerEvents : 'none',
      opacity : '0.5',
    }
  }
}


const Cell = memo(( {cellId,cellIndex,cellPenalty} ) => {
  const {table,setTable,halted,setHalted,gameStatus,setGameStatus,curUser,setCurUser,selectPlate,setSelectPlate} = useContext(TableContext);

  const onClickCell = (e) => {
    if (halted) {
      return;
    }
    if(table[cellIndex].status === CODE.NORMAL) {
      const temp = [...table];
      temp[cellIndex].status = CODE.CLICKED;
      setTable(temp);
      setGameStatus(OTHER_TURN);
      setCurUser((prev) => prev + 1);
      setSelectPlate({cellId : cellId, cellPenalty : cellPenalty});
      setHalted(true);
    }
    console.log("cellID : ", cellId, "cellIndex : ",cellIndex,"status : " ,table[cellIndex].status);
  }

  return (
    <>
      <div style = {getCellStyle(table[cellIndex].status)}className="cell" onClick={onClickCell}>{cellPenalty}</div>
    </>
  )

})

export default Cell;