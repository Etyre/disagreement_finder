import { url } from 'inspector';
import React from 'react';
import { text } from 'stream/consumers';

const rootURL = window.location.origin

function CreateUserPage() {
  // This function renders a "create user" page on the screen.

  return (
    <div>
      <p style={{ textAlign: "center" }}>Hello, please create an account, so that we keep track of your answers.</p>
      <div style={{ display: "flex", justifyContent: "Center" }}><CreateUserForm /></div>
    </div>
  )

}

function CreateUserForm() {
  const [errorMessage, setErrorMessage] = React.useState("")
  async function submitForm() {
    // Getting values from the DOM
    const username = (document.getElementById("username") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value
    const emailAddress = (document.getElementById("emailAddress") as HTMLInputElement).value
    const confirmEmailAddress = (document.getElementById("confirmEmailAddress") as HTMLInputElement).value

    // validation
    let hasErrors = false;
    if (password !== confirmPassword) {
      setErrorMessage("Your passwords don't match")
      hasErrors = true
    }
    if (emailAddress !== confirmEmailAddress) {
      setErrorMessage("Your email addresses don't match")
      hasErrors = true
    }
    if (username == "") {
      setErrorMessage("You need a username!")
      hasErrors = true
    }
    if (emailAddress == "") {
      setErrorMessage("You need an email address!")
      hasErrors = true
    }
    if (password == "") {
      setErrorMessage("Please pick a password")
      hasErrors = true
    }
    if (hasErrors) {
      return
    } else {
      setErrorMessage("")
    }
    const data = {
      username,
      password,
      emailAddress,
    }
    const response = await fetch((rootURL + "/createuser"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data)
    });
    console.log(await response.text())

  }
  return (
    <form>
      <div className="formfield"><input type="text" placeholder="username" id="username" /></div>
      <div className="formfield"><input type="text" placeholder="password" id="password" /></div>
      <div className="formfield"><input type="text" placeholder="confirm password" id="confirmPassword" /></div>
      <div className="formfield"><input type="text" placeholder="email address" id="emailAddress" /></div>
      <div className="formfield"><input type="text" placeholder="confirm email address" id="confirmEmailAddress" /> </div>
      <div className="formbutton"><button type="button" onClick={submitForm} >Create Account</button></div>

      <div className="dangerText">{errorMessage}</div>
    </form>
  )
}


function App() {
  return (
    <div className="App">
      <CreateUserPage />





    </div>
  );
}

export default App;
