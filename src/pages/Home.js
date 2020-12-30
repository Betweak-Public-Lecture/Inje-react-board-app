import React from 'react';
import {Carousel, Container} from 'react-bootstrap'

export default function Home(props){
  console.log(props);
  return (
    <Container fluid>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.crowdpic.net/list-thumb/thumb_l_2FE71B91E295D41C0F62B9AD4E26445A.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.crowdpic.net/list-thumb/thumb_l_2FE71B91E295D41C0F62B9AD4E26445A.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.crowdpic.net/list-thumb/thumb_l_2FE71B91E295D41C0F62B9AD4E26445A.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  )
}