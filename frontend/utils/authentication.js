export const customHeaders = {
  "content-type": "application/json;charset=UTF-8",
}

export async function checkResponse(response) {
  if (!response.ok) {
    console.log("error in response not ok")
    const backendErrorResponse = await response.json()

    if (backendErrorResponse && backendErrorResponse.errors && backendErrorResponse.errors.user) {
      // If the structure is as expected, extract error messages and join them.
      const backendErrorList = backendErrorResponse.errors.user
      const errorMessages = Object.values(backendErrorList).flat() // Flatten in case it's an array of arrays
      throw new Error(errorMessages.join("\n"))
    } else {
      // If the structure is not as expected, throw a generic error or handle as needed
      throw new Error("An error occurred. Please try again.")
    }
  }
  return response
}

// POST USER

export const postUser = async (userData) => {
  console.log(userData)
  try {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify(userData),
    })
    await checkResponse(response)
    const user = await response.json()
    return user
  } catch (err) {
    // console.error(err.message)
    console.error("Error with response code or parsing response in API POST User", err)
    throw err
  }
}

// POST SESSION

export const postSession = async (sessionData) => {
  try {
    const response = await fetch("http://localhost:3000/api/authentications", {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify(sessionData),
    })
    await checkResponse(response)
    // console.log(response)
    const session = await response.json()
    return session
  } catch (err) {
    console.error("Error with response code or parsing response in API POST Session", err)
    throw err
  }
}

// DELETE SESSION

export const deleteSession = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/authentications", {
      method: "DELETE",
    })
    await checkResponse(response)
  } catch (err) {
    console.error("Error with response code or parsing response in API DELETE Session", err)
  }
}
