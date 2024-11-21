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
} from "../../constants";

const DropdownTeam = () => {
  return (
    <TeamContainer>
      <LotteGiants>
        <LotteImg src={LOTTE} />
        롯데 자이언츠
      </LotteGiants>
      <KiaTigers>
        <KiaImg src={KIA} />
        KIA 타이거즈
      </KiaTigers>
      <SamsungLions>
        <SamsungImg src={SAMSUNG} />
        삼성 라이온즈
      </SamsungLions>
      <KtWiz>
        <KtImg src={KT} />
        Kt wiz
      </KtWiz>
      <HanhwaEagles>
        <HanhwaImg src={HANHWA} />
        한화 이글스
      </HanhwaEagles>
      <KiwoomHeros>
        <KiwoomImg src={KIWOOM} />
        키움 히어로즈
      </KiwoomHeros>
      <LgTwins>
        <LgImg src={LG} />
        LG 트윈스
      </LgTwins>
      <NcDinos>
        <NcImg src={NC} />
        NC 다이노스
      </NcDinos>
      <DoosanBears>
        <DoosanImg src={DOOSAN} />
        두산 베어스
      </DoosanBears>
      <SsgLanders>
        <SsgImg src={SSG} />
        SSG 랜더스
      </SsgLanders>
    </TeamContainer>
  );
};

const TeamContainer = styled.div`
  z-index: 5;
  width: 100vw;
  position: absolute;
  top: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
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
