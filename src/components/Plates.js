import react,{useState,memo} from 'react'

const Plates = memo(({penaltyList,opendList,unOpendList}) => {


  return (
    <ul>
        
      {penaltyList.map((item,index)=>{
        return <button key={penaltyList[index].id}>{penaltyList[index].penalty}</button>
      })}
    </ul>
  )
})

export default Plates;