const express = require("express");
const app = express();
const port = 8080;

// 특정 팀의 데이터를 반환하는 API
app.get("/api/teams/:teamName", (req, res) => {
  const teamName = req.params.teamName;
  const teamData = teamsData[teamName];

  if (teamData) {
    res.json({
      status: "success",
      message: `${teamName} 데이터 가져오기 성공`,
      data: teamData,
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "팀을 찾을 수 없습니다.",
    });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
