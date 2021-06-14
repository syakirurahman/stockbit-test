import AppAlert from 'components/AppAlert'
import AppLoader from 'components/AppLoader'
import React, { useState, useEffect } from 'react'
import MovieService from 'services/MovieService'
import './style.scss'

export default function MovieDetail({ match }) {
  const { id } = match.params;

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [alert, setAlert] = useState({ isActive: false, type: null, message: "" })

  useEffect(() => {
    MovieService.getDetail(id)
      .then(res => {
        if(res["Error"]) {
          setAlert({ isActive: true, type: "error", message: res["Error"] });
          setTimeout(() => {
            setAlert({ isActive: false, type: null, message: "" });
          }, 2000)
        } else {
          setMovie(res);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [id]);

  return (
    <div className="movie-detail">
      <div className="movie-overview">
        <div className="movie-poster"><img src={movie["Poster"]} width="100%" alt={movie["Title"]}/></div>
        <div className="movie-metadata">
          <h2 className="movie-title">{ movie["Title"] + " (" + movie["Year"] + ")"}</h2>
          <table borderless="true">
            <tbody>
              <tr>
                <th>Genre</th>
                <td>{ movie["Genre"] }</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{ movie["Type"] }</td>
              </tr>
              <tr>
                <th>Language</th>
                <td>{ movie["Language"] }</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{ movie["Country"] }</td>
              </tr>
              <tr>
                <th>Actors</th>
                <td>{ movie["Actors"] }</td>
              </tr>
              <tr>
                <th>Release Date</th>
                <td>{ movie["Released"] }</td>
              </tr>
              <tr>
                <th>Duration</th>
                <td>{ movie["Runtime"] }</td>
              </tr>
              <tr>
                <th>Production</th>
                <td>{ movie["Production"] }</td>
              </tr>
              <tr>
                <th>IMDB Rating</th>
                <td>{ movie["imdbRating"] }</td>
              </tr>
              {
                movie["Ratings"] && movie["Ratings"].map((rating, i) =>
                  (
                    <tr key={i}>
                      <th>{ rating["Source"] }</th>
                      <td>{ rating["Value"] }</td>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="movie-plot">
        { movie["Plot"]}
      </div>
      
      <AppLoader isActive={isLoading} type="screen"/>
      <AppAlert isActive={alert.isActive} type={alert.type} message={alert.message}/>
    </div>
  )
}
