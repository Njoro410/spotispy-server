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
        </Routes>
      </Router>
    </>
  );
}

export default App;
