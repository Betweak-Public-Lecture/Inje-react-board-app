import React from 'react';
import {Container, Row, Col, Table, Button, Form} from 'react-bootstrap';

import {web3, smartContract} from '../lib/web3';

export default function CheckListWrite(props){
  const carNo = props.match.params.carId;
  // carNo, checkResult(answer to string), checkEtc
  const [checkList, setCheckList] = React.useState([
    {
      title: "시설이 청결합니까?",
      // YES: 1, NO: 0
      answer: -1
    }, {
      title: "안전벨트의 이상은 없습니까?",
      // YES: 1, NO: 0
      answer: -1
    }, {
      title: "타이어의 공기압은 32~34 사이입니까?",
      // YES: 1, NO: 0
      answer: -1
    }, {
      title: "소화기는 구비되어 있고, 이상은 없습니까?",
      // YES: 1, NO: 0
      answer: -1
    }, {
      title: "기름은 80% 이상 저장되어 있습니까?",
      // YES: 1, NO: 0
      answer: -1
    }
  ]);
  const [checkEtc, setCheckEtc] = React.useState("");

  // web3.eth.getAccounts().then(accounts=>{
  //   console.log(accounts);
  // })
  

  const submitCheckList = React.useCallback((checkList, checkEtc)=>{
    const checkResult = checkList.map(check=>{
      return check.answer;
    }).join(":");
    console.log(checkResult);

    // // server를 경유해서 transaction
    // fetch(`/api/bussafe/checklist`, {
    //   method: 'POST',
    //   headers: {
    //     'CONTENT-TYPE': 'application/json'
    //   }, 
    //   body: JSON.stringify({
    //     carNo: carNo,
    //     checkResult: checkResult,
    //     checkEtc: checkEtc
    //   })
    // }).then(response=>{
    //   return response.json();
    // }).then(data=>{
    //   if (data.status === 'Success'){
    //     console.log(data.result);
    //     alert(JSON.stringify(data.result));
    //     props.history.push('/car');
    //   } else{
    //     alert(data.result)
    //   }
    // })

    // Web3를 이용해 FrontEnd에서 SmartContract를 호출하라.
    web3.eth.getAccounts().then(accounts=>{
      const now = parseInt(Date.now());
      smartContract.methods.AddCheckList(carNo, checkResult, checkEtc, now).send({
        from: accounts[0],
        gas: "300000"
      }).then(result=>{
        console.log(result);
        alert(JSON.stringify(result));
        props.history.push('/car');
      }).catch(err=>{
        console.error(err);
        alert("network Error")
      })
      // ...
    })
    
    // smartContract

  }, [carNo])

  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h3>체크리스트</h3>
        </Col>
      </Row>

      <Row style={{paddingTop: 60}}>
        <Col>
          <Table striped bordered >
            <tbody>
              {checkList.map((check, idx)=>{
                return (
                  <tr>
                    <td>
                      Check {idx +1}
                    </td>
                    <td>
                      {check.title}
                    </td>
                    <td style={{textAlign:'center'}}>
                      <Form.Group>
                        <Form.Check inline type='radio' name={`check-${idx}`} id={`check-${idx}-yes`} label='YES' 
                                    onChange={(e)=>{
                                      console.log(checkList)
                                      const newCheckList = checkList.map((item, _idx)=>{
                                        if(idx === _idx){
                                          return {
                                            ...item,
                                            answer: 1
                                          }
                                        }
                                        return item
                                      });
                                      setCheckList(newCheckList)
                                    }} />
                        <Form.Check inline type='radio' name={`check-${idx}`} id={`check-${idx}-no`} label='NO'
                                    onChange={(e)=>{
                                      console.log(checkList)
                                      const newCheckList = checkList.map((item, _idx)=>{
                                        if(idx === _idx){
                                          return {
                                            ...item,
                                            answer: 0
                                          }
                                        }
                                        return item
                                      });
                                      setCheckList(newCheckList)
                                    }} />
                      </Form.Group>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Form.Group>
            {/* CheckEtc */}
            <Form.Control as="textarea" rows={7} placeholder="기타사항" onChange={(e)=>{
              setCheckEtc(e.target.value);
            }} value={checkEtc} />
          </Form.Group>

          <Button style={{float:'right'}} size="lg" onClick={()=>{
            submitCheckList(checkList, checkEtc);
          }} >제출</Button>
        </Col>
      </Row>
    </Container>
  )
}