import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

export default function WriteBoard(props){
  const [writeForm, setWriteForm] = React.useState({
    title: '',
    content: ''
  }) 
  const submitWriteForm = React.useCallback(function(writeForm){
    fetch('/api/board', {
      method: 'POST',
      headers:{
        'CONTENT-TYPE': 'application/json'
      },
      body: JSON.stringify(writeForm)
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if (data.status === 'Success'){
        alert("등록되었습니다.");
        props.history.push('/board');
      } else{
        alert(data.result);
      }
    })
  }, [])

  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h2>글 쓰기</h2>
        </Col>
      </Row>

      <Row style={{paddingTop: 60}}>
        <Col>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" placeholder="제목" value={writeForm.title} onChange={(e)=>{
              setWriteForm({
                ...writeForm,
                title: e.target.value
              })
            }} />
          </Form.Group>
          <Form.Group>
            <Form.Label>내용</Form.Label>
            <Form.Control type="text" as="textarea" rows="10" value={writeForm.content} onChange={(e)=>{
              setWriteForm({
                ...writeForm,
                content: e.target.value
              })
            }} />
          </Form.Group>
          <Button style={{float:'right'}} onClick={(e)=>{
            submitWriteForm(writeForm);
          }}>제출</Button>
        </Col>
      </Row>
    </Container>
  )
}