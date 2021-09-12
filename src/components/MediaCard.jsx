import React, { Component } from 'react';
import { AppState, ActionContext } from "../state/state";
const MediaPlayer = ({ src, thumb, mediaType }) => {
  switch (mediaType) {
    case "IMAGE":
      return <img src={src}></img>;
    case "VIDEO":
      return (
        <video preload="none" poster={thumb} controls>
          <source src={src} type="video/mp4" />
        </video>
      );
  }
  return null;
};
const shortenString = (str, length) => {
  return (str.length > length ? str.substr(0, length) + "..." : str)
}
export const MediaCard = ({ media }) => {
  const { filterByCollection } = React.useContext(ActionContext);
  const mediaCaption = media.description ? shortenString(media.description, 36) : "";
  const placeholderImage = "https://via.placeholder.com/200"
  const mediaName = media.name ? shortenString(media.name, 12) : "Unnamed"
  const mediaCollectionUrl = `https://opensea.io/collection/${media.collection.slug}`
  const focusCollection = (collection) => {
    console.log(collection)
    filterByCollection(collection)
  }
  return (
    <div className="media-card">
      <div className="media-desc">
        <div className="desc">
          <div className="assets-title">
            <p className="collection-name">
              <span className="collection-filter" onClick={() => focusCollection({ slug: media.collection.slug, name: media.collection.name })}>
                {media.collection.name}
              </span>
              <a href={mediaCollectionUrl} target="_blank">
                <i className="fa fas fa-external-link "></i>
              </a>
            </p>
            <span>
              <b>
                <a href={media.permalink} target="_blank">
                  {mediaName}
                </a>
              </b>
            </span>
          </div>
          <div className="caption">
            <p>{mediaCaption || "  "}</p>
          </div>
        </div>
      </div>
      <div className="thumb">
        <MediaPlayer
          src={media.image_url || placeholderImage}
          thumb={media.image_thumbnail_url}
          alt={media.description}
          mediaType="IMAGE"
        ></MediaPlayer>
      </div>
      <div className="metadata">
        <span>Sales: <strong>{media.num_sales}</strong></span>
      </div>
    </div>
  );
};

