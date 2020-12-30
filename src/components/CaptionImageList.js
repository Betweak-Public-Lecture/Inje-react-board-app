import React from 'react';
import CaptionImage from './CaptionImage'


export default class CaptionImageList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      captionList: [{
        imgUrl: 'https://pbs.twimg.com/profile_images/552851967026794496/w67YTKGZ.png',
        caption: "낙타"
      }, {
        imgUrl: 'https://newsimg.hankookilbo.com/cms/articlerelease/2019/04/29/201904291390027161_3.jpg',
        caption: "고양이"
      }, {
        imgUrl: 'https://img.etnews.com/photonews/1809/1109937_20180913110406_831_0001.jpg',
        caption: "트럭"
      }]
    }
  }
  
  render(){
    return (
      <div>
        {this.state.captionList.map((elem, idx)=>{
          return (
            <div onClick={()=>{
              const newCaptionList = this.state.captionList.filter((_elem, _idx)=>{
                if (idx === _idx){
                  return false
                } else{
                  return true
                }
              });
              this.setState({captionList: newCaptionList})
            }} >
             <CaptionImage imgUrl={elem.imgUrl} caption={elem.caption} />
            </div>
          )
        })}

      </div>
    )
  }
}