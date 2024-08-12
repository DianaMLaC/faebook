import React, { useState } from "react"
import { useAuth } from "../../context/auth"
import { RiEditLine } from "react-icons/ri"
import { BiCheckboxChecked } from "react-icons/bi"
import { Intro } from "../../utils/types"
import { updateIntro } from "../../utils/axios"

function Intro(): React.ReactElement {
  const { profileUser, currentUser, setCurrentUser } = useAuth()
  const [introBio, setIntroBio] = useState(profileUser?.intro?.bio || "")
  const bioButton = profileUser?.id === currentUser?.id
  const [toggleBioInput, setToggleBioInput] = useState(false)

  const handleBioSubmit = async () => {
    if (!currentUser || !currentUser.intro?.id) {
      console.error("Cannot update intro data as currentUser or intro id is missing")
      return
    }
    const updatedIntro: Partial<Intro> = { bio: introBio }
    const bioSubmit = await updateIntro(currentUser.id, currentUser.intro?.id, updatedIntro)
    if (bioSubmit) {
      if (bioSubmit.bio) setIntroBio(bioSubmit.bio)
      setCurrentUser({
        ...currentUser,
        intro: {
          ...currentUser.intro,
          ...bioSubmit,
        },
      })
      setToggleBioInput(false)
    }
  }

  return (
    <div className="intro-container">
      <header className="intro-header">
        <h2>Intro</h2>
        {bioButton && <RiEditLine className="change-bio" onClick={() => setToggleBioInput(true)} />}
      </header>
      <div className="intro-bio">
        {toggleBioInput ? (
          <div className="intro-bio-input">
            <input type="text" value={introBio} onChange={(e) => setIntroBio(e.target.value)} />
            <BiCheckboxChecked className="caption-submit" onClick={handleBioSubmit} />
          </div>
        ) : introBio ? (
          <p>"{introBio}"</p>
        ) : (
          <p>"Enter bio here"</p>
        )}
      </div>
      <div className="intro-details"></div>
    </div>
  )
}

export default Intro
