import styled from "styled-components";

export const Post = styled.div`
  display: flex;
  background-color: #171717;
  flex-direction: row;
  width: 611px;
  min-height: 276px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 30px;
  box-sizing: content-box;
  padding-bottom: 20px;

  @media (max-width: 612px) {
    width: 100%;
    height: 232px;
    border-radius: 0;
    padding: 0 0 8px 0;
    margion-bottom: 16px;
  }
`;

export const PostLeft = styled.div`
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
  }

  @media (max-width: 612px) {
  }
`;

export const PostContent = styled.div`
  width: 86%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 17px;
  position:relative;
  //border: 5px solid blue;
  h1,a {
    font-family: "Lato";
    font-weight: 400;
    font-size: 19px;
    color: #ffffff;
    text-align: left;
    line-height: 23px;
    margin-bottom: 7px;
  }
  a:hover{
    cursor:pointer;
    text-decoration:underline;
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
  .icons{
    //background-color:blue;
    position:absolute;
    top:0px;
    right:24px;
    
  }
  svg {
    color:#ac0000;
    height: 24px;
    width: 24px;
    margin-left:14px;
    :hover{
      cursor:pointer;
    }
  }
  .mymodal{
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

  .mymodal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  
    border: 1px solid #ccc;
    background: #fff;
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
  }
  
  .myoverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
  }

.ReactModal__Overlay {
  opacity: 0;
  transition: opacity 500ms ease-in-out;
}

.ReactModal__Overlay--after-open {
  opacity: 1;
}

.ReactModal__Overlay--before-close {
  opacity: 0;
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

export const PostSnippet = styled.div`
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

export const SnippetText = styled.div`
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

export const SnippetImage = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 0 12px 12px 0;
    object-fit: cover;
  }
`;

export const NoPosts = styled.p`
  text-align: center;
  font-family: "Lato";
  font-size: 28px;
  font-weight: 400px;
  color: #ffffff;
`;

export const StyledLikes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 35px;

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