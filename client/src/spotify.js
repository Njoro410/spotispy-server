// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
  }
  
  // Map to retrieve localStorage values
  const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
  };



  /**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
      return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
  };




/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */
 const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
      [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
      [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
      [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');
  
    // If there's an error OR the token in localStorage has expired, refresh the token
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
      refreshToken();
    }
  
    // If there is a valid access token in localStorage, use that
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
      return LOCALSTORAGE_VALUES.accessToken;
    }
  
    // If there is a token in the URL query params, user is logging in for the first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
      // Store the query params in localStorage
      for (const property in queryParams) {
        window.localStorage.setItem(property, queryParams[property]);
      }
      // Set timestamp
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
      // Return access token from query params
      return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }
  
    // We should never get here!
    return false;
  };
  
  export const accessToken = getAccessToken();