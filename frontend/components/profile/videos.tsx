import React from "react"

function Videos(): React.ReactElement {
  return (
    <div className="videos-container">
      <header className="videos-header">
        <h2>Videos</h2>
      </header>
      <div className="no-info-to-show">
        <p> No activity to show</p>
      </div>
    </div>
  )
}

export default Videos
