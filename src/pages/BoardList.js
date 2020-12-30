import React from 'react';
import {Container, Row, Col, ListGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function BoardList(props){
  const [boardList, setBoardList] = React.useState([]);
  React.useEffect(()=>{
    fetch('/api/board', {
      method: 'GET'
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if (data.status === 'Error'){
        alert(data.result)
      } else{
        setBoardList(data.result);
      }
    })
  }, [])
  // 요구사항: 게시물 클릭시 게시물 상세페이지(BoardDetail)로 이동.
  // [2가지 방법]
  // 방법1. <Link/> Component 이용
  // 방법2. histroy 객체 사용

  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h2 style={{float:'left'}}>게시판 목록</h2>
          <Button style={{float:'right'}} onClick={()=>{
            props.history.push('/board/write');
          }}>글 쓰기</Button>
        </Col>

      </Row>
      <Row style={{paddingTop:60}}>
        <Col>
          <ListGroup>
            {boardList.map(board=>{
              // 방법1.
              // return (
              //   <Link to={`/board/${board.id}`}>
              //     <ListGroup.Item>{board.title}</ListGroup.Item>
              //   </Link>
              // )
              // 방법2. hitory객체 사용.
              return(
                <ListGroup.Item onClick={(e)=>{
                  props.history.push(`/board/${board.id}`);
                }}>{board.title}</ListGroup.Item>
              )
            })}
            
          </ListGroup>
        </Col>
      </Row>
      
    </Container>
  )
}