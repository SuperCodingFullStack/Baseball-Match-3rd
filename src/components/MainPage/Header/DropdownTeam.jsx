import styled from "styled-components";

const DropdownTeam = () => {
  return (
    <TeamContainer>
      <LotteGiants>
        <LotteImg src="https://i.namu.wiki/i/FmfrbzPytldYTnvPi5m6s-gEAZWv1G4uBMxqnMYtzFDU_vGLQf4nSVhtoEHUs3F7tiSqjCLNZBN4Go7fMt-g3Zl7lN4CUqGDLqvrXJMhSDx3Bg2ShnJgTI5LtfDUjCe1kNWHHACBhHLdMuHLTPajJg.svg" />
        롯데 자이언츠
      </LotteGiants>
      <KiaTigers>
        <KiaImg src="https://i.namu.wiki/i/IeiOCgKsHfF-mNDUCjm8i-8qrxGqEf8Uey9aoQ-MBtRfau7ejaYyXn1lzPQVrOB_9TnJx8-ho4AHDmYW7JoMXGiBCeDgyTk0EcSUfMuV-EMiQTmv2BvdnMvCw6WFptrnU4VwSfRqRw5HpjKtIG2nYg.svg" />
        KIA 타이거즈
      </KiaTigers>
      <SamsungLions>
        <SamsungImg src="https://i.namu.wiki/i/rMpSXR7sFZyDuWoY0KarBWfbkiIwNRIFZDgHs-DMF4bmAu7_l_lDIMZ7Kym0I4tXPFxaPO8TIQW0iqa_NIRdUCAwPkCz6qB5uMjmSksFlpihEwbWx_w3-k89iVrGtZHaOjh1LHFOtd3zQCnzgCnPhg.svg" />
        삼성 라이온즈
      </SamsungLions>
      <KtWiz>
        <KtImg src="https://i.namu.wiki/i/zH1I_eQtDPMEchRJxTmbCHCyILnShC5_3Ch7Sm-Fz7gYPUuGmXnovHU8ky2Ja08pkulfbUn7vyJ5FDqaWpHsrg.svg" />
        Kt wiz
      </KtWiz>
      <HanhwaEagles>
        <HanhwaImg src="https://i.namu.wiki/i/FfE2O-hEbg4_rIOOQ5m9UfA8JfZ2CJ5CKUypFCZ9WbtuSm0_rxzB59CobcvR95KlZBP_TkgvXnWXF1GlAmRcI3DXxsvpb9qPE8bG5lxKUErvUSA3Y0hUoZMB9EGLG14HwhE2fIlJWR5ZdN4jnruJNw.webp" />
        한화 이글스
      </HanhwaEagles>
      <KiwoomHeros>
        <KiwoomImg src="https://i.namu.wiki/i/1W0wUxLcpIhn3qnk1oL1CKRRHVmvpsqWPaVPrMfqz3xlHoaf0PskfTdWrPX3bG5Vtolx2-uUqkOQulLIeAhFdPdW8fq-k3Oq4IZWUoqf6BDJjzuu3SqD1g3kFOahRsuXl9DQeJ3GIod8nzdgHt4Ung.svg" />
        키움 히어로즈
      </KiwoomHeros>
      <LgTwins>
        <LgImg src="https://i.namu.wiki/i/kFcjn8hfYSdBLnK2_nh_WETHhm5tudy6lT0Y7V9ewBoUuaO8wEIeXpfUHUlpyf_8w0zCDZR7KQxRlfDpgAzYSr0B0j4aPhkQWXXpupRjlfiXT8P1-HJRTWv3mCTRXvpVF5cbRCX70wwXxekVVzaNIg.svg" />{" "}
        LG 트윈스
      </LgTwins>
      <NcDinos>
        <NcImg src="https://i.namu.wiki/i/1MT0u8IY04bX68HjVNohwMc6wo4DlsQF6mD2YlzuD1q3LYJYjQotNNAeK0PeSI1ronSTlIgwWvOqJKXGelswE6kQGuNyY-c90HNh5LlhmKA-SS0511ta_rSUU2yf4H0XnF4bKKuxq6slFPwhw_ZHAg.svg" />
        NC 다이노스
      </NcDinos>
      <DoosanBears>
        <DoosanImg src="https://i.namu.wiki/i/eXJ8bTw7fjHHjdqk52HA5E2QXvV88Zj6QFbqW6Q4rCwktITn--8I8drqYVYrA0mG_uTjo8Nyle8t7qTxAw02iTPujwSG40_N8m26loOMlYL_gm_L8XsP2f_WgREMPorwtzB6PLwTUS4Qn2470ySLVw.svg" />{" "}
        두산 베어스
      </DoosanBears>
      <SsgLanders>
        <SsgImg src="https://i.namu.wiki/i/mm8_Ei8Nkqhmv0rdYr0n344GQtI-f0wcKI2uj7hknQxfquVN47FMQmUDh0hLmVOPrJlnjxOWUSYVMNOg62UXnYERSO6AGhbBQ5_P11vkuo-wS24BmHgfN7RgA-dyakM6nyXmvhcp-9EjwvmhRIZeyg.svg" />{" "}
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
  padding: 2rem;
`;

const TeamItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  margin: 0 1rem;
  &:hover {
    color: #799d40;
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
