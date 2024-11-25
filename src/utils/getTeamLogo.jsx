import { TEAM_LOGO_MAP } from "../constants";

export const getTeamLogo = (teamName) => {
  return TEAM_LOGO_MAP[teamName] || "public/assets/default-logo.svg";
};
