import React, {useEffect} from 'react';
import './style.scss';
import {Row, Col} from 'react-bootstrap';

export default function Title(props)  {
  useEffect(() => {}, [])

  let {title} = props.match.params

  return (
    <div className="container">
      <Row>
        <Col>
          <h1>{props.match.params.title}</h1>
        </Col>
      </Row>
    </div>
  );
}
