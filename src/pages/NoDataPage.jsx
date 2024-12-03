import React from 'react';
import Header from "../components/MainPage/Header/Header";
import styled from 'styled-components';

const NoDataPage = ({title, info}) => {
    return (
        <>
          <Header />
          <Body>
          <Title>{title}</Title>
            <PostContainer>
                <NoDataImg src='/public/assets/nodata.svg'/>
                <Info>{info}</Info>
            </PostContainer>
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

const PostContainer = styled.div`
margin: 2rem;
background: white;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:65%;
`;

const NoDataImg = styled.img`
width:180px;
height:180px;
`;

const Info = styled.p`
padding-top:2rem;
font-size: 1.5rem;
font-weight:600;
color:#878484;
`;
export default NoDataPage;