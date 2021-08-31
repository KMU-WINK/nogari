import React from 'react'

export default function GoStopModal(props) {

    // SpeakComponent에 발언 재개 여부를 반환
    const sendToSpeakComponent = () => {
        props.goStopResult(true);
        close();
    }

    const {open, close, userList} = props;
    return (
        <div>
            {open ? (
                <div style={styles.container}>
                    <div style={styles.title1}>게임 종료 투표가 시작됩니다!</div>
                    <div style={styles.title2}>게임을 재개하려면 GO, 끝내시려면 STOP 눌러주세요.</div>
                    <div style={styles.remainTime}>남은 시간</div>
                    <div style={styles.timer}>30<span style={styles.timerText}>초</span></div>
                    {/*<ul style={styles.listContainer}>*/}
                    {/*    <li style={styles.listStyle}>*/}
                    {/*        <div style={styles.circle}>GO</div>*/}
                    {/*        <span style={styles.userName}>이름</span></li>*/}
                    {/*    <li style={styles.listStyle}>*/}
                    {/*        <div style={styles.circle}>GO</div>*/}
                    {/*        <span style={styles.userName}>이름</span></li>*/}
                    {/*    <li style={styles.listStyle}>*/}
                    {/*        <div style={styles.circle}>GO</div>*/}
                    {/*        <span style={styles.userName}>이름</span></li>*/}
                    {/*    <li style={styles.listStyle}>*/}
                    {/*        <div style={styles.circle}>STOP</div>*/}
                    {/*        <span style={styles.userName}>이름</span></li>*/}
                    {/*    <li style={styles.listStyle}>*/}
                    {/*        <div style={styles.circle}>GO</div>*/}
                    {/*        <span style={styles.userName}>이름</span></li>*/}
                    {/*    <li style={styles.listStyle}>*/}
                    {/*        <div style={styles.circle}>STOP</div>*/}
                    {/*        <span style={styles.userName}>이름</span></li>*/}
                    {/*</ul>*/}

                    <button style={styles.goBtn}>GO!</button>
                    <button style={styles.stopBtn} onClick={sendToSpeakComponent}>STOP</button>
                </div>
            ) : null}
        </div>
    )
}

const styles = {
    container: {
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        width: 916, height: 486, backgroundColor: '#08552E', top: '18%',
    },
    title1: {
        color: '#FCCE39', fontStyle: 'Roboto', fontWeight: 'medium', fontSize: 18, marginTop: 43,
    },
    title2: {
        color: '#FCCE39', fontStyle: 'Roboto', fontWeight: 'medium', fontSize: 18, marginBottom: 61,
    },
    timer: {
        color: '#FCCE39', fontStyle: 'Roboto', fontWeight: 'bold', fontSize: 120, marginBottom: 60,
    },
    timerText: {
        fontSize: 24,
    },
    listContainer: {
        marginTop: 50,
        marginBottom: 46.28,
    },
    listStyle: {
        listStyleType: 'none', display: 'inline-block',
        width: 80, height: 120, marginRight: 10,
    },
    circle: {
        width: 50, height: 50, borderRadius: '50%', backgroundColor: '#c4c4c4', textAlign: 'center', lineHeight: 3,
        marginLeft: 15, marginTop: 10, marginBottom: 23,
    },
    userName: {
        color: '#fff', fontWeight: 'bold',
    },
    remainTime: {
        color: '#FCCE39', fontSize: 24,
    },
    goBtn: {
        width: 320, height: 70, backgroundColor: '#FCCE39', color: '#08552E', marginRight: 80,
        border: 'none', borderRadius: 10, fontSize: 32,
    },
    stopBtn: {
        width: 320, height: 70, backgroundColor: '#21AB66', color: '#fff', border: 'none', borderRadius: 10,
        fontSize: 32,
    },
}
