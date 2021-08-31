import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {getWordGameCategory} from "../firebase/games/word-game";
import {getWord} from "../firebase/games/liar";
import Category from "../components/common/Category";
import './LiarCategoryView.css'

export default function LiarCategoryView({ match } ) {
    const [isChoice, setIsChoice] = useState(false);

    const history = useHistory();
    const roomId = match.params.roomId;

    const LiarCategoryChoice = () => {
        history.push(`/rooms/${roomId}/liar`);
    }
    return (
        <>
            <div id='LiarCategoryContainer'>
                <p id='LiarCategoryHeader'>안주 라이어</p>
                <Category
                    setIsChoice = {setIsChoice}
                    roomId={roomId}
                />
                {isChoice ? <button id='LiarCategoryChoice_after' onClick={() => LiarCategoryChoice()}>선택완료</button> :<button id='LiarCategoryChoice_before'>선택완료</button> }
            </div>

        </>
    )
}