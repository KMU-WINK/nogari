import React, {useEffect, useState} from 'react';
import {getWordGameCategory} from "../../firebase/games/word-game";
import {setWord} from "../../firebase/games/liar";
import '../css/Category.css';

export default function Category(props) {
    const [categoryData, setCategoryData] = useState({});
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const init = async () => {
            const gameData = await getWordGameCategory();
            const test = Object.entries(gameData);
            const category = test.map(([category]) => category);
            setCategories(category);
            setCategoryData(gameData);
        };
        init();
    }, []);

    const getCategoryData = (categoryName) => {
        props.setIsChoice(true);
        const random = Math.floor(Math.random()*4); //단어 랜덤 선택 위한 index
        const gameData = categoryData[categoryName]; //해당 카테고리의 단어들 array
        const wordData = Object.values(gameData); //해당 카테고리 단어의 value (라이어게임 전용)
        setWord(props.roomId, wordData[random]); //랜덤 선택된 단어 (라이어게임 전용)
    };
    return (
        <>
            <div>
                <p id='categoryGuide'>원하는 카테고리를 선택해주세요</p>
                <div className='categoryList'>
                    {categories.slice(0,4).map((cate) => <button className='categoryBtn' onClick={() => getCategoryData(cate)}>{cate}</button>)}
                    <br/>
                    {categories.slice(4,8).map((cate) => <button className='categoryBtn' onClick={() => getCategoryData(cate)}>{cate}</button>)}
                    <br/>
                    {categories.slice(8,11).map((cate) => <button className='categoryBtn' onClick={() => getCategoryData(cate)}>{cate}</button>)}
                </div>
            </div>
        </>
    )
}