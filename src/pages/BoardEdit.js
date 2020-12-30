import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';


export default function BoardEdit(props){
  const {boardId} = props.match.params;
  const [editForm, setEditForm] = React.useState({
    title: '', 
    content:''
  });

  React.useEffect(()=>{
    fetch(`/api/board/${boardId}`, {
      method: "GET"
    }).then(response => {
      return response.json();
    }).then(data=>{
      if (data.status==='Success'){
        setEditForm(data.result)
      } else{
        alert(data.result);
      }
    })
  }, [])

  // fetch (수정 구현하기 - PUT 메소드로 요청 보내기)
  const submitEditForm = React.useCallback((editForm)=>{
    fetch(`/api/board/${boardId}`, {
      method: "PUT",
      headers:{
        'CONTENT-TYPE': 'application/json'
      },
      body: JSON.stringify(editForm)
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if (data.status === 'Success'){
        alert("수정이 완료 되었습니다.")
        props.history.push(`/board/${boardId}`);
      } else{
        alert(data.result);
      }
    })
  }, [])


  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h2>글 수정</h2>
        </Col>
      </Row>

      <Row style={{paddingTop: 60}}>
        <Col>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" placeholder="제목" value={editForm.title} onChange={(e)=>{
              setEditForm({
                ...editForm,
                title: e.target.value
              })
            }} />
          </Form.Group>
          <Form.Group>
            <Form.Label>내용</Form.Label>
            <Form.Control type="text" as="textarea" rows="10" value={editForm.content} onChange={(e)=>{
              setEditForm({
                ...editForm,
                content: e.target.value
              })
            }} />
          </Form.Group>
          <Button style={{float:'right'}} onClick={(e)=>{
            submitEditForm(editForm);
          }}>제출</Button>
        </Col>
      </Row>
    </Container>
  )
}