

export const areFieldsValid = (formInfo, date) => {

    let allFieldsTrue

    if(formInfo){

        const formatId = parseInt(formInfo.format_id)
        const year = date.year ? date.year : 0


        const valid_format_id = 0 < formatId && formatId < 5


        // EMBED
        let valid_embed = true
        // if (formatId === 1){ // VIDEO
        // }
        if (formatId === 3){ // AUDIO
            valid_embed = formInfo.embed.includes('src="https://w.soundcloud')
        }
        else if (formatId === 4){ // IMAGE
            valid_embed = formInfo.embed.includes('imgur')
        }


        const valid_title = formInfo.title !== '' ? true : false
        const valid_description = formInfo.description !== '' ? true : false
        const valid_date = 999 < year && year < 3000? true : false

        allFieldsTrue = (
            valid_format_id &&
            valid_embed &&
            valid_title &&
            valid_description &&
            valid_date
            )

    } else {
        allFieldsTrue = false
    }

    return allFieldsTrue? true: false
}

export const parseForm = (formInfo, date) => {

    // IF EMBED IS VIDEO FORMAT
    // THEN TAKE ID FROM URL
    if(formInfo.format_id === 1){
        const newVideoEmbed = videoURLparse(formInfo.embed)
        formInfo = {...formInfo, embed: newVideoEmbed}
    }

    const newDate = `${date.year}-${date.month!==""? date.month:'01'}-${date.day!==""? date.day:'01'}`

    const finalHash = formInfo.hashtags === ''? [] : formInfo.hashtags

    return {
        title: formInfo.title,
        description: formInfo.description,
        date: newDate,
        embed: formInfo.embed,
        format_id: formInfo.format_id,
        hashtags: finalHash,
    }
}

const videoURLparse = (oldEmbed) => {
    if(oldEmbed.includes('/watch?v=')){
        const half = oldEmbed.split('?v=')
        return half[1]
    }
    else if(oldEmbed.includes('youtu.be')) {
        const half = oldEmbed.split('youtu.be/')
        return half[1]
    } else {
        return oldEmbed
    }
}

export const setFormToNotFilled = formInfo => {
    return ({
        ...formInfo,
        embed_F: formInfo.embed? true: false,
        format_id_F: formInfo.format_id? true: false,
        title_F: formInfo.title? true: false,
        description_F: formInfo.description? true: false,
    })
}

export const setDateToNotFilled = date => {
    return ({
        ...date,
        year_F: date.year? true : false,
    })
}