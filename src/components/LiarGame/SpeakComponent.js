import React, {useState} from 'react'
import Egg from '../../views/img/계란말이_스탠딩.png'
import Kimchi from '../../views/img/김치국수 스탠딩.png'
import Nogari from '../../views/img/노가리_스탠딩1 1.png'
import DDuk from '../../views/img/떡볶이 스탠딩.png'
import Bing from '../../views/img/빙수_스탠딩.png'
import Chicken from '../../views/img/치킨_스탠딩.png'
import GoStopModal from "./goStopModal";

export default function SpeakComponent(props) {
    // const gameUser = [
    //     {
    //         nickname: "성원이다", // 닉네임
    //         isLiar: false, // true 이면 해당 유저는 라이어
    //         order: true, // true 이면 본인 순서
    //         img: Egg,
    //     },
    //     {
    //         nickname: "성원이다", // 닉네임
    //         isLiar: true, // true 이면 해당 유저는 라이어
    //         order: false, // true 이면 본인 순서
    //         img: Kimchi,
    //     },
    //     {
    //         nickname: "성원이다", // 닉네임
    //         isLiar: false, // true 이면 해당 유저는 라이어
    //         order: false, // true 이면 본인 순서
    //         img: Nogari,
    //     },
    //     {
    //         nickname: "성원이다", // 닉네임
    //         isLiar: false, // true 이면 해당 유저는 라이어
    //         order: false, // true 이면 본인 순서
    //         img: DDuk,
    //     },
    //     {
    //         nickname: "성원이다", // 닉네임
    //         isLiar: false, // true 이면 해당 유저는 라이어
    //         order: false, // true 이면 본인 순서
    //         img: Bing,
    //     },
    //     {
    //         nickname: "성원이다", // 닉네임
    //         isLiar: false, // true 이면 해당 유저는 라이어
    //         order: false, // true 이면 본인 순서
    //         img: Chicken,
    //     },
    // ]
    const [count, setCount] = useState(20);

    setTimeout(() => {
        setCount(count - 1);
    }, 1000);

    const usersArray = Object.entries(props.users);

    const userList = usersArray.map((user) => {
        return (
            <li style={styles.listStyle}>
                <div style={styles.userContainer}>
                    <img src='#' alt="캐릭터" style={user[1]['liar'].order ? styles.startUser : styles.stopUser}/>
                    <div style={styles.nickName}>{user[0]}</div>
                </div>
            </li>

        )
    });


    const [voteModal, setVoteModal] = useState(false);
    const openVoteModal = () => {
        setVoteModal(true);
    }
    const closeVoteModal = () => {
        setVoteModal(false);
    }

    // goStopModal 으로 부터 받아온 데이터, 게임 진행 여부를 받았고, 다시 LiarGameView에 해당 결과를 반환
    const getFromVoteModal = (data) => {
        props.goStopResult(data);
    }


    return (
        <div style={styles.container}>
            <div style={styles.title}>‘{''}’님 차례입니다!!</div>
            <div style={styles.description}>제한시간 내 발언을 마치고 ‘발언 종료’ 버튼을 눌러주세요!</div>
            <span style={styles.count}>{count}<span style={styles.countText}>초</span></span>
            <button style={styles.stopBtn} onClick={openVoteModal}>발언 종료</button>
            <div>
                {userList}
            </div>
            <GoStopModal open={voteModal} close={closeVoteModal} userList={props.users} goStopResult={getFromVoteModal}/>
        </div>
    )
}

const styles = {
    container: {
        textAlign: 'center',
    },
    title: {
        color: '#000', fontStyle: 'Roboto', fontWeight: 'black',
        fontSize: 30, marginBottom: 18, marginTop: 68,
    },
    description: {
        color: '#000', fontSize: 14, marginBottom: 68,
    },
    count: {
        fontSize: 120, fontStyle: 'Roboto',
        fontWeight: 'bold', display: 'block',
    },
    stopBtn: {
        marginTop: 73, width: 320, height: 70, backgroundColor: '#FCCE39', color: '#08552E',
        fontStyle: 'Roboto', fontWeight: 'bold', fontSize: 25, border: '4px solid #08552E', borderRadius: 10,
        cursor: 'pointer',

    },
    startUser: {
        width: 100, height: 100, border: '1px solid red',
    },
    stopUser: {
        width: 100, height: 100,
    },
    listStyle: {
        listStyleType: 'none', display: 'inline-block', border: '1px solid black', borderRadius: 5,
        width: 144, boxSizing: 'border-box', height: 218, padding: 10, margin: '86px 8px 0 0',
        backgroundColor: '#032213', color: '#FCCE39'
    },
    countText: {
        fontSize: 24,
    },
    userContainer: {
        marginTop: 34,
    },
    nickName: {
        marginTop: 8,
    },
}
