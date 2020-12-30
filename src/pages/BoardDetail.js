import React from 'react';
import {Container, Row, Col, Button, ButtonGroup} from 'react-bootstrap';


export default function BoarDetail(props){
  const {boardId} = props.match.params;
  const [boardInfo, setBoardInfo] = React.useState({
    id: '',
    title: '', 
    content: ''
  })

  React.useEffect(()=>{
    fetch(`/api/board/${boardId}`, {
      method: "GET"
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if(data.status === 'Success'){
        setBoardInfo(data.result)
      } else{
        alert(data.result)
      }
    })
  }, [])

  // 삭제 함수 구현.
  // ==> 삭제버튼 클릭시 삭제가 되도록 구현하시오.
  const deleteBoard = React.useCallback(()=>{
    if(window.confirm("정말 삭제하시겠습니까?")){
      fetch(`/api/board/${boardId}`, {
        method: "DELETE"
      }).then(response=>{
        return response.json();
      }).then(data=>{
        if (data.status === 'Success'){
          props.history.push('/board');
        } else{
          alert(data.result)
        }
      })
    }

  }, [boardId])

  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h2>글 상세보기</h2>
        </Col>
      </Row>
      <Row style={{paddingTop:30}}>
        <Col>
          <ButtonGroup style={{float:'right'}}>
            <Button variant="info" onClick={()=>{
              props.history.push(`/board/${boardId}/edit`);
            }}>수정</Button>
            <Button variant="danger" onClick={()=>{
              deleteBoard()
            }}>삭제</Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row style={{paddingTop: 60}}>
        <Col>
          <div>
            <h3>{boardInfo.title}</h3>
          </div>
          <div style={{padding:10, marginTop: 40, border:"1px solid #e9e9e9", minHeight:300}}>
            {boardInfo.content}
          </div>
        </Col>
      </Row>
    </Container>
  )
}