import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import Favorite from '../movieDetail/Sections/Favorite'
import { Row } from 'antd'


function MovieDetail(props) {

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    let movieId = props.match.params.movieId

    useEffect(() => {
        //console.log(props.match)
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log('responseMovieInfo',response)
                setMovie(response)
            })
        
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('responseCast',response)
                setCasts(response.cast)
            })    
    }, [])

    const loadMoreActors = ()=> {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/*Header */}
            {Movie.backdrop_path&&
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }
            <div>
                {/*Body */}
                <div style={{width:'85%', margin:'1rem auto'}}>

                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                    </div>
                    
                    {/*Movie Info */}
                    <MovieInfo 
                        movie ={Movie}
                    />

                    <br/>

                    {/*Actors Grid */}
                    <div style={{display:'flex', justifyContent:'center', margin:'2rem'}} >
                        <button onClick={loadMoreActors}>View Actors</button>
                    </div>    

                    {ActorToggle && 
                        <Row gutter={[16,16]}>
                            {Casts&& Casts.map((cast, index)=> (
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={cast.profile_path ?
                                            `${IMAGE_BASE_URL}w500${cast.profile_path}`: null}
                                        actorName={cast.name} />
                                </React.Fragment>    
                            ))}
                        </Row>
                    }
                        
                    

                </div>
            </div>
            
        </div>
    )
}

export default MovieDetail
