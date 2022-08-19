import styled from "styled-components";

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 44px;
  width: 100%;
  max-width: 611px;
`;

const Post = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  background-color: #171717;
  flex-direction: row;
  width: 611px;
  min-height: 276px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  box-sizing: content-box;
  padding-bottom: 20px;
  @media (max-width: 612px) {
    width: 100%;
    height: 232px;
    border-radius: 0;
    padding: 0 0 8px 0;
    /* margin-bottom: 16px; */
  }
`;

const PostLeft = styled.div`
  width: 14%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 17px;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    margin-bottom: 19px;
  }

  @media (max-width: 612px) {
  }
`;

const PostContent = styled.div`
  width: 86%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 17px;
  position: relative;
  //border: 5px solid blue;
  h1,
  a {
    font-family: "Lato";
    font-weight: 400;
    font-size: 19px;
    color: #ffffff;
    text-align: left;
    line-height: 23px;
    margin-bottom: 7px;
  }
  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 17px;
    color: #b7b7b7;
    text-align: left;
    line-height: 20px;
    margin-bottom: 12px;
    padding-right: 22px;
    min-height: 52px;
  }
  .icons {
    //background-color:blue;
    position: absolute;
    top: 0px;
    right: 24px;
  }
  svg {
    color: #ac0000;
    height: 24px;
    width: 24px;
    margin-left: 14px;
    :hover {
      cursor: pointer;
    }
  }
  .mymodal {
    width: 597px;
    height: 262px;
    left: 413px;
    top: 349px;

    background: #333333;
    border-radius: 50px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border: 1px solid #ccc;
    overflow: auto;
    //border-radius: 4px;
    outline: none;
    padding: 20px;
  }

  @media (max-width: 612px) {
    padding: 10px 15px 0 15px;
    width: 97%;

    h1 {
      font-size: 17px;
    }

    p {
      font-size: 15px;
    }
  }
`;

const PostSnippet = styled.div`
  display: flex;
  flex-direction: row;
  width: 503px;
  min-height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  margin-bottom: 20px;

  @media (max-width: 612px) {
    width: 97%;
    height: 155px;
    border: 1px solid #4d4d4d;
    border-radius: 12px;
  }
`;

const SnippetText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  text-align: left;
  width: 70%;
  height: 100%;
  padding: 24px 0 23px 20px;
  box-sizing: border-box;

  h1 {
    font-family: "Lato";
    font-weight: 400;
    font-size: 16px;
    color: #cecece;
    margin-bottom: 5px;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    color: #9b9595;
    margin-bottom: 13px;
  }

  a {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    color: #cecece;
    text-decoration: none;
    word-break: break-all;
  }

  @media (max-width: 612px) {
    padding: 7px 7px 8px 11px;

    h1 {
      font-size: 11px;
      margin-bottom: 4px;
    }

    p {
      font-size: 9px;
      margin-bottom: 4px;
    }

    a {
      font-size: 9px;
    }
  }
`;

const SnippetImage = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 0 12px 12px 0;
    object-fit: cover;
  }
`;

const NoPosts = styled.p`
  text-align: center;
  font-family: "Lato";
  font-size: 28px;
  font-weight: 400px;
  color: #ffffff;
`;

const StyledLikes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 35px;
  margin-bottom: 17px;

  svg {
    color: ${(props) => (props.liked ? "#ac0000" : "#ffffff")};
    height: 18px;
    width: 20px;
    margin-bottom: 4px;
    cursor: pointer;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    text-align: center;
    color: #ffffff;
  }

  @media (max-width: 612px) {
    svg {
      height: 15px;
      width: 17px;
      margin-bottom: 12px;
    }

    p {
      font-size: 9px;
    }
  }
`;

const StyledNewPost = styled.div`
  display: flex;
  background-color: #1877f2;
  flex-direction: row;
  width: 611px;
  height: 61px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 17px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 21px 0 21px 0;
  cursor: pointer;

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: #ffffff;
    margin-right: 14px;
  }

  svg {
    color: #ffffff;
    width: 22px;
    height: 16px;
  }

  @media (max-width: 612px) {
    width: 100%;
    border-radius: 0;
    padding: 0 0 8px 0;
    margin-bottom: 16px;
  }
`;

const CommentIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    height: 26px;
    width: 26px;
    color: #ffffff;
    cursor: pointer;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    text-align: center;
    color: #ffffff;
  }
`;

const ModalStyle = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width: 597px;
height: 262px;
background: #333333;
border-radius: 50px;
p{
  width:350px;
  margin-bottom:40px;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  color: #FFFFFF;
}
button{
  width: 134px;
  height: 37px;
  margin-right:10px; 
  border:none;
  border-radius: 5px;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px; 
  :hover{
    cursor:pointer;
  }
}
.cancel{
  background-color:#ffffff;
  color: #1877F2;
}
.proceed{
  color:#ffffff;
  background-color: #1877F2;
}
`;

const OverlayStyle = styled.div`
display:flex;
justify-content:center;
align-items:center;
background: rgba(255, 255, 255, 0.9);
position: absolute;
width: 100%;
height: 100%;
left: 0px;
top: 0px;
`;

export {
  PostsContainer,
  Post,
  PostLeft,
  PostContent,
  PostSnippet,
  SnippetText,
  SnippetImage,
  NoPosts,
  StyledLikes,
  StyledNewPost,
  CommentIcon,
  ModalStyle,
  OverlayStyle,
};
