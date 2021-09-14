import react, {useContext,memo} from 'react';
import {TableContext} from './RottenPlatesGame';
import Cell from "./Cell"

const Table = memo(() => {
  const {table,setTable} = useContext(TableContext);
  return (
    <>
      <div className="platesContainer">
        {/*{table.map( (item,index) => {return <Cell cellIndex={index} cellPenalty={item.penalty} cellId={item.id} cellStatus={item.status}></Cell> })}*/}
        <Cell table={table}/>
      </div>
    </>
  )

})

export default Table;