import React from 'react';
import Modal from 'react-modal'
import {useState, useEffect} from "react";
import './WordGameView.css';
import TimeoutModal from './Timeout'
import {getWordGameCategory, getPlayers} from "../firebase/games/word-game";

export default function WordGameView({ match }) {
    const [categoryData, setCategoryData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [wordGame, setWordGame] = useState([
        {
            quiz: '',
            answer: '',
        }
    ]);
    const [random, setRandom] = useState([]);
    const [state, setState] = useState()
    const [round, setRound] = useState(0);
    const [player, setPlayer] = useState();

    // 랜덤하게 추출
    const getRandom = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    const getRandomArray = (min, max, count) => {
        if (max - min + 1 < count) return;

        let randomArr = [];
        while (1) {
            let index = getRandom(min, max);

            // 중복 여부를 체크
            if (randomArr.indexOf(index) > -1) {
                continue;
            }

            randomArr.push(index);

            // 원하는 배열 갯수가 되면 종료
            if (randomArr.length == count + 1) {
                break;
            }
        }

        // 중복되지 않는 범위 내의 인덱스 array : randomArr ex ) randomArr = [0, 1, 3, 4, 2]
        // wordGame에는 해당 카테고리의 quiz와 answer쌍이 들어있음
        // arr에 wordGame[0], wordGame[1], wordGame[3], ... 넣어줌
        // 이러한 arr를 setRandom
        let arr = [];
        randomArr.map(num => {
            // console.log(wordGame[num], random)
            // setRandom(random => [...random, wordGame[num]])
            arr.push(wordGame[num])
        });
        setRandom(arr);
    }

    // category 버튼 클릭시 문제를 setting하는 부분
    const getQuiz = () => {
        let total = wordGame.length;
        getRandomArray(0, total - 1, totalRound);
    }

    useEffect(() => {
        random[0] !== undefined && console.log(random)
        random[0] !== undefined && setState({
            //isSubmitted: false,
            value: random[round].quiz,
            ans: random[round].answer
        })
    }, [random])

    useEffect(() => {
        const init = async () => {
            const gameData = await getWordGameCategory();
            const playerData = await getPlayers(match.params.roomId);
            console.log(playerData);
            const test = Object.entries(gameData);
            console.log(test);
            setPlayer(playerData['players']);
            const category = test.map(([category, list]) => category);
            console.log(category);
            setCategories(category);
            setCategoryData(gameData);
        };
        init();
    }, []);

    // 카테고리 버튼을 누르면 data를 get
    const getCategoryData = (categoryName) => {
        setSelectedCategory(categoryName);
        setWordGame([]);
        setWordGameData(categoryName)
    };

    const setWordGameData = (categoryName) => {
        let arr = [];
        Object.entries(categoryData[categoryName]).map((data) => arr.push({
            quiz: data[0],
            answer: data[1]
        }));
        setWordGame(arr);
    }

    useEffect(() => {
        getQuiz()
    }, [wordGame])

    const totalRound = 2; // 한 카테고리에서 출제될 문제 수 // 현재 firebase data에 카테고리당 6개의 데이터가 들어있어 6개 이하로 설정해야 함.

    const [value, setValue] = useState();
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        console.log(seconds)
        const countdown = setTimeout(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            } else {
                setTimeout(() => {
                    setSeconds(30);
                }, 3000)
                totalRound !== round ? setRound(round + 1) : setRound(0);
                // setState({value: random[round].quiz, ans: random[round].answer});
                setValue('');
            }

        }, 1000);
        return () => (clearTimeout(countdown));
    }, [seconds]);


    const handleSearch = async () => {
        if (state.ans === value) {
            alert("정답");
            setSeconds(30);
            // 일단은 라운드 2까지 밖에 없으니까 라운드 다 되면 0으로 다시 초기화 해줍니다
            totalRound !== round ? setRound(round + 1) : setRound(0);
            // setState({value: random[round].quiz, ans: random[round].answer});
            setValue('');
        }
    }

    // round가 증가하면 quiz state를 set
    useEffect(() => {
        console.log('round', round);
        random[0] !== undefined && setState({value: random[round].quiz, ans: random[round].answer});
    }, [round])


    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        const exit = setInterval(() => {
            setModalOpen(false)
        }, 3000)
    }

    return (
        <>

            <div className="main_wordgame">
                {categories.map((cate, index) => <button onClick={() => getCategoryData(cate)}
                                                         key={index}>{cate}</button>)}
                <div className="category"
                     style={{fontFamily: "DungGeunMo", fontWeight: "bold", fontSize: "28.4571px", textAlign: "center"}}>
                    카테고리 : {selectedCategory}
                </div>
                <div style={{
                    fontFamily: "DungGeunMo",
                    marginTop: "26px",
                    fontSize: "22.2893px",
                    textAlign: "center",
                    lineHeight: "26px",
                    lineSpacing: "0.01em",
                    color: "#535353"
                }}> 남은 시간
                    {
                        seconds >= 20 && <div style={{
                            marginTop: "15px",
                            fontFamiy: "DungGeunMo",
                            fontSize: "37.1488px",
                            textAlign: "center",
                            lineHeight: "44px",
                            lineSpacing: "0.01em",
                            color: "#1B9659"
                        }}>{seconds}</div>
                    }
                    {
                        seconds >= 10 && seconds < 20 && <div style={{
                            marginTop: "15px",
                            fontFamiy: "DungGeunMo",
                            fontSize: "37.1488px",
                            textAlign: "center",
                            lineHeight: "44px",
                            lineSpacing: "0.01em",
                            color: "#FF8F1D"
                        }}>{seconds}</div>
                    }
                    {
                        seconds < 10 && <div style={{
                            marginTop: "15px",
                            fontFamiy: "DungGeunMo",
                            fontSize: "37.1488px",
                            textAlign: "center",
                            lineHeight: "44px",
                            lineSpacing: "0.01em",
                            color: "#FF0000"
                        }}>{seconds}</div>
                    }

                </div>
                <div className="boxwrapper">
                    <div className="quizBox">
                        {
                            (state !== undefined && state.ans !== value)
                            &&
                            state.value.split('').map((letter) => (
                                <div>{letter}</div>
                            ))
                        }
                    </div>
                </div>
                <div className="boxwrapper">
                    {
                        state !== undefined && state.ans === value && <div className="quizBox">
                            <div>정</div>
                            <div>답</div>
                        </div>
                    }
                </div>
                <div style={{display: "block"}}>
                    <input className="input" type="text" value={value} placeholder="정답을 입력해주세요" onKeyUp={handleSearch}
                           onChange={e => setValue(e.target.value)}/>
                </div>
                <div>
                    {
                        !seconds && <TimeoutModal open={openModal} close={closeModal}>Timeout</TimeoutModal>

                    }
                </div>
                <div className="footer">
                    {player !== undefined && Object.keys(player).map((mem) => (<div>{mem}</div>))}
                </div>
            </div>
        </>
    );
}
