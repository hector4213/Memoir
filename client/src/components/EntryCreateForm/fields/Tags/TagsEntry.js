import React, {useRef} from 'react'
import './TagsEntry.scss'

const TagsEntry = props => {
    const tagInput = useRef();
    const {formInfo, setFormInfo} = props
    const tags = formInfo.hashtags ? formInfo.hashtags : []

    const tagTabs = tags.map( (tag, i) => {
        return <li key={i} onClick={ e => {
            const filtered = tags.filter( tag => {
                const tagname = tag.tagname
                const clicked = e.target.innerHTML.trim()
                const notEqual = tagname !== clicked
                return notEqual
            })
            setFormInfo({...formInfo, hashtags: filtered})
        }}> {tag.tagname} </li>
    })

    const handleTagSubmit = e => {
        e.preventDefault()

        const val = tagInput.current.value

        const duplicates = formInfo.hashtags? formInfo.hashtags.filter(hash => hash.tagname === val) : []

        if(val !== '' && duplicates.length === 0){
            setFormInfo({...formInfo, hashtags: [...formInfo.hashtags, {tagname: val}]})
        }

        tagInput.current.value = ''
    }

    return (
        <div className='tags-entry'>
            <div className='tags'>
                <ul> {tagTabs} </ul>
            </div>
            <div className='tag-creation'>
                <input
                    ref={tagInput}
                    type='text'
                    className='tagText'
                    placeholder='Add a Tag'
                    onKeyDown={e=>{
                        if (e.key === 'Enter') {
                            handleTagSubmit(e)
                        }
                    }
                }/>
                <button className='tag-submit' onClick={handleTagSubmit}> + </button>
            </div>
        </div>
    )
}

export default TagsEntry