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
                    console.log(searchTerm)
                    const m = parseInt(searchTerm.month)
                    const d = parseInt(searchTerm.day)
                    const y = parseInt(searchTerm.year)

                    console.log(m, d, y)

                    if( isNaN(m) && isNaN(d) && !isNaN(y) ){
                        console.log('looking for year only')
                        res = await axios.get(`http://localhost:3001/api/search/entries/date?year=${y}`)
                    }
                    else if( !isNaN(m) && !isNaN(d) && !isNaN(y)){
                        console.log('not only year')
                        res = await axios.get(`http://localhost:3001/api/search/entries/date?year=${y}&month=${m}&day=${d} `)
                    }
                }

                if(res){
                    dispatch({
                        type: 'SEARCH_RESULTS',
                        payload: res.data
                    })

                    dispatch({
                        type: 'ERROR',
                        payload: null
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