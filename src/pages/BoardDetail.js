import React from 'react';
import {Container, Row, Col, Button, ButtonGroup} from 'react-bootstrap';

import Comment from '../components/Comment';


export default function BoarDetail(props){
  const {boardId} = props.match.params;
  const [boardInfo, setBoardInfo] = React.useState({
    id: '',
    title: '', 
    content: ''
  })
  const [boardCommentList, setBoardCommentList] = React.useState([])
  const [reqCount, setReqCount] = React.useState(0);

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

  React.useEffect(()=>{
    fetch(`/api/board/${boardId}/comment`, {
      method: "GET",
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if(data.status === 'Success'){
        setBoardCommentList(data.result);
      } else{
        alert(data.result);
      }
    })
  }, [reqCount])

  // 1. Comment POST요청 함수만들기
  const submitComment = React.useCallback((commentContent)=>{
    fetch(`/api/board/${boardId}/comment`, {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json"
      },
      body: JSON.stringify(commentContent)
    }).then(response=>{
      return response.json()
    }).then(data=>{
      if(data.status === 'Success'){
        setReqCount(reqCount+1)
      } else{
        alert(data.result);
      }
    })
  }, [boardId, reqCount])
  // 2. Comment 컴포넌트에 함수 전달하기(PROPS)
  // 3. Comment 컴포넌트에서 함수 받아서 사용하기.


  // --------------------------------------------------
  // - Comment 삭제 함수 만드시고, 기능을 구현하세요.
  const deleteComment = React.useCallback((commentId)=>{
    if(! window.confirm("정말 삭제하시겠습니까?")){
      return 
    }
    fetch(`/api/board/comment/${commentId}`, {
      method: 'DELETE'
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if(data.status === 'Success'){
        setReqCount(reqCount+1)
      } else{
        alert(data.result)
      }
    })
  }, [reqCount])
  



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
      
      <Row style={{paddingTop: 40}}>
        <Comment boardId={boardId} commentList={boardCommentList} submitComment={submitComment} deleteComment={deleteComment} />
      </Row>

    </Container>
  )
}