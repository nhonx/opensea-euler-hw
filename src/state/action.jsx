import React, { Component } from "react";
import axios from "axios";
import { AppState, ActionContext } from "./state";
const getAssetsApiUrl = (
  pageNum,
  sortBy,
  sortDirection,
  collection
) => {
  let offset = (pageNum - 1) * 20
  let url = `https://api.opensea.io/api/v1/assets?limit=20&offset=${offset}`;
  if (sortBy || collection) {
    let sortQuery =
      sortBy && sortDirection ? `&order_by=${sortBy}&order_direction=${sortDirection}` : "";
    let filterQuery =
      collection
        ? `&collection=${collection}`
        : "";
    return url + sortQuery + filterQuery;
  }
  return url;
};
export const ActionType = {
  START_LOAD_MEDIA: "StartLoadMedia",
  START_RELOAD_MEDIA: "StartReloadMedia",
  LOAD_MEDIA_SUCCESSFUL: "LoadMediaSuccessful",
  RELOAD_MEDIA_SUCCESSFUL: "ReloadMediaSuccessful",
  LOAD_MEDIA_FAILED: "LoadMediaFailed",
  UPDATE_SORT_FILTER: "UpdateSortFilter",
  SET_COLLECTION_LIST: "SetCollectionList",
  FILTER_BY_COLLECTION: "FilterByCollection"
};
const AppAction = ({ children }) => {
  let actions = {};
  const { state, dispatch } = React.useContext(AppState);
  const { sortBy, sortDirection, collection } = state.sortFilter;
  actions.loadPage = (pageNum, forceLoad = false) => {
    if (forceLoad) {
      dispatch({
        type: ActionType.START_RELOAD_MEDIA,
      });
    } else {
      dispatch({
        type: ActionType.START_LOAD_MEDIA,
      });
    }
    console.log("load page " + pageNum);
    const url = getAssetsApiUrl(pageNum, sortBy, sortDirection, collection)
    axios.get(url, {}).then(
      ({ data }) => {
        if (data.assets.length > 0) {
          if (forceLoad) {
            dispatch({
              type: ActionType.RELOAD_MEDIA_SUCCESSFUL,
              pageNum: 1,
              mediaList: data.assets,
            });
          } else {
            dispatch({
              type: ActionType.LOAD_MEDIA_SUCCESSFUL,
              pageNum: pageNum,
              mediaList: data.assets,
            });
          }
        } else {
          dispatch({
            type: ActionType.LOAD_MEDIA_FAILED,
            error: {
              msg: "No media found.",
            },
          });
        }
      }
    ).catch((err) => {
      console.log("Error", err)
      dispatch({
        type: ActionType.LOAD_MEDIA_FAILED,
        error: {
          msg: "No media found.",
        },
      });
    });
  };
  actions.loadCollections = () => {
    console.log("load collection ");
    const url = `https://api.opensea.io/api/v1/collections?offset=0&limit=300`
    axios.get(url, {}).then(
      ({ data }) => {
        let collections = data.collections.map(col => ({ slug: col.slug, name: col.name }))
        // collections.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        if (data.collections.length > 0) {
          dispatch({
            type: ActionType.SET_COLLECTION_LIST,
            collections: collections
          });
        }
      }
    ).catch((err) => {
      console.log("Error", err)
    });
  };
  actions.updateSortFilter = (
    _sortBy,
    _sortDirection,
    _filterBy,
    _filterValue,
    _collection
  ) => {
    dispatch({
      type: ActionType.UPDATE_SORT_FILTER,
      sortBy: _sortBy,
      sortDirection: _sortDirection,
      filterBy: _filterBy,
      filterValue: _filterValue,
      collection: _collection
    });
  };
  actions.filterByCollection = (collection) => {
    let newCollections = [...state.collections]
    if (newCollections.filter(x => x.slug === collection.slug).length == 0) {
      newCollections.push(collection)
    }
    dispatch({
      type: ActionType.FILTER_BY_COLLECTION,
      collection: collection.slug,
      collections: newCollections
    });
  }
  return (
    <ActionContext.Provider value={actions}>{children}</ActionContext.Provider>
  );
};
export default AppAction;
