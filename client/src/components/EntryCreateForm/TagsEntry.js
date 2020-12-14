import React from 'react'
import './TagsEntry.scss'

const TagsEntry = props => {

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
        let val

        if (e.key === 'Enter') {
            val = e.target.value
        } else {
            val = document.querySelector('.tagText').value;
        }

        setFormInfo({...formInfo, hashtags: [...formInfo.hashtags, {tagname: val}]})
    }

    return (
        <div className='tags-entry'>
            <div className='tags'>
                <ul> {tagTabs} </ul>
            </div>
            <div className='tag-creation'>
                <input type='text' className='tagText' placeholder='Add a Tag' onKeyDown={e=>{
                    if (e.key === 'Enter') {
                        handleTagSubmit(e)
                        e.target.value = ''
                    }
                }}/>
                <button className='tag-submit' onClick={handleTagSubmit}> + </button>
            </div>
        </div>
    )
}

export default TagsEntry