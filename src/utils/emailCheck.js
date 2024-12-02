export const emailCheck = async (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  try {
    const response = await fetch(`http://localhost:8080/api/user/username?username=${email}`);
    const json = await response.json();
    if(json && json.status === 'success') {
      if(regex.test(email)) {
        return {
          error: false,
          msg: "올바른 이메일입니다."
        }
      } else {
        return {
          error: true,
          msg: "형식이 다른 이메일입니다."
        }
      }
    }
  } catch(err) {
    return {
      error: true,
      msg: '데이터를 가지고 오는데 오류가 있습니다'
    }
  }
};
