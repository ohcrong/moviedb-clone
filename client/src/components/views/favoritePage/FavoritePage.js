import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './favorite.css'
import { Button } from 'antd'

function Favoritepage() {

    const [Favorites, setFavorites] = useState([])
    
    useEffect(() => {

        Axios.post('/api/favorite/getFavored', { userFrom: localStorage.getItem('userId') })
        .then(response =>{
            if (response.data.success) {
                setFavorites(response.data.favorites)
            } else {
                alert('영화 정보를 가져오는데 실패했습니다.')
            }
        })
    }, [])

    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2>My Favorite Page</h2>
            <hr/>

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove</th>
                    </tr>
                </thead>

                <tbody>
                    {Favorites.map((favorite, index) => (
                        <tr key={index}>
                            <td>{favorite.movieTitle}</td>
                            <td>{favorite.movieRunTime} mins</td>
                            <td><Button>Remove</Button></td>
                        </tr>    
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Favoritepage
