import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import axios from 'axios'

import './styles.scss'
import api from "../../services/api";

export default function Home() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState('');
  const history = useHistory()

  function handleSearch(e) {
    e.preventDefault();

    history.push({
      pathname: `search/${search}`
    })
  }

  useEffect(() => {
    const response = axios
      .all([
        api.get(`?apikey=${api.defaults.apikey}&i=tt6751668`),
        api.get(`?apikey=${api.defaults.apikey}&i=tt0240772`),
        api.get(`?apikey=${api.defaults.apikey}&i=tt8579674`),
        api.get(`?apikey=${api.defaults.apikey}&i=tt3281548`),
        api.get(`?apikey=${api.defaults.apikey}&i=tt4154796`)
      ])
      .then(response => {
        return response.map(movie =>
          setMovies(oldArray => [...oldArray, movie.data]));
      })
      .catch(error => {
        return error.response.data;
      });
  }, [])

  return (
    <>
      <div className="hero-bg"></div>
      <section className="container-all">
        <div className="hero-container">
          <div className="text-holder">
            <h1>O que quer assistir hoje?</h1>
            <h3>Encontre classificações e críticas dos mais recentes filmes e programas de TV.</h3>
          </div>
          <form onSubmit={handleSearch} className="search-holder">
            <div className="input-group">
              <input placeholder="Busque informações sobre filmes, TV e celebridades" className="input"
                     onChange={e => setSearch(e.target.value)} type="text"/>
              <div className="input-group-append">
                <div className="input-group-button">
                  <button type="submit">BUSCAR</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <section className="container editors-container">
          <Row>
            <Col>
              <h2 className="subtitle">ESCOLHA DO EDITOR</h2>
            </Col>
          </Row>
          <Row className="">
            <Col xs={12} sm={6} md={4} lg>
              <div className="film-card">
                <p>
                  <span className="note-badge">9.3</span>
                  <img
                    src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"/>
                </p>
                <h4>2010 - Ação/Suspense</h4>
                <h3>A Origem</h3>
              </div>
            </Col>
          </Row>
        </section>
      </section>
    </>
  )
}
