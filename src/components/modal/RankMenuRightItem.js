import React,{memo} from 'react';


const RankMenuRightItem = memo(({data}) => {

  const makeBadges = () => {
    const badges = [];
    for (let i = 0; i < data.badges.length; i++) {
      if (i >= 8) {
        return badges;
      }
      badges.push(<div className="rightBadge">{data.badges[i]}</div>);
    }
    return badges;
  }

  return (
    <>
      <div className="menuRankRightWrapper">
        <div className="menuRangkRightContainer">
          <div className="rightRank">{data.rank+1}위</div>
          <div className="rightTitle">{data.nickName} {data.name}</div>
          <div className="rightBadgeContainer">
            <div className="rightBadgeTitle">받은뱃지</div>
            <div className="rightBadges">
              {makeBadges()}
            </div>
          </div>
        </div>
        <div className="rightImage">이미지</div>
      </div>
    </>
  )
})

export default RankMenuRightItem;

{/* <div className="menuRankRightWrapper">
  <div className="menuRangkRightContainer">
    <div className="rightRank">2위</div>
    <div className="rightTitle">청춘 김민석</div>
    <div className="rightBadgeContainer">
      <div className="rightBadgeTitle">받은뱃지</div>
      <div className="rightBadges">
        <div className="rightBadge">+</div>
        <div className="rightBadge">+</div>
        <div className="rightBadge">+</div>
        <div className="rightBadge">+</div>
      </div>
    </div>
  </div>
  <div className="rightImage">이미지</div>
</div> */}