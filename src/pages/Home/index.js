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
        api.get(`?apikey=${api.defaults.apikey}&i=tt2975590`),
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
      <section>
        <div className="hero-container container-all">
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
          <Row className="mt-3">
            {(movies !== undefined && movies.length) ? movies.map(result => (
              <Col key={result.imdbID} xs={12} sm={6} md={4} lg>
                <a className="clean-link" href={'/title/' + result.imdbID}>
                  <div className="film-card">
                    <p>
                      <span className="note-badge">{result.imdbRating}</span>
                      <img
                        src={(result.Poster !== "N/A") ? result.Poster : 'https://advancepetproduct.com/wp-content/uploads/2019/04/no-image.png'}
                        />
                    </p>
                    <h4>{result.Year.replace(/(.*?–.*?)–.*/g, ' ')} - {(result.Type == 'movie' ? 'Filme' : 'Série')}</h4>
                    <h3>{result.Title}</h3>
                  </div>
                </a>
              </Col>
            )) : ''}
          </Row>
        </section>
      </section>
    </>
  )
}
