import React, {useEffect} from 'react';
import './style.scss';
import popcorn from '../../assets/404.svg';
import { Row, Col} from 'react-bootstrap';
import api from "../../services/api";
import {Link} from "react-router-dom";

export default function NotFound(props) {
  useEffect(() => {
    api.get('')
  }, [])

  let {title} = props.match.params

  return (
    <section className="container mt-5">
      <Row className="justify-content-center align-items-center message-holder">
        <Col xs={12} md={6}>
          <p><img alt="spilled-popcorn" src={popcorn} className="popcorn"/> </p>
          <h1 className="big-404">404</h1>
          <h2>Ops, parece que esta página não existe</h2>
          <p className="go-home">
            <Link to="/" className="go-home">Voltar ao Início</Link>
          </p>

        </Col>
      </Row>

    </section>

  );
}
