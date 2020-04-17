import React, {useEffect, useState} from 'react';
import './style.scss';
import api from "../../services/api";
import {Col, Row} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";

export default function Home(props) {

  const [resultsData, setResultsData] = useState([])
  const [results, setResults] = useState([])
  const [pagination, setPagination] = useState({
    offset: 1,
    data: [],
    elements: [],
    perPage: 10,
    currentPage: 2
  })

  let {search} = props.match.params
  // let [results, setResults] = useState([]);
  // let [resultsData, setresultsData] = useState([]);
  // let [paginationData, setPaginationData] = useState([{
  //   offset: 0,
  //   data: [],
  //   elements: [],
  //   perPage: 10,
  //   currentPage: 0,
  // }]);
  function setElementsForCurrentPage(currentPage) {
    // let elements = pagination
    //   .slice(pagination.offset, pagination.offset + pagination.perPage)
    //   .map(post =>
    //     (<img src="{post.thumburl}"/>)
    //   );
    //
    // setPagination(prevState => ({
    //
    //   ...prevState,           // copy all other key-value pairs of food object
    //   elements: elements
    //
    // }))
  }

  async function handlePageClick(data) {
    console.log(data.selected)
    const selectedPage = data.selected;
    const offset = selectedPage * pagination.perPage;
    await setPagination(prevState => ({
      ...prevState,
      currentPage: selectedPage,
      offset: offset
    }))

    props.location.page = data.selected
    setElementsForCurrentPage(data.selected);

  }

  useEffect(() => {

    api.get(`/?s=${search}&apikey=${api.defaults.apikey}&page=${pagination.currentPage+1}`)
      .then(response => {
        setResultsData(response.data)
        setResults(response.data.Search)
      })
      .catch(err => {
        console.log(err)
      })
  }, [pagination.currentPage])

  return (

    <div className="container">
      <Row>
        <Col>
          <h2 className="subtitle">RESULTADOS DA PESQUISA PARA "{search}"</h2>
          <small>{resultsData.totalResults} resultados</small>
        </Col>
      </Row>
      <Row className="mt-3">
        {(results.length) ? results.map(result => (
          <Col key={result.imdbID} xs={12} sm={6} md={4} lg={3}>
            <a className="clean-link" href={'/title/' + result.imdbID}>
              <div className="film-card">
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
        )) : 'Carregando...'}
        {/*<Col>*/}
        {/*  <ul>{results.map(result => (*/}
        {/*    <li key={result.imdbID}>*/}
        {/*      <pre>{JSON.stringify(result)}</pre>*/}
        {/*    </li>*/}
        {/*  ))}</ul>*/}
        {/*</Col>*/}
      </Row>
      <Row>
        <Col>
          <ReactPaginate
            previousLabel={"← Anterior"}
            nextLabel={"Próximo →"}
            breakLabel={<span className="gap">...</span>}
            pageCount={pagination.pageCount}
            onPageChange={handlePageClick}
            forcePage={pagination.currentPage}
            containerClassName={"pagination"}
            previousLinkClassName={"previous_page"}
            nextLinkClassName={"next_page"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        </Col>
      </Row>
    </div>
  )

}
