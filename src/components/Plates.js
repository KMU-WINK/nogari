import react,{useState,memo} from 'react'

const Plates = memo(({penaltyList,opendList,unOpendList}) => {


  return (
    <ul>
      
      {unOpendList.map((item,index)=>{
        return <button key={unOpendList[index].id}>{unOpendList[index].penalty}</button>
      })}
    </ul>
  )
})

export default Plates;