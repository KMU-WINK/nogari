import React,{useState,memo} from 'react';


const RankMenuLeftItem = memo(({data}) => {

  const makeBadges = () => {
    const badges = [];
    for (let i = 0; i < data.badges.length; i++){
      if (i >= 8) {
        return badges;
      }
      badges.push(<div className="LeftBadge">{data.badges[i]}</div>);
    }
    return badges;
  }

  return (
    <>
        <div className="nameTitleContainer">
          <div className="LeftName">
            <div>{data.rank + 1}위</div>
            <div>{data.nickName} {data.name}</div>
          </div>
          <div className="LeftTitle">{data.charType}</div>
        </div>

        <div className="LeftImage">이미지</div>
        <div className="LeftBadgeContainer">
          받은뱃지
          <div className="LeftBadges">
          {makeBadges()}
          </div>
        </div>
    </>
  )
})

export default RankMenuLeftItem;

{/* <div className="menuRankLeft">
							<div className="nameTitleContainer">
								<div className="LeftName">
									<div>1위</div>
									<div>청춘 김민석</div>
								</div>
								<div className="LeftTitle">마른 오징어</div>
							</div>

							<div className="LeftImage">이미지</div>
							<div className="LeftBadgeContainer">
								받은뱃지
								<div className="LeftBadges">
									<div className="LeftBadge">+</div>
									<div className="LeftBadge">+</div>
									<div className="LeftBadge">+</div>
								</div>
							</div>
						</div> */}