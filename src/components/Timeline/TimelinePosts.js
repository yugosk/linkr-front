import styled from "styled-components";
import React from "react";
import { MdBrokenImage } from "react-icons/md";
import { Oval } from "react-loader-spinner";

const Post = styled.div`
  display: flex;
  background-color: #171717;
  flex-direction: row;
  width: 611px;
  height: 276px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 30px;
  padding: 20px 0 20px 0;

  @media (max-width: 612px) {
    width: 100%;
    height: 232px;
    border-radius: 0;
    padding: 10px 0 8px 0;
    margion-bottom: 16px;
  }
`;

const PostLeft = styled.div`
  width: 14%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 16px;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
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

  h1 {
    font-family: "Lato";
    font-weight: 400;
    font-size: 19px;
    color: #ffffff;
    text-align: left;
    line-height: 23px;
    margin-bottom: 7px;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 17px;
    color: #b7b7b7;
    text-align: left;
    line-height: 20px;
    margin-bottom: 12px;
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
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 12px;

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
  height: 100%;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 12px 12px 0;
  }
`;

const NoPosts = styled.p`
  text-align: center;
  font-family: "Lato";
  font-size: 28px;
  font-weight: 400px;
  color: #ffffff;
`;

function SinglePost({
  picture,
  username,
  description,
  url,
  metaTitle,
  metaImage,
  metaDescription,
}) {
  if (metaImage === "Metadata not available") {
    return (
      <Post>
        <PostLeft>
          <img src={picture} />
        </PostLeft>
        <PostContent>
          <h1>{username}</h1>
          <p>{description}</p>
          <PostSnippet>
            <SnippetText>
              <h1>{metaTitle}</h1>
              <p>{metaDescription}</p>
              <a href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            </SnippetText>
            <SnippetImage>
              <MdBrokenImage size={"32px"} color="#b7b7b7" />
            </SnippetImage>
          </PostSnippet>
        </PostContent>
      </Post>
    );
  } else {
    return (
      <Post>
        <PostLeft>
          <img src={picture} />
        </PostLeft>
        <PostContent>
          <h1>{username}</h1>
          <p>{description}</p>
          <PostSnippet>
            <SnippetText>
              <h1>{metaTitle}</h1>
              <p>{metaDescription}</p>
              <a href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            </SnippetText>
            <SnippetImage>
              <img src={metaImage} />
            </SnippetImage>
          </PostSnippet>
        </PostContent>
      </Post>
    );
  }
}

function MapPosts({ posts }) {
  if (posts.length === 0) {
    return <NoPosts>There are no posts yet</NoPosts>;
  } else {
    return posts.map((post, index) => {
      return (
        <SinglePost
          key={index}
          picture={post.picture}
          username={post.username}
          description={post.description}
          url={post.url}
          metaTitle={post.metaTitle}
          metaImage={post.metaImage}
          metaDescription={post.metaDescription}
        />
      );
    });
  }
}

export default function PostList({ loading, posts }) {
  if (loading) {
    return (
      <Oval height={80} width={80} color="#1877F2" secondaryColor="#0CF0F9" />
    );
  } else {
    return <MapPosts posts={posts} />;
  }
}
