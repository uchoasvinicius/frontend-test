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
      })
      .catch(err => {
        history.push('/404')
        console.log(err)
      })


  }, [])


  return (
    <>
      <div className="square">
        <div className="container-fluid hero-title"
             style={{backgroundImage: 'url(' + ((movie.Poster !== "N/A") ? movie.Poster : "https://advancepetproduct.com/wp-content/uploads/2019/04/no-image.png") + ')'}}></div>
        <div className="container title-movie">
          <Row>
              <Col xs={10} md={{offset: 5}} lg={{span: 12, offset: 4}}  className="mb-4">
              <h3>{movie.Year} {(movie.Runtime !== 'N/A') ? ' - '+ movie.Runtime : ''}</h3>
              <h1>{movie.Title}</h1>
              <h3 className="mt-2"><span className="rating">{movie.imdbRating}</span>&nbsp; {(movie.Runtime !== 'N/A') ? movie.imdbVotes + ' votos ' : ''}</h3>
            </Col>
          </Row>
        </div>
      </div>

      <div className="container">
        <Row>
          <Col xs={12} md={5} lg={4}>
            <p><img alt={movie.Title} src={movie.Poster} className="w-100 image-movie"/></p>
          </Col>
          <Col className="info-movie">



            <p className="mt-2 mb-2 plot">{movie.Plot}</p>
            <p><strong>Classificação Indicativa:</strong> {movie.Rated}</p>
            <hr/>
            <h4>Informações</h4>
            <p><strong>Lançamento:</strong> {movie.Released}</p>
            <p><strong>Gêneros:</strong> &nbsp;
              {(movie.Genre !== undefined && movie.Genre.length) ? ((movie.Genre).split(',')).map((result, index) => (
                <a className="genres" href={'/categories/'+result} key={result}>{(index===0) ? '' : ','}{result}</a>

              )) : 'Não Informado'}
            </p>
            <p><strong>Diretor: </strong>{movie.Director}</p>
            <p><strong>Escritor(es):</strong> {movie.Writer}</p>
            <p><strong>Ator/Atriz: </strong>{movie.Actors}</p>
            <p><strong>Idiomas: </strong>{movie.Language}</p>
            <p><strong>País: </strong>{movie.Country}</p>
            <p><strong>Premiações: </strong>{movie.Awards}</p>
            {/*<p>{movie.Ratings}</p>*/}
            <br/>
            <p><strong>{(movie.Type) ? 'Filme' : 'Série'}</strong></p>
            <p><strong>Lançamento do DVD:</strong> {movie.DVD}</p>

            <p><strong>Produzido por:</strong>  {movie.Production}</p>
            <p><strong>Site do Filme:</strong> {movie.Website}</p>
            <p className="mt-2 mb-2">Bilheteria: <span className="money">{movie.BoxOffice}</span></p>
          </Col>
        </Row>
      </div>
    </>
  );
}
