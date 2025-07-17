import React from "react";

const LocationSearchPanel = ({
  suggestions = [],
  loading = false,
  onSuggestionClick,
  setPanelOpen,
  setVehiclePanelOpen,
  activeField,
}) => {
  return (
    <div>
      {loading && <div className="p-4 text-gray-500">Loading...</div>}
      {!loading && suggestions.length === 0 && (
        <div className="p-4 text-gray-400">No suggestions</div>
      )}
      {suggestions.map((elem, index) => (
        <div
          key={index}
          onClick={() => {
            onSuggestionClick(elem);
            // setVehiclePanelOpen(true);
            // setPanelOpen(false);
          }}
          className="flex border-2 p-3 rounded-xl border-gray-200 active:border-black items-center my-4 gap-4 cursor-pointer transition-all"
        >
          <div className="bg-[#eee] h-10 w-14 min-w-[3.5rem] flex items-center justify-center rounded-full text-lg">
            <i className="ri-map-pin-2-fill"></i>
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-800 text-sm sm:text-base break-words leading-snug">
              {elem.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
