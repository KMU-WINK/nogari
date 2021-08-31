import React, {useState} from 'react';
import * as members from "../firebase/users"
import {Link} from "react-router-dom";

export default function CreateUserView() {
    const [nickname, setNickname] = useState(''); // 닉네임
    const [character,setCharacter] = useState(0); // 프로필

    const handleOnChange = (e) => { // 닉네임 변화 감지
        setNickname(e.target.value);
    }

    const createID = async () => {
        if (character === 0) { // 프로필 설정 안 했을 때 에러
            alert("error")
        }
        else {
            const userId = await members.createUser(nickname, character);
            localStorage.setItem('myId', userId);
            localStorage.setItem('nickname', nickname)
            localStorage.setItem('character', character)

            setCharacter(0);

            /*  유저 문서에서 주기적으로 접속 시간 받을 필요가 있나? 룸에서만 확인하면 되는 거 아닌가요?
            setInterval(async () => {
                const user = localStorage.getItem('myId')
                const time = new Date().getTime()
                localStorage.setItem('connection',time)
                await firebase.firestore().collection('users').doc(`${user}`).update({
                    lastConnection : time
                }, {merge:true})
            }, 6000);
            */
        }
    }

    return (
        <>
            <div>
                <>
                    <div>
                        <h2> 닉네임 설정</h2>
                        <input type="text" onChange={handleOnChange} value={nickname} />
                        <h2> 캐릭터 설정 </h2>
                        <button onClick={()=>{setCharacter(1)}}>1</button>
                        <button onClick={()=>{setCharacter(2)}}>2</button>
                        <button onClick={()=>{setCharacter(3)}}>3</button>
                    </div>
                    <div>
                        <button onClick={createID}>캐릭터 생성하기</button>
                    </div>
                    <li ><Link to="/createroom" >방 만들기</Link></li>
                </>
            </div>
        </>
    );
}