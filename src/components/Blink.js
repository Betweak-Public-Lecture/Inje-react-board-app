import React from 'react';

export default class Blink extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      showText: false
    }

    // setInterval(function(함수), ms)
    setInterval(()=>{
      this.setState({showText: !this.state.showText})
    }, 2000)
  }
  
  render(){
    let display = '';
    if(this.state.showText){
      display=this.props.text;
    } 
    return (
      <div style={{fontSize:30, textAlign:'center'}}>
        {display}
      </div>
    )
  }
}