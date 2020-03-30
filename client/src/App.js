import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { listLogEntries } from "./api";
import { LogEntryForm } from "./LogEntryForm";
const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [entryLocation, setEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 40.4637,
    longitude: 3.7492,
    zoom: 4
  });
  async function getEntries() {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }
  useEffect(() => {
    getEntries();
  }, []);
  const showAddMarketPopup = event => {
    const [longitude, latitude] = event.lngLat;
    setEntryLocation({
      longitude: longitude,
      latitude: latitude
    });
  };
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarketPopup}
      doubleClickZoom={false}
    >
      <div style={{ position: "absolute", right: 0 }}>
        <NavigationControl />
      </div>

      {logEntries.map(logEntry => (
        <React.Fragment key= {logEntry._id}>
          <Marker
            latitude={logEntry.latitude}
            longitude={logEntry.longitude}
          >
            <div
              onClick={() =>
                setShowPopup({
                  [logEntry._id]: true
                })
              }
            >
              <svg
                style={{
                  width: ` ${6 * viewport.zoom}px`,
                  height: ` ${6 * viewport.zoom}px`
                }}
                className="marker"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {showPopup[logEntry._id] ? (
            <Popup
              latitude={logEntry.latitude}
              longitude={logEntry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() =>
                setShowPopup({
                  [logEntry._id]: false
                })
              }
              anchor="top"
            >
              <div className = "popup">
                <h3>{logEntry.title}</h3>
                <p>{logEntry.comments}</p>
                <small>
                  Visit Date:
                  {new Date(logEntry.visitDate).toLocaleDateString()}
                </small>
                {logEntry.image? <img src = {logEntry.image} alt = {logEntry.title}/>:null}
              </div>
            </Popup>
          ) : null}
      </React.Fragment>
      ))}
      {entryLocation ? (
        <>
          <Marker
            latitude={entryLocation.latitude}
            longitude={entryLocation.longitude}
          >
            <div>
              <svg
                style={{
                  width: ` ${7 * viewport.zoom}px`,
                  height: ` ${7 * viewport.zoom}px`
                }}
                className="marker"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={entryLocation.latitude}
            longitude={entryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setEntryLocation(null)}
            anchor="top"
          >
            <LogEntryForm
              className="popup"
              location={entryLocation}
              onClose={() => {
                setEntryLocation(null);
                getEntries();
              }}
            />
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};
export default App;
