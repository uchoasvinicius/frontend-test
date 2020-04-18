import React from 'react';
import {Row, Col} from 'react-bootstrap';

import './style.scss'

export default function Footer() {
  return (
    <footer className="w-100 footer">
      <div className="container">
        <Row><Col>
          <p className="mt-4 mb-4">{new Date().getFullYear()} · Vinícius Uchôas - Movie Grabber</p>
        </Col></Row>
      </div>

    </footer>
  );
}
