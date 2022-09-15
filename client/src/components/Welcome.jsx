import React from "react";
import styled from "styled-components/macro";


const StyledLoginButton = styled.a`
background-color: green;
color: white;
padding: 10px 20px;
margin: 20px auto;
border-radius: 30px;
display: inline-block;
`;

const Welcome = ({ token, logout, profile }) => {
  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <StyledLoginButton className="App-link" href="http://localhost:8888/login">
            Log in to Spotify
          </StyledLoginButton>
        ) : (
          <>
            <button onClick={logout}>Log Out</button>

            {profile && (
              <div>
                <h1>{profile.display_name}</h1>
                <p>{profile.followers.total} Followers</p>
                {profile.images.length && profile.images[0].url && (
                  <img src={profile.images[0].url} alt="Avatar" />
                )}
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
};

export default Welcome;
