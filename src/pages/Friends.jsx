import React from 'react';
import Header from "../components/MainPage/Header/Header";
import styled from 'styled-components';

const Friends = () => {
    // const [friends, setFriends] = useState([]); // 친구 목록 데이터 상태

    // useEffect(() => {
    //     axios.get("http://localhost:8080/api/friend")
    //         .then((response) => {
    //             setFriends(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('데이터 불러오기 실패:', error);
    //         });
    // }, []);

    const defaultImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    return (
        <>
         <Header />
         <Body>
            <Title>친구 목록</Title>
            <FriendsContainer>
            <FriendsList>
                {/* {friends.map((friend,index) => ( */}
            <FriendItem>
            <Profile src={defaultImg} alt="Profile" />
            <FriendDetails>
                <FriendsItem>username:</FriendsItem>
                <FriendsItem>MyTeam:</FriendsItem>
            </FriendDetails>
            </FriendItem>
             {/* ))} */}
            <ChatButton>채팅하기</ChatButton>
            </FriendsList>
            </FriendsContainer>
            </Body>  
        </>
    );
};

const Body = styled.div`
background: #f1f5f9;
position:absolute;
top:90px;
width:100vw;
height: 100%;
`;

const Title = styled.h1`
margin:2rem;
font-weight:600;
font-size:1.7rem;
`;

const FriendsContainer = styled.div`
display:grid;
grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
gap:2rem;
`;

const FriendsList = styled.ul`
border:1px solid #ddd;
list-style: none;
width: 500px;
margin-left:2rem;
margin-bottom:2rem;
background:white;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
display:flex;
justify-content:space-between;
padding:0.6rem;
`;

const FriendItem = styled.li`
display:flex;
flex-direction:row; 
align-items:center;
padding:1rem;
`;

const FriendDetails = styled.div`
  margin-left: 1rem;
  display:flex;
  flex-direction:column;
`;

const FriendsItem = styled.p`
  margin: 0.3rem 0;
  font-size: 1rem;
  font-weight:bold;
`;

const Profile = styled.img`
width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 50%;
  padding: 0.8rem;
`;


const ChatButton = styled.button`
width:100px;
height:40px;
background-color:gray;
color:white;
border:none;
border-radius:8px;
font-size:1rem;
cursor:pointer;
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
align-self:end;
`;
export default Friends;