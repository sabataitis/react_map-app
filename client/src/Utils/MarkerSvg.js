import React from 'react'
import classes from "./Marker.module.css"

export const MarkerSvg = ({viewport}) => {
    return (
              <svg
                style={{
                  width: ` ${6 * viewport.zoom}px`,
                  height: ` ${6 * viewport.zoom}px`
                }}
                className={ classes.marker }
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
    )
}
