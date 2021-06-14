import React, { useState } from 'react'
import AppAlert from 'components/AppAlert'
import AppLoader from 'components/AppLoader'
import AppPopup from 'components/AppPopup'
import MovieService from '../../../services/MovieService'
import { Link } from 'react-router-dom'
import './style.scss'

export default function Movies({ match }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultTotal, setSearchResultTotal] = useState(0);
  const [isMoreData, setIsMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const [moviePopup, setMoviePopup] = useState({ isActive: false, movie: {}})
  const [alert, setAlert] = useState({ isActive: false, type: null, message: "" })

  const search = (e) => {
    e.preventDefault();
    setPage(1);
    setIsMoreData(true)
    setSearchResult([]);
    setSearchResultTotal(0);
    loadMovies(1);
  }

  const loadMovies = (page) => {
    setSearchLoader(true);
    MovieService.search(searchQuery, page)
      .then(res => {
        if(res["Search"]) {
          const newPage = page + 1;
          let newSearchResult;
          if(page===1) {
            newSearchResult = res["Search"];
          } else {
            newSearchResult = searchResult.concat(res["Search"]);
          }
          setSearchResult(newSearchResult);
          setSearchResultTotal(res["totalResults"]);
          setPage(newPage);
          if(res["Search"].length===0 || newSearchResult.length === parseInt(res["totalResults"])) setIsMoreData(false);
        } else if(res["Error"]) {
          setAlert({ isActive: true, type: "error", message: res["Error"]});
          setTimeout(() => {
            setAlert({ isActive: false, type: null, message: "" });
          }, 2000)
          if(res["Error"] === "Movie not found!") {
            setIsMoreData(false);
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setSearchLoader(false);
      })
  }

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if(isMoreData) {
        loadMovies(page);
      }
    }
  }
  return (
    <div className="movies">
      <div className="search-box">
        <form onSubmit={search}>
          <input type="text" placeholder="Search movies" className="form-control" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        </form>
      </div>
      <AppLoader isActive={searchLoader} type="screen"/>
      <AppAlert isActive={alert.isActive} type={alert.type} message={alert.message}/>
      {
        searchResult.length > 1 &&
        <div style={{fontSize: '12px', marginTop: '10px'}}>
          <p>Showing <strong>{ searchResult.length }</strong> of <strong>{ searchResultTotal } total results</strong></p>
          <p>OMDB API doesn't provide param for item perpage. So, the movies per page/scroll are fixed (10 item).</p>
        </div>

      }
      <div className="movie-grid">
        {
          searchResult.map((movie, i) =>
            (<div className="movie" key={i}>
              <img className="poster" onClick={() => { setMoviePopup({ isActive: true, movie })}} src={movie["Poster"]} alt={movie["Title"]}/> 
              <Link to={ match.path+"/movie/"+movie["imdbID"] } className="movie-title">
                { ("("+ movie["Year"] +") "+movie["Title"]).substring(0, 60) + (("("+ movie["Year"] +") "+movie["Title"]).length > 60 ? '...' : '') }
              </Link>
            </div>)
          )
        }
      </div>
      {!isMoreData ? <div className="text-center">Mo more movies</div> : "" }  
      <AppPopup isActive={moviePopup.isActive} onClose={() => setMoviePopup({isActive: false, movie: {}})}>
        <img src={moviePopup.movie["Poster"]} alt={moviePopup.movie["Title"]}/>
      </AppPopup>
    </div>
  )
}
