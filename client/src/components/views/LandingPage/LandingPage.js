import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import { FaCode } from "react-icons/fa";
import MainImage from '../LandingPage/Sections/MainImage'
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieimage, setMainMovieimage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
        
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            //setMovies(...[response.results]) -> 기존 Movies를 덮어 써짐
            setMovies([...Movies, ...response.results])
            setMainMovieimage(MainMovieimage || response.results[0])
            setCurrentPage(response.page)
        })
    }
    
    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`
        fetchMovies(endpoint)
    }

    return (
        <div style={{ width:'100%', margin:'0'}}>
            {/*main image*/}
            {MainMovieimage&&
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMovieimage.backdrop_path}`}
                title={MainMovieimage.original_title}
                text={MainMovieimage.overview}/>
            }    
            <div style={{ width: '85%', margin:'1rem auto'}}>
                <h2>Movies by Lastest</h2>
                <hr/>

                {/*movie grid card*/}
                <Row gutter={[16,16]}>
                    {Movies&& Movies.map((movie, index)=> (
                        <React.Fragment key={index}>
                            <GridCards
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}`: null}
                                movieId={movie.id}
                                movieName={movie.original_title} />
                        </React.Fragment>    
                    ))}
                    
                </Row>
            </div>

            <div style={{ display: 'flex', justifyContent:'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
