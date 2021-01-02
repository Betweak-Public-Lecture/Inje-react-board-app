import React from 'react';
import {ListGroup, Form, Row, Col, Container, Button } from 'react-bootstrap';

export default function Comment(props){
  const {boardId, commentList, submitComment, deleteComment} = props;
  const [inputComment, setInputComment] = React.useState("");
  console.log(commentList)

  // 1. commentList를 반복해서 rendering
  // 2. 댓글 입력시 서버에 POST요청.
  // 3. 댓글 삭제시 서버에 DELETE요청.

  return(
    <>
      <div style={{width: '100%'}}>
        <Col>
          <div>
            {/* 댓글 입력창 */}
            <Form.Control type="text" value={inputComment} onChange={(e)=>{
              setInputComment(e.target.value);
            }} />
          </div>
          <Button style={{float: 'right'}} onClick={()=>{
            submitComment({content:inputComment});
            setInputComment("");
          }}>댓글</Button>
        </Col>
      </div>
      <div style={{width:'100%', paddingTop:50}}>
        <Col>
          <ListGroup>
            {commentList.map(comment=>{
              return (
              <ListGroup.Item>
                <div style={{float:'left'}}>
                  {comment.content}
                </div>
                <div style={{float:'right'}}>
                  <Button variant="danger" onClick={(e)=>{
                    deleteComment(comment.id)
                  }}>삭제</Button>
                </div>
              </ListGroup.Item>
              )
            })}
            
          </ListGroup>
        </Col>
      </div>
    </>
  )
}