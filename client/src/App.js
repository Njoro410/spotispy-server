import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import './App.css';
import { catchErrors } from './utils';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Welcome from "../src/components/Welcome";
import TopArtists from './components/TopArtists';
import TopTracks from './components/TopTracks';
import Playlist from './components/Playlist';
import Playlists from './components/Playlists';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      // try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      // } catch (error) {
      //   console.log(error);
      // }


    };

    catchErrors(fetchData());
    // fetchData();
  }, []);


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome token={token && token} logout={logout} profile={profile && profile} />} />
          <Route path="/top-artists" element={<TopArtists/>}/>
          <Route path="/top-tracks" element={<TopTracks/>}/>
          <Route path="/playlists/:id" element={<Playlist/>}/>
          <Route path="/playlists" element={<Playlists/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
