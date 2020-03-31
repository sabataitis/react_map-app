import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries, deleteLogEntry } from "../../api";
import { LogEntryForm } from "../../Components/LogEntryForm";
import { EditLogEntryForm } from "../../Components/EditEntryForm";
import { MarkerSvg } from "../../Utils/MarkerSvg";
import classes from "./Map.module.css"
export const Map = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [entryLocation, setEntryLocation] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [render, setRender] = useState({});
  const [viewport, setViewport] = useState({
    width: "100rem",
    height: "100rem",
    latitude: 40.4637,
    longitude: 3.7492,
    zoom: 4
  });
  const showEditForm = () => {
    setEditStatus(!editStatus);
  };
  const getEntries = async () => {
    const newLogEntries = await listLogEntries();
    setLogEntries(newLogEntries);
  };
  const showAddMarkerPopup = event => {
    const [longitude, latitude] = event.lngLat;
    setEntryLocation({
      longitude: longitude,
      latitude: latitude
    });
  };
  useEffect(() => {
    getEntries();
  }, [render]);
  return (
    <>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/sabataitiscode/ck8furulw36ep1inv7aatqsf3?optimize=true"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        onDblClick={showAddMarkerPopup}
        doubleClickZoom={false}
      >
        {logEntries.map(logEntry => (
          <React.Fragment key={logEntry._id}>
            <Marker latitude={logEntry.latitude} longitude={logEntry.longitude}>
              <div
                onClick={() =>
                  setShowPopup({
                    [logEntry._id]: true
                  })
                }
              >
                <MarkerSvg viewport={viewport} />
              </div>
            </Marker>
            {showPopup[logEntry._id] ? (
              <Popup
                captureScroll={true}
                maxWidth={`200px`}
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
                anchor="bottom"
              >
                <div className={classes.popup}>
                  <div className={classes.popupTextContent }>
                    <h3>{logEntry.title}</h3>
                    <small>
                      Visit Date:
                      {new Date(logEntry.visitDate).toLocaleDateString()}
                    </small>
                    <p>{logEntry.description}</p>
                    <div className={ classes.popupButtons }>
                      <button
                        className={ classes.btn }
                        onClick={() => {
                          deleteLogEntry(logEntry._id);
                          setShowPopup({
                            [logEntry._id]: false
                          });
                          getEntries();
                          setRender({ [logEntry._id]: false });
                        }}
                      >
                        Remove
                      </button>
                      <button
                        className={ classes.btn }
                        onClick={() => {
                          showEditForm();
                        }}
                      >
                        {editStatus ? "Cancel" : "Edit"}
                      </button>
                    </div>
                  </div>
                  <div className={ classes.popupImageContent }>
                    <div className={ classes.popupImage }>
                      {logEntry.image ? (
                        <img src={logEntry.image} alt={logEntry.title} />
                      ) : null}
                    </div>
                  </div>
                </div>
                {editStatus ? (
                  <Popup
                    captureScroll={true}
                    latitude={logEntry.latitude}
                    longitude={logEntry.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    offsetLeft={`weirdGetAroundHere`}
                    dynamicPosition={true}
                    onClose={() => setEditStatus(false)}
                    anchor="top"
                  >
                    <EditLogEntryForm
                      dataProp={logEntry}
                      onClose={() => {
                        setEditStatus(false);
                        getEntries();
                        setRender({ [logEntry._id]: ![logEntry._id] });
                      }}
                    />
                  </Popup>
                ) : null}
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
                <MarkerSvg viewport={viewport} />
              </div>
            </Marker>
            <Popup
              captureScroll={true}
              latitude={entryLocation.latitude}
              longitude={entryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setEntryLocation(null)}
              anchor="top"
            >
              <LogEntryForm
                className={classes.popup}
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
    </>
  );
};
