

export const areFieldsValid = (formInfo, date) => {
    if(formInfo.format_id === 2){
        return (
            formInfo &&
            formInfo.format_id &&
            formInfo.title &&
            formInfo.description &&
            date && date.year
            )
    } else {
        return (
            formInfo &&
            formInfo.embed &&
            formInfo.format_id &&
            formInfo.title &&
            formInfo.description &&
            date && date.year
            )
    }
}

export const parseForm = (formInfo, date) => {
    return {
        title: formInfo.title,
        description: formInfo.description,
        date:`${date.year}-${date.month? date.month:'01'}-${date.day? date.day:'01'}`,
        embed: formInfo.embed,
        format_id: formInfo.format_id,
        hashtags: formInfo.hashtags,
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
        month_F: date.month? true : false,
        day_F: date.day? true : false,
        year_F: date.year? true : false,
    })
}