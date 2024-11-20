import React from "react";

const partyPostWrite = () => {
  const [formData, setFormData] = useState({
    id: "JWT 토큰에서 가져오는 user id",
    title: "",
    content: "",
    matchloc: "",
    match_date: "",
    MaxPeopleNum: "",
    CurrentPeopleNum: "",
    WriteAt: "",
  });
  //  input에 작성을 해서 이벤트가 발생하면 내가 만든 state에 해당하는 값이 덧씌워지도록하는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 현재 시간을 WriteAt에 추가 (만약 자동으로 현재 시간 추가 필요시)
    const currentDate = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19); // yyyy-mm-dd hh:mm:ss 형식
    // 뒷단에서 하면 이 과정은 생략됨
    const dataToSend = {
      data: { ...formData, WriteAt: currentDate },
    };

    fetch(`http://localhost:8080/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json()) // 응답을 JSON 형식으로 변환
      .then((data) => {
        if (data.status === "success") {
          console.log("Success:", data.message); // 성공 메시지 출력
          // 성공 시 추가 작업 (예: 포스트 ID 출력)
          console.log("Post ID:", data.data.post_id);
        } else {
          throw new Error(data.message); // 실패 시 에러 발생
        }
      })
      .catch((error) => {
        console.error("Error:", error.message); // 에러 메시지 출력
      });

    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <label>제목:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>상세모집요강?글내용:</label>
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>경기 장소:</label>
            <input
              type="text"
              name="matchloc"
              value={formData.matchloc}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>경기 날짜:</label>
            <input
              type="datetime-local"
              name="match_date"
              value={formData.match_date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>최대 인원:</label>
            <input
              type="number"
              name="MaxPeopleNum"
              value={formData.MaxPeopleNum}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>현재 인원:</label>
            <input
              type="number"
              name="CurrentPeopleNum"
              value={formData.CurrentPeopleNum}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">제출</button>
        </form>
      </>
    );
  };
};

export default partyPostWrite;
