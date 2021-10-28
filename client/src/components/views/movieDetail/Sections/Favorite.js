import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function Favorite(props) {

    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    const movieId = props.movieId

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    
    useEffect(() => {
        let variables = {
            userFrom,
            movieId
        }

        Axios.post('/api/favorite/favoriteCount', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteCount)
                    console.log('favoriteData', response.data)
                } else {
                    alert('숫자 정보를 가져오는데 문제가 있습니다.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                    console.log('favorited', response.data)
                } else {
                    alert('정보를 가져오는데 문제가 있습니다.')
                }
            }) 

    }, [])

    return (
        <div>
            <button> {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber} </button>
        </div>
    )
}

export default Favorite
