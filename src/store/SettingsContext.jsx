import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const SettingsContext = createContext({
  settings: null,
});

const useSettings = () => useContext(SettingsContext);

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setLoading, token } = useAuth();

  //console.log(token)
  useEffect(() => {
    const getSettings = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          "http://localhost:3000/app/admin/get-settings",
          {
            withCredentials: true,
          }
        );
        const [settingsObject] = result.data.data;
        setSettings(settingsObject);
        //console.log(" settings data", settingsObject);
      } catch (error) {
        console.error("error to fetch settings data.");
        setSettings(null);
      } finally {
        setIsLoading(false);
      }
    };
    getSettings();
  }, []);

  return (
    <>
      <SettingsContext.Provider value={{ settings }}>
        {isLoading ? <div>Loading...</div> : children}
      </SettingsContext.Provider>
      ;
    </>
  );
}

export { SettingsProvider, useSettings };
