import React, {useEffect, useState} from 'react';
import './style.scss';

import {Row, Col} from 'react-bootstrap';
import api from "../../services/api";
import {useHistory} from "react-router-dom";

export default function Title(props) {
  let {title} = props.match.params
  const [movie, setMovie] = useState([])
  const history = useHistory();

  useEffect(() => {
    api.get(`/?i=${title}&apikey=${api.defaults.apikey}`)
      .then(response => {
        setMovie(response.data)
        if (!response.data.Title) {
          history.push('/404')
        }
      })
      .catch(err => {
        history.push('/404')
        console.log(err)
      })
  }, [])

  function handleLike(data) {
    let a = [];
    a = JSON.parse(localStorage.getItem('session')) || [];
    a.push(data);
    alert(a);
    localStorage.setItem('likes', JSON.stringify(a));
  }

  return (

    <>
      {(movie !== undefined && movie.Title) ?
        <>
          <div className="square">
            <div className="container-fluid hero-title"
                 style={{backgroundImage: 'url(' + ((movie.Poster !== "N/A") ? movie.Poster : "https://advancepetproduct.com/wp-content/uploads/2019/04/no-image.png") + ')'}}></div>
            <div className="container title-movie">
              <Row>
                <Col xs={11} md={{offset: 5}} lg={{span: 8, offset: 4}} className="mb-4">

                  <h3>{movie.Year} {(movie.Runtime !== 'N/A') ? ' - ' + movie.Runtime : ''}</h3>
                  <h1>{movie.Title}</h1>
                  <h3 className="mt-2"><span
                    className="rating">{(movie.imdbRating !== 'N/A') ? movie.imdbRating : 'Sem Avaliação'}</span>&nbsp; {(movie.Runtime !== 'N/A') ? movie.imdbVotes + ' votos ' : ''}
                  </h3>
                </Col>
              </Row>
            </div>
          </div>

          <div className="container">

            <Row>
              <Col xs={12} md={5} lg={4}>
                <p><img alt={movie.Title}
                        src={(movie.Poster !== "N/A") ? movie.Poster : 'https://advancepetproduct.com/wp-content/uploads/2019/04/no-image.png'}
                        className="w-100 image-movie"/></p>
              </Col>
              <Col className="info-movie">
                <p className="mt-2 mb-2 plot">{(movie.Plot !== "N/A") ? movie.Plot : 'Sinopse não informada'}</p>
                <p><strong>Classificação Indicativa:</strong> {(movie.Rated !== "N/A") ? movie.Rated : 'Não Informada'}
                </p>
                <hr/>
                <h4>Informações</h4>
                <p><strong>Lançamento:</strong> {(movie.Released !== "N/A") ? movie.Released : 'Não Informado'}</p>
                <p><strong>Gêneros:</strong> &nbsp;
                  {(movie.Genre !== undefined && movie.Genre.length) ? ((movie.Genre).split(',')).map((result, index) => (
                    <span className="genres" key={result}>{(index === 0) ? '' : ','}{result}</span>
                  )) : 'Não Informado'}
                </p>
                <p><strong>Diretor: </strong>{movie.Director}</p>
                <p><strong>Escritor(es):</strong> {(movie.Writer !== "N/A") ? movie.Writer : 'Não Informado'}</p>
                <p><strong>Ator/Atriz: </strong>{(movie.Actors !== "N/A") ? movie.Actors : 'Não Informado'}</p>
                <p><strong>Idiomas: </strong>{movie.Language}</p>
                <p><strong>País: </strong>{movie.Country}</p>
                <p><strong>Premiações: </strong>{(movie.Awards !== "N/A") ? movie.Awards : 'Não Informado'}</p>
                {/*<p>{movie.Ratings}</p>*/}
                <br/>
                <p><strong>{(movie.Type == 'movie') ? 'Filme' : 'Série'}</strong></p>
                <p><strong>Lançamento do DVD:</strong> {(movie.DVD !== "N/A") ? movie.DVD : 'Não Informado'}</p>

                <p><strong>Produzido por:</strong> {(movie.Production !== "N/A") ? movie.Production : 'Não Informado'}
                </p>
                <p><strong>Site do Filme:</strong> {(movie.Website !== "N/A") ? movie.Website : 'Não Informado'}</p>
                <p className="mt-2 mb-2"><strong>Bilheteria:</strong> {(movie.BoxOffice !== "N/A") ?
                  <span className="money">{movie.BoxOffice}</span> : 'Não Informado'}</p>

                <p className="mb-2"><strong>Avaliações:</strong></p>
                <Row>
                  {(movie.Ratings !== undefined && movie.Ratings.length) ? ((movie.Ratings)).map((result, index) => (
                    <Col className="genres mb-3" key={result.Source}>
                      <p>{result.Source}</p>
                      <h3>{result.Value}</h3></Col>
                  )) : <p>Não Informado</p>}
                </Row>
              </Col>
            </Row>
          </div>
        </> :
        <Col className="loading-text">
          <h4>Carregando...</h4>
        </Col>
      }
    </>
  );
}
