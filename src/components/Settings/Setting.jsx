import React from "react";
import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";
import DeleteAccount from "./DeleteAccount";
import { SettingsProvider } from "./SettingsContext";
import Routes from "twilio/lib/rest/Routes";

const Settings = () => {
  return (
    <SettingsProvider>
      <div className="settings-container">
        <h1>설정</h1>
        <ProfileSettings />
        <PasswordSettings />
        <DeleteAccount />
      </div>
    </SettingsProvider>
  );
};

export default Settings;
