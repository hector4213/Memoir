import React from 'react'
import './TextEntry.scss'

import { deleteFromImgur, postToImgur } from '../../../../helpers/imgur'

const TextEntry = props => {
	const {
		setFormInfo,
		notFilledStyle,
		formInfo,
		embed_F,
		title_F,
		description_F,
		setError,
	} = props

	const handleVideoEmbed = e => {
		if (e.target.value && e.target.value.includes('/watch?v=')) {
			setFormInfo({
				...formInfo,
				embed: e.target.value,
				embed_F: true,
			})
			setError(null)
		} else if (e.target.value && e.target.value.includes('youtu.be/')) {
			setFormInfo({
				...formInfo,
				embed: e.target.value,
				embed_F: true,
			})
			setError(null)
		} else {
			setFormInfo({
				...formInfo,
				embed: '',
				embed_F: false,
			})
			setError('Please make sure that the URL comes from YouTube')
		}
	}

	const handleAudioEmbed = e => {
		if (
			e.target.value &&
			e.target.value.includes('src="https://w.soundcloud')
		) {
			const embedString = e.target.value
			const final = embedString.split('<div')

			setFormInfo({
				...formInfo,
				embed: final[0],
				embed_F: true,
			})
			setError(null)
		} else {
			setFormInfo({
				...formInfo,
				embed: '',
				embed_F: false,
			})
			setError(
				'Please make sure that the full embed code comes from SoundCloud',
			)
		}
	}

	const handleImageEmbed = async e => {
		if (formInfo.embed.includes('imgur')) {
			await deleteFromImgur(formInfo.embed)
		}

		const response = await postToImgur(e.target.files[0])

		setFormInfo({
			...formInfo,
			embed: `${response.data.data.link} ${response.data.data.deletehash}`,
			embed_F: true,
		})
	}

	return (
		<>
			{
				// IF VIDEO FORMAT ID
				formInfo.format_id === 1 ? (
					<input
						autoComplete='off'
						type='text'
						name='video-embed'
						style={embed_F ? {} : notFilledStyle}
						placeholder='Paste YouTube URL text here'
						value={formInfo.embed ? formInfo.embed : ''}
						onChange={handleVideoEmbed}
					/>
				) : (
					''
				)
			}

			{
				// IF AUDIO FORMAT ID
				formInfo.format_id === 3 ? (
					<input
						autoComplete='off'
						type='text'
						name='audio-embed'
						style={embed_F ? {} : notFilledStyle}
						placeholder='Paste SoundCloud EMBED text here'
						value={formInfo.embed ? formInfo.embed : ''}
						onChange={handleAudioEmbed}
					/>
				) : (
					''
				)
			}

			{
				// IF IMAGE FORMAT ID
				formInfo.format_id === 4 ? (
					<input
						autoComplete='off'
						type='file'
						name='image-embed'
						style={embed_F ? {} : notFilledStyle}
						onChange={handleImageEmbed}
					/>
				) : (
					''
				)
			}

			<input
				autoComplete='off'
				style={title_F ? {} : notFilledStyle}
				name='title'
				type='text'
				placeholder='Enter the title'
				value={formInfo.title ? formInfo.title : ''}
				onChange={e => {
					if (e.target.value) {
						setFormInfo({ ...formInfo, title: e.target.value, title_F: true })
					} else {
						setFormInfo({ ...formInfo, title: e.target.value, title_F: false })
					}
				}}
			/>

			<textarea
				autoComplete='off'
				rows='6'
				style={description_F ? {} : notFilledStyle}
				name='description'
				type='text'
				placeholder='Enter the description'
				value={formInfo.description ? formInfo.description : ''}
				onChange={e => {
					if (e.target.value) {
						setFormInfo({
							...formInfo,
							description: e.target.value,
							description_F: true,
						})
					} else {
						setFormInfo({
							...formInfo,
							description: e.target.value,
							description_F: false,
						})
					}
				}}
			/>
		</>
	)
}

export default TextEntry
