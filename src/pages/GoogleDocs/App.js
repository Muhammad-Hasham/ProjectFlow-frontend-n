import './App.css';
import React, { useState, useEffect } from 'react';
import LoginButton from './login';
import { gapi } from 'gapi-script';

const client_Id = process.env.REACT_APP_CLIENT_ID;
const api_key = process.env.REACT_APP_API_KEY;
const Scopes = 'https://www.googleapis.com/auth/drive.file';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    async function start() {
      try {
        await gapi.client.init({
          apiKey: api_key,
          clientId: client_Id,
          scope: Scopes
        });
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      } catch (error) {
        console.error('Error initializing gapi:', error);
      }
    }

    function updateSigninStatus(isSignedIn) {
      setIsSignedIn(isSignedIn);
      if (isSignedIn) {
        createFile();
      }
    }

    gapi.load('client:auth2', start);
  }, []);

  function createFile() {
    var accessToken = gapi.auth.getToken().access_token;

    fetch('https://docs.googleapis.com/v1/documents', {
      method: "POST",
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
    }).then((res) => {
      return res.json();
    }).then(function(val) {
      console.log(val);
      const googleDocsUrl = 'https://docs.google.com/document/d/' + val.documentId + '/edit';
      window.open(googleDocsUrl, "_blank");

      window.location.href = 'http://localhost:3001/apps';
    });
  }

  return (
    <div className="App">
      {!isSignedIn ? <LoginButton /> : <p>Redirecting to Google Docs...</p>}
    </div>
  );
}

export default App;
