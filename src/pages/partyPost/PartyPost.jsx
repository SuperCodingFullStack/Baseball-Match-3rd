import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const partyPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/post/${id}`);
        const data = await response.json();
        console.log("서버에서 받아온 해당 글에 대한 정보", data);
        setPost(data);
      } catch (error) {
        console.error("서버에서 글받아오면서 문제발생", error);
      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <div>뭐지</div>
    </>
  );
};

export default partyPost;
