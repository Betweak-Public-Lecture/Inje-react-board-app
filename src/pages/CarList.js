import React from 'react';
import {Container, Row, Col, Button, ListGroup} from 'react-bootstrap'

export default function CarList(props){
  const [carList, setCarList] = React.useState([]);
  React.useEffect(()=>{
    fetch('/api/bussafe/car', {
      method: 'GET',
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if(data.status === 'Success'){
        setCarList(data.result)
      } else{
        alert(data.result);
      }
    })
  }, [])
   return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h2 style={{float:'left'}}>차량 목록</h2>
          <Button style={{float:'right'}} onClick={()=>{
            props.history.push('/car/create');
          }}>차량 등록</Button>
        </Col>

      </Row>
      <Row style={{paddingTop:60}}>
        <Col>
          <ListGroup>
            {carList.map(car=>{
              return (
                <ListGroup.Item onClick={(e)=>{
                  props.history.push(`/car/${car.id}`);
                }}>
                  {car.car_no}
                </ListGroup.Item>
              )
            })}
            {/* {boardList.map(board=>{

              return(
                <ListGroup.Item onClick={(e)=>{
                  props.history.push(`/car/${board.id}`);
                }}>{board.title}</ListGroup.Item>
              )
            })} */}
            
          </ListGroup>
        </Col>
      </Row>
      
    </Container>
  )
}