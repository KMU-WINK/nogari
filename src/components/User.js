import react, {useState,useContext,memo} from 'react';
import {TableContext} from './RottenPlatesGame';


const User = memo(( {userId,userName,userIndex} ) => {

  return (
    <>
      <div className="userWrapper" >
        <div className="userImage">
          userImage
        </div>
        <div className="userName">
          {userName}
        </div>
      </div>
    </>
  )

})

export default User;