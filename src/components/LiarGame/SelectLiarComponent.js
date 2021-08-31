import React, {useState} from 'react'
import {useHistory} from "react-router";
import '../css/selectLiar.css'
import Egg from '../../views/img/계란말이_스탠딩.png'
import Kimchi from '../../views/img/김치국수 스탠딩.png'
import Nogari from '../../views/img/노가리_스탠딩1 1.png'
import DDuk from '../../views/img/떡볶이 스탠딩.png'
import Bing from '../../views/img/빙수_스탠딩.png'
import Chicken from '../../views/img/치킨_스탠딩.png'

export default function SelectLiarComponent(props) {


    let [userList, setUserList] = useState([
        {
            nickname: "임성원",
            profile: Egg,
            count: 0,
        },
        {
            nickname: "박정민",
            profile: Kimchi,
            count: 0,
        },
        {
            nickname: "김호준",
            profile: Nogari,
            count: 0,
        },
        {
            nickname: "신재혁",
            profile: DDuk,
            count: 0,
        },
        {
            nickname: "김지성",
            profile: Bing,
            count: 0,
        },
        {
            nickname: "정나영",
            profile: Chicken,
            count: 0,
        },
    ]);

    let user = userList.map((user, index) => {
        return (
            <li className="userContainer" key={index} onClick={() => {
                let newArr = [...userList];
                newArr[index].count += 1;
                setUserList(newArr);
            }}>
                {userList[index].count ? <div className="voteCount">{userList[index].count}</div> : <div className="noneCount">{userList[index].count}</div>}
                <img src={user.profile} alt="프로필" className="userImage"/>
                <span>{user.nickname}</span>
            </li>
        )
    });

    //임시 게임끝
    const test = () => {
        props.setIsStart(false);
        props.setContinueGame(false);
    }
    return (
        <>
            <div className="container">
                <div className="selectLiar">라이어를 지목해주세요!</div>
                <div className="description">동점일 시 게임으로 다시 돌아갑니다.</div>
                {user}
                <button onClick={test} className="selectBtn">선택 완료</button>
            </div>
        </>
    )
}

