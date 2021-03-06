import React, {useEffect, useState} from 'react';
import './style.scss';
import api from "../../services/api";
import {Col, Row} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import {useHistory} from "react-router-dom";
import * as qs from 'query-string';

export default function Home(props) {

  const [resultsData, setResultsData] = useState({})
  const [results, setResults] = useState([])
  let page = (props.location.search) ? qs.parse(props.location.search) : 1
  const [pagination, setPagination] = useState({
    offset: 1,
    data: [],
    elements: [],
    perPage: 10,
    currentPage: parseInt((page.page) ? --page.page : --page)
  })
  let {search} = props.match.params

  const history = useHistory();

  async function handlePageClick(data) {
    let selectedPage = data.selected;
    const offset = selectedPage * pagination.perPage;
    await setPagination(prevState => ({
      ...prevState,
      currentPage: selectedPage,
      offset: offset
    }))

    history.push({
      search: `?page=${++selectedPage}`,
    })
    setResults([])
  }

  useEffect(() => {
    // alert(props.route.isCategory)
    console.log(props.category)
    let page = pagination.currentPage
    api.get(`/?s=${search}&apikey=${api.defaults.apikey}&page=${++page}`)
      .then(response => {
        setResultsData(response.data)
        setResults(response.data.Search)
      })
      .catch(err => {
        history.push('/404')
        console.log(err)
      })


  }, [pagination.currentPage])

  return (

    <div className="container">
      <Row>
        <Col>
          <h2 className="subtitle">RESULTADOS DA PESQUISA PARA "{search}"</h2>
          <small>{(resultsData.totalResults) ? resultsData.totalResults+ ' resultados' : ''}</small>
          {/*{(props.category) ? 'true' : 'false'}*/}
        </Col>
      </Row>
      <Row className="mt-3">
        {(results !== undefined && results.length) ? results.map(result => (
          <Col key={result.imdbID} xs={6} md={4} lg={3}>
            <a className="clean-link" href={'/title/' + result.imdbID}>
              <div className="film-card-blur">
                <div className="square">
                  <div className="square-blur"
                       style={{backgroundImage: 'url(' + ((result.Poster !== "N/A") ? result.Poster : "https://advancepetproduct.com/wp-content/uploads/2019/04/no-image.png") + ')'}}></div>

                  <img
                    src={(result.Poster !== "N/A") ? result.Poster : 'https://advancepetproduct.com/wp-content/uploads/2019/04/no-image.png'}
                    className="p-3"/>

                </div>
                <h4>{result.Year.replace(/(.*?–.*?)–.*/g, ' ')} - {(result.type == 'movie' ? 'Filme' : 'Série')}</h4>
                <h3>{result.Title}</h3>
              </div>
            </a>

          </Col>
        )) : (resultsData.Response === "False" && resultsData.Error) ?
          <Col>
            <Col className="mt-4"><h1>Nada encontrado :(</h1> <h3>Tente buscar novamente, só que com outras
              palavras-chave</h3></Col>
          </Col>
          :
          <Col className="loading-text">
            <h4>Carregando...</h4>
          </Col>
        }
      </Row>
      <Row>
        <Col className="mt-5 mb-5 pagination-center">
          {(results !== undefined && results.length) ? (
            <ReactPaginate
              previousLabel={"← Anterior"}
              nextLabel={"Próximo →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={(resultsData.totalResults / 10.0 > parseInt(resultsData.totalResults / 10)) ? parseInt(resultsData.totalResults / 10) + 1 : parseInt(resultsData.totalResults / 10)}
              onPageChange={handlePageClick}
              forcePage={pagination.currentPage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          ) : ''}
        </Col>
      </Row>
    </div>
  )

}
