import axios from 'axios'

export const clearSearchAction = searchTerm => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SEARCH_RESULTS',
            payload: null
        })

        dispatch({
            type: 'ERROR',
            payload: null
        })
    }
}


export const searchAction = (searchType, searchTerm) => {
	return async (dispatch, getState) => {
        if(searchTerm.length < 3){
            dispatch({
                type: 'SEARCH_RESULTS',
                payload: null
            })

            dispatch({
                type: 'ERROR',
                payload: null
            })
        } else {
            try {
                let res
                if(searchType === 'tag'){
                    res = await axios.get(`http://localhost:3001/api/search/entries?tag=${searchTerm}`)
                }

                else if (searchType === 'title'){
                    res = await axios.get(`http://localhost:3001/api/search/entries/title?title=${searchTerm}`)
                }

                else if (searchType === 'date'){

                    const m = searchTerm.month
                    const d = searchTerm.day
                    const y = searchTerm.year

                    if( m > 0 && d > 0 && y > 0 ){
                        console.log('-> searching for full date')
                        res = await axios.get(`http://localhost:3001/api/search/entries/date?year=${y}&month=${m}&day=${d} `)
                    }
                    else if( m === 0 && d === 0 && y > 0 ){
                        console.log('-> searching for year only')
                        res = await axios.get(`http://localhost:3001/api/search/entries/date?year=${y}`)
                    }
                }

                if(res.data.length > 0){
                    dispatch({
                        type: 'SEARCH_RESULTS',
                        payload: res.data
                    })

                    dispatch({
                        type: 'ERROR',
                        payload: null
                    })
                } else {
                    dispatch({
                        type: 'ERROR',
                        payload: 'no entries found'
                    })
                }

            }
            catch(error){
                console.log({error})

                dispatch({
                    type: 'ERROR',
                    payload: error.response? error.response.data.msg : error.message
                })
            }
        }

    }
}