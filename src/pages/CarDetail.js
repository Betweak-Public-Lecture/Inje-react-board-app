import React from 'react';
import {Container, Row, Col, ButtonGroup, Button, Table} from 'react-bootstrap';

export default function CarDetail(props){
  const carId = props.match.params.carId;
  const [carInfo, setCarInfo] = React.useState({
    id: '',
    car_no: '',
    car_type: '',
    car_birth: ''
  });
  const [carCheckList, setCarCheckList] = React.useState([]);

  React.useEffect(()=>{
    fetch(`/api/bussafe/car/${carId}`, {
      method: 'GET',
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if (data.status === 'Success'){
        setCarInfo(data.result);
      }
    })
  }, [carId]);

  React.useEffect(()=>{
    fetch(`/api/bussafe/checklist/${carInfo.car_no}`, {
      method: 'GET'
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if(data.status === 'Success'){
        setCarCheckList(data.result)
      }
    })
  }, [carInfo])

  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h2>버스 상세페이지</h2>
        </Col>
      </Row>

      <Row style={{paddingTop: 30}}>
        <Col>
          <Button onClick={()=>{
            props.history.push(`/car/${carInfo.car_no}/checklistWrite`);
          }}>체크리스트 기록</Button>
        </Col>
      </Row>

      <Row style={{paddingTop: 60}}>
        <Col>
          <div>
            <h3>{carInfo.car_no}</h3>
          </div>
          <div style={{padding:10, marginTop: 40, border:"1px solid #e9e9e9", minHeight:300}}>
            <ul>
              <li>{carInfo.car_birth}</li>
              <li>{carInfo.car_type}</li>
            </ul>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>checker</th>
                <th>차No</th>
                <th>결과</th>
                <th>timestamp</th>
              </tr>
            </thead>
            <tbody>
              {carCheckList.map(elem=>{
                return (
                  <tr>
                    <td>{elem[0]}</td>
                    <td>{elem[1]}</td>
                    <td>{elem[2]}</td>
                    <td>{elem[3]}</td>
                  </tr>
                )
              })}

            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}