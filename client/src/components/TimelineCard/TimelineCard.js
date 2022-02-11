import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import "./TimelineCard.scss";
import "./directions.scss";
import "./mediaType.scss";
import "./specialTags/specialTags.scss";

import { formatDate } from "../../helpers/helpers";

const TimelineCard = (props) => {
  // MEDIA TYPES: 1:VIDE0 , 2:TEXT , 3:AUDIO , 4:IMAGE

  const { entry, position } = props;
  const { format_id, embed, title, date, description, id, story_id, hashtags } =
    entry;
  let formattedDate = formatDate(date);
  formattedDate = formattedDate.startsWith("January 1,")
    ? formattedDate.replace("January 1, ", "")
    : formattedDate;

  let timelineCardClass = "entryRow ";
  timelineCardClass += `${position} `;

  // CLASSES
  let entryCardClasses = "entryCard ";
  entryCardClasses += `mediaType-${format_id} `;

  let hashtagDivs = [];
  if (hashtags) {
    const specialTags = ["birthday", "vacation"];
    hashtags.forEach((hash, i) => {
      const tag = hash.tagname.toLowerCase();
      let specialCounter = 0;
      if (specialCounter < 5 && specialTags.includes(tag)) {
        hashtagDivs.push(
          <div key={`${tag} ${i}`} className={`special-hashtags ${tag}`} />
        );
        specialCounter++;
      }
    });
  }

  // ON CLICK GO TO ENTRY
  const history = useHistory();
  const goToEntry = useCallback(() => {
    const to = `/story/${story_id}/entry/${id}`;
    history.push(to);
  }, [history, id, story_id]);

  // CREATE THE TIMELINE LINE THAT CONNECTS BACK TO MAIN LINE
  const line = () => {
    if (position === "left" || position === "right") {
      return format_id === 2 ? ( // TEXT
        <div className="textHorizontalLine">
          <div className="timelineCircles lefttimelineCircle" />
          <div className="timelineCircles righttimelineCircle" />
        </div>
      ) : (
        <div className="horizontalLine">
          {position === "right" ? (
            <div className="timelineCircles lefttimelineCircle" />
          ) : (
            <div className="timelineCircles righttimelineCircle" />
          )}
        </div>
      );
    } else {
      return <div className="timelineCircles" />;
    }
  };

  // HANDLE MEDIA TYPES
  const createMarkup = () => {
    return { __html: embed };
  };

  const createVideoMarkup = () => {
    const finalEmbed = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${embed}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    return { __html: finalEmbed };
  };

  const showImgurEmbed = (entry) => {
    // USE DELETE HASH TO DELETE IMAGE WHEN DELETING POST
    if (entry.embed.includes("imgur")) {
      const splitEmbed = entry.embed.split(" ");
      const url = splitEmbed[0];
      return <img alt={entry.title} src={url} />;
    } else {
      return <img alt={entry.title} src={entry.embed} />;
    }
  };

  return (
    <div className={timelineCardClass}>
      <div
        className={`entryPositioner ${position}container mediaType-${format_id}container`}
      >
        <div name={title} className={entryCardClasses} onClick={goToEntry}>
          {format_id === 1 ? ( // VIDEO
            <div dangerouslySetInnerHTML={createVideoMarkup()} />
          ) : (
            ""
          )}

          {format_id === 3 ? ( // AUDIO
            <div dangerouslySetInnerHTML={createMarkup()} />
          ) : (
            ""
          )}

          {
            format_id === 4 ? showImgurEmbed(entry) : "" // IMAGE
          }

          <div className="caption">
            <h1>{title}</h1>
            <h2>{formattedDate}</h2>
            {format_id === 2 ? <p>{description}</p> : ""}
          </div>

          {hashtagDivs}
        </div>

        {line()}
      </div>
    </div>
  );
};

export default TimelineCard;
