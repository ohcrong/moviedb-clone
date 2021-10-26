import React, {useEffect} from 'react'
import Axios from 'axios'

function Favorite(props) {

    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    const movieId = props.movieId
    
    useEffect(() => {
        let variables = {
            userFrom,
            movieId
        }

        Axios.post('/api/favorite/favoriteCount', variables)
            .then(response => {
                console.log('favoriteData', response.data)
                if (response.data.success) {
                    
                } else {
                    alert('숫자 정보를 가져오는데 문제가 있습니다.')
                }
            })
    }, [])

    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
