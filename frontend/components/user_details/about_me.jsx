import React from "react"

const AboutMe = () => {
  return (
    <div>
      <div>
        <header>About</header>
        <nav>
          <div>Overview</div>
          <div>Work & Education</div>
          <div>Places Lived</div>
          <div>Contact & Basic Info</div>
          <div>Family & Relationships</div>
          <div>Details about you</div>
          <div>Life Events</div>
        </nav>
      </div>
      <div>{getViewComponent()}</div>
    </div>
  )
}

export default AboutMe
