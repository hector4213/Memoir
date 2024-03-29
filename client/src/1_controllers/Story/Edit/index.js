import React, { useState } from 'react'
import './StoryEdit.scss'

import { connect } from 'react-redux'
import { deleteFromImgur, postToImgur } from '../../../helpers/imgur'
import { editStoryAction } from '../../../redux/actions/story'
import { deleteStoryAction } from '../../../redux/actions/story'
import { useNavigate } from 'react-router-dom'

import Button from '../../../3_templates/Button'

const StoryEdit = ({ story, editStory, deleteStory }) => {
	let navigate = useNavigate()

	const [formInfo, setFormInfo] = useState({
		name: story.name,
		occupation: story.occupation,
		story_img: story.story_img,
	})

	const handleImageEmbed = async e => {
		if (formInfo.story_img && formInfo.story_img.includes('imgur')) {
			await deleteFromImgur(formInfo.story_img)
		}

		const response = await postToImgur(e.target.files[0])

		setFormInfo({
			...formInfo,
			story_img: `${response.data.data.link} ${response.data.data.deletehash}`,
		})
	}

	return (
		<form className='story-edit'>
			<div className='story-img'>
				<div
					className='story-img-picture'
					style={{ background: `url(${formInfo.story_img.split(' ')[0]})` }}
				/>
			</div>

			<h2>Edit {formInfo.name}'s Story</h2>

			{/* <input type='text' value={formInfo.story_img}
                onChange={ e => setFormInfo( {...formInfo, story_img: e.target.value })}
            /> */}
			<input type='file' name='image-embed' onChange={handleImageEmbed} />

			<input
				type='text'
				value={formInfo.name}
				placeholder='Enter Story name'
				onChange={e => setFormInfo({ ...formInfo, name: e.target.value })}
			/>

			<input
				type='text'
				value={formInfo.occupation}
				placeholder='Enter the persons occupation'
				onChange={e => setFormInfo({ ...formInfo, occupation: e.target.value })}
			/>

			<div className='story-story-btns'>
				<Button
					{...{
						label: 'Submit',
						transparent: false,
						onClick: e => {
							e.preventDefault()
							editStory(formInfo)
						},
					}}
				/>

				<Button
					{...{
						label: 'Delete Story',
						transparent: true,
						red: true,
						extraClass: 'delete-story',
						onClick: async e => {
							e.preventDefault()

							if (
								// eslint-disable-next-line no-restricted-globals
								confirm(
									`Are you sure you want to delete ${story.name}'s story?`,
								)
							) {
								const deleted = await deleteStory(story.id)
								if (deleted) navigate('/profile')
							}
						},
					}}
				/>
			</div>
		</form>
	)
}

const mapStateToProps = state => {
	return {
		story: state.page.current.story,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		editStory: entryInfo => dispatch(editStoryAction(entryInfo)),
		deleteStory: storyId => dispatch(deleteStoryAction(storyId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryEdit)
