import styled from "styled-components";
import {
  DOOSAN,
  HANHWA,
  KIA,
  KIWOOM,
  KT,
  LG,
  LOTTE,
  NC,
  SAMSUNG,
  SSG,
} from "../../../constants";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DropdownTeam = ({ onSelectTeam }) => {
  const navigate = useNavigate();

  const handleTeamClick = (team) => {
    if (onSelectTeam) {
      onSelectTeam(team);
    }
    // 선택된 팀을 URL 파라미터로 전달하여 TeamInfo 페이지로 이동
    navigate(`/api/teamInfo/${team}`);
  };

  DropdownTeam.propTypes = {
    onSelectTeam: PropTypes.func,
  };

  return (
    <TeamContainer>
      <LotteGiants onClick={() => handleTeamClick("LOTTE")}>
        <LotteImg src={LOTTE} />
        롯데 자이언츠
      </LotteGiants>
      <KiaTigers onClick={() => handleTeamClick("KIA")}>
        <KiaImg src={KIA} />
        KIA 타이거즈
      </KiaTigers>
      <SamsungLions onClick={() => handleTeamClick("SAMSUNG")}>
        <SamsungImg src={SAMSUNG} />
        삼성 라이온즈
      </SamsungLions>
      <KtWiz onClick={() => handleTeamClick("KT")}>
        <KtImg src={KT} />
        Kt wiz
      </KtWiz>
      <HanhwaEagles onClick={() => handleTeamClick("HANHWA")}>
        <HanhwaImg src={HANHWA} />
        한화 이글스
      </HanhwaEagles>
      <KiwoomHeros onClick={() => handleTeamClick("KIWOOM")}>
        <KiwoomImg src={KIWOOM} />
        키움 히어로즈
      </KiwoomHeros>
      <LgTwins onClick={() => handleTeamClick("LG")}>
        <LgImg src={LG} />
        LG 트윈스
      </LgTwins>
      <NcDinos onClick={() => handleTeamClick("NC")}>
        <NcImg src={NC} />
        NC 다이노스
      </NcDinos>
      <DoosanBears onClick={() => handleTeamClick("DOOSAN")}>
        <DoosanImg src={DOOSAN} />
        두산 베어스
      </DoosanBears>
      <SsgLanders onClick={() => handleTeamClick("SSG")}>
        <SsgImg src={SSG} />
        SSG 랜더스
      </SsgLanders>
    </TeamContainer>
  );
};

const TeamContainer = styled.div`
  z-index: 5;
  position: fixed;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  overflow-x: auto;
  width: fit-content;
  max-width: 100vw;
  box-sizing: border-box;
`;

const TeamItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  margin: 0 1rem;
  color: gray;
  &:hover {
    color: black;
    text-decoration: underline;
    text-decoration-style: solid;
  }
`;

const TeamImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const LotteGiants = styled(TeamItem)``;
const KiaTigers = styled(TeamItem)``;
const SamsungLions = styled(TeamItem)``;
const KtWiz = styled(TeamItem)``;
const HanhwaEagles = styled(TeamItem)``;
const KiwoomHeros = styled(TeamItem)``;
const LgTwins = styled(TeamItem)``;
const NcDinos = styled(TeamItem)``;
const DoosanBears = styled(TeamItem)``;
const SsgLanders = styled(TeamItem)``;

const LotteImg = styled(TeamImg)``;
const KiaImg = styled(TeamImg)``;
const SamsungImg = styled(TeamImg)``;
const KtImg = styled(TeamImg)``;
const HanhwaImg = styled(TeamImg)``;
const KiwoomImg = styled(TeamImg)``;
const LgImg = styled(TeamImg)``;
const NcImg = styled(TeamImg)``;
const DoosanImg = styled(TeamImg)``;
const SsgImg = styled(TeamImg)``;

export default DropdownTeam;
