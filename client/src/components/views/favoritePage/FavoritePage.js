import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './favorite.css'
import { Popover, Button } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'

function Favoritepage() {

    const [Favorites, setFavorites] = useState([])
    
    useEffect(() => {

        fetchfavoredMovies()
    }, [])
    
    const fetchfavoredMovies = () => {
        Axios.post('/api/favorite/getFavored', { userFrom: localStorage.getItem('userId') })
        .then(response =>{
            if (response.data.success) {
                setFavorites(response.data.favorites)
            } else {
                alert('영화 정보를 가져오는데 실패했습니다.')
            }
        })
    }

    const onClickRemoveButton = (movieId, userFrom) => {
        Axios.post('/api/favorite/removeFromFavorite', {movieId: movieId, userFrom: userFrom})
        .then(response => {
            if (response.data.success) {
                fetchfavoredMovies()
            } else {
                alert('리스트에서 삭제하는데 실패했습니다.')
            }
        })
    }

    const renderCards = Favorites.map((favorite, index) => {    

        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"
                }
            </div>
        )
        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><Button onClick={() => onClickRemoveButton(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
        </tr>    
    })


    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2>My Favorite Page</h2>
            <hr/>

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove From List</th>
                    </tr>
                </thead>

                <tbody>
                    {renderCards}
                </tbody>

            </table>
        </div>
    )
}

export default Favoritepage
