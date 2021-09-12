import React, { Component } from "react";
import { AppState, ActionContext } from "../state/state";
import { debounce } from "lodash";
const SortFilterPanel = () => {
  const { state } = React.useContext(AppState);
  const { updateSortFilter, loadCollections } = React.useContext(ActionContext);
  const [localState, setState] = React.useState({
    sortBy: state.sortFilter.sortBy,
    sortDir: state.sortFilter.sortDirection,
    filterBy: "authorName",
    filterValue: "",
    collection: state.sortFilter.collection,
  });
  React.useEffect(() => {
    loadCollections();
  }, [])
  React.useEffect(() => {
    if (
      state.sortBy !== localState.sortBy ||
      state.sortDirection !== localState.sortDir ||
      state.filterValue !== localState.filterValue
    ) {
      debounce(() => {
        updateSortFilter(
          localState.sortBy,
          localState.sortDir,
          localState.filterBy,
          localState.filterValue,
          localState.collection
        );
      }, 300)();
    }
  }, [localState]);
  const onChanged = (event) => {
    console.log(event.target.name);
    let newState = { ...localState };
    newState[event.target.name] = event.target.value;
    setState(newState);
  };
  return (
    <div className="box filter-sort">
      <div className="field is-grouped">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Sort by</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="sortBy"
                    value={localState.sortBy}
                    onChange={onChanged}
                  >
                    <option value="">Default</option>
                    <option value="sale_date">Last Sale Date</option>
                    <option value="sale_price">Price</option>
                    <option value="sale_count">Sale Count</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="sortDir"
                    value={localState.sortDir}
                    onChange={onChanged}
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Collections</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="collection"
                    value={state.sortFilter.collection}
                    onChange={onChanged}
                  >
                    <option value="">All</option>
                    {
                      state.collections.map(col => {
                        return (
                          <option key={col.slug} value={col.slug}>{col.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortFilterPanel;
