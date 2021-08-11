import React from 'react';
import { Link } from 'react-router-dom';

export default function MainNavigator() {
  return (
    <>
      <div>
        <ul style={styles.gameList}>
          <li style={styles.gameBtn}><Link to="/" style={styles.link}>메인으로</Link></li>
          <li style={styles.gameBtn}><Link to="/marble" style={styles.link}>주루마블</Link></li>
          <li style={styles.gameBtn}><Link to="/liar" style={styles.link}>라이어게임</Link></li>
          <li style={styles.gameBtn}><Link to="/roulette" style={styles.link}>룰렛게임</Link></li>
          <li style={styles.gameBtn}><Link to="/word" style={styles.link}>초성 게임</Link></li>
        </ul>
      </div>
    </>
  );
}

const styles = {
  gameList: {
    padding:0,
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none'

  },
  gameBtn: {
    width: '15%',
    height: '15%',
    backgroundColor: "yellow",
    padding:'20px',
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'none',
    color:'black'
  }
}