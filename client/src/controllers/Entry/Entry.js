import React, { useEffect } from "react";
import "./Entry.scss";

import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getSingleEntryAction } from "../../redux/actions/entry";
import { getSingleStoryAction } from "../../redux/actions/story";
import ButtonsForEntry from "../ButtonGroups/ButtonsForEntry/ButtonsForEntry";
import ErrorDisplay from "../../components/ErrorDisplay/ErrorDisplay";

import { formatDate } from "../../helpers/helpers";

const Entry = ({ getSingleEntry, getSingleStory, current }) => {
  const { storyId, entryId } = useParams();

  useEffect(() => {
    getSingleEntry(storyId, entryId);
    getSingleStory(storyId);
  }, [getSingleEntry, getSingleStory, storyId, entryId]);

  if (!current || !current.entry || !current.story || !current.entry) {
    return <ErrorDisplay />;
  } else {
    const entry = current.entry;
    const { hashtags, format_id, title, description, embed, date, user, id } =
      entry;

    const createMarkup = () => {
      const finalEmbed = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${entry.embed}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      return { __html: finalEmbed };
    };

    const createAudioMarkup = () => {
      return { __html: entry.embed };
    };

    const [previousEntry, nextEntry] = getNavEntries(current.story.entries, id);
    const formattedDate = formatDate(date);

    // MEDIA TYPES: 1:VIDE0 , 2:TEXT , 3:AUDIO , 4:IMAGE
    return (
      <div className="single-entry">
        <ButtonsForEntry />

        <div className="entry-container">
          {format_id === 1 && (
            <div
              className="video-entry"
              dangerouslySetInnerHTML={createMarkup()}
            />
          )}

          {format_id === 3 && (
            <div
              className="audio-entry"
              dangerouslySetInnerHTML={createAudioMarkup()}
            />
          )}

          {format_id === 4 ? <img alt={title} src={embed} /> : ""}

          <div className="entry-caption">
            <h1>{title}</h1>
            <h2>{formattedDate}</h2>
            <p>{description}</p>
            <p className="author">This entry was written by: {user.username}</p>
            {hashtags.length > 0 && (
              <>
                <label>Tags: </label>
                <ul className="hashtags">
                  {hashtags.map((hash, i) => {
                    return <li key={i}> {hash.tagname} </li>;
                  })}
                </ul>
              </>
            )}
          </div>

          <div
            className="nav-entries"
            style={previousEntry ? {} : { justifyContent: "flex-end" }}
          >
            {previousEntry && (
              <Link to={`/story/${storyId}/entry/${previousEntry.id}`}>
                <button className="previous-entry">
                  Previous Entry:
                  <br /> {previousEntry.title}
                </button>
              </Link>
            )}
            {nextEntry && (
              <Link to={`/story/${storyId}/entry/${nextEntry.id}`}>
                <button className="next-entry">
                  Next Entry:
                  <br /> {nextEntry.title}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
};

const getNavEntries = (allEntries, entryId) => {
  let back;
  let next;

  for (let i = 0; i < allEntries.length; i++) {
    if (entryId === allEntries[i].id) {
      if (i > 0) {
        back = allEntries[i - 1];
      }
      if (i < allEntries.length) {
        next = allEntries[i + 1];
      }
    }
  }

  return [back, next];
};

const mapStateToProps = (state) => {
  return {
    current: state.page.current,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleEntry: (storyId, entryId) =>
      dispatch(getSingleEntryAction(storyId, entryId)),
    getSingleStory: (storyId) => dispatch(getSingleStoryAction(storyId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
