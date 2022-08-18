import styled from "styled-components";
import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { MdBrokenImage } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart,AiTwotoneDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import {  Post, PostContent, PostLeft, PostSnippet, SnippetText, SnippetImage,
NoPosts, StyledLikes} from "./PostStyles.js"


function defineTooltip(likes, isLiked, count, userId) {
  const newLikes = likes.filter((i) => i.userId !== userId);
  if (likes.length === 0) {
    return "Nobody liked this post yet :(";
  } else if (likes.length === 1) {
    if (isLiked) {
      return "You";
    } else {
      return `${likes[0].username}`;
    }
  } else if (likes.length === 2) {
    if (isLiked) {
      return `You and ${newLikes[0].username}`;
    } else {
      return `${likes[0].username} and ${likes[1].username}`;
    }
  } else {
    if (isLiked) {
      return `You, ${newLikes[0].username} and other ${count - 2} people`;
    } else {
      return `${likes[0].username}, ${likes[1].username} and other ${
        count - 2
      } people`;
    }
  }
}

function PostLikes({ isLiked, likes, postId, userId, token }) {
  const [liked, setLiked] = useState(isLiked);
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(likes.length);
  const [tooltip, setTooltip] = useState(
    defineTooltip(likes, isLiked, count, userId)
  );

  async function postLike(postId) {
    const configs = {
      headers: { Authorization: token },
    };
    setDisabled(true);
    if (liked) {
      try {
        console.log(configs);
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/likes/${postId}`,
          configs
        );
        setLiked(false);
        setCount(count - 1);
        setTooltip(defineTooltip(likes, isLiked, count, userId));
      } catch {
        alert("There was an error unliking the post, try again later");
      } finally {
        setDisabled(false);
      }
    } else {
      try {
        console.log(configs);
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/likes/${postId}`,
          {},
          configs
        );
        setLiked(true);
        setCount(count + 1);
        setTooltip(defineTooltip(likes, isLiked, count, userId));
      } catch {
        alert("There was an error liking the post, try again later");
      } finally {
        setDisabled(false);
      }
    }
  }

  if (liked) {
    return (
      <StyledLikes liked={true}>
        <AiFillHeart onClick={!disabled ? () => postLike(postId) : null} />
        <p data-tip={tooltip}>{count} likes</p>
        <ReactTooltip place="bottom" type="light" />
      </StyledLikes>
    );
  } else {
    return (
      <StyledLikes liked={false}>
        <AiOutlineHeart onClick={!disabled ? () => postLike(postId) : null} />
        <p data-tip={tooltip}>{count} likes</p>
        <ReactTooltip place="bottom" type="light" />
      </StyledLikes>
    );
  }
}

function SinglePost({
  postId,
  picture,
  postOwner,
  username,
  description,
  url,
  metaTitle,
  metaImage,
  metaDescription,
  likes,
  userId,
  token,
  isLiked,
}) {
  const tagStyle = {
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  };

  const navigate = useNavigate();

  Modal.setAppElement(document.querySelector(".root"));

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  async function deleting(postId){
  /*const configs = {
      headers: { Authorization: `${token}` },
    };
    //console.log(token);
    if (window.confirm("Deletar post?")) {
      try{
        await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/deleting/${postId}`,
        configs
        );
        alert('post deletado');
      } catch(error) {
        console.log(error);
        alert("There was an error deleting the post, try again");
      }
    }*/

  }

  const [editingPost,setEditingPost] = useState(false);
  async function editing(){
    setEditingPost(!editingPost);
  }



  const link = '/user/' + postOwner;

  if (metaImage === "Metadata not available" || metaImage === "") {
    return (
      <Post>
        <PostLeft>
          <img src={picture} />
          <br />
          <PostLikes
            likes={likes}
            isLiked={isLiked}
            postId={postId}
            userId={userId}
            token={token}
          />
        </PostLeft>
        <PostContent>
        {userId === postOwner ? <div className="icons">
          <BsPencilFill color="white"/>
          <AiTwotoneDelete color="white" onClick={() => toggleModal()}/>
        </div>
          : ""} 
          <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
          >
          <div>My modal dialog.</div>
          <button onClick={toggleModal}>Close modal</button>
          </Modal>
          <Link key={postId} to={link} >{username}</Link>
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}
          >
          <p>{description}</p>
          
            
          </ReactTagify>
          <PostSnippet>
            <SnippetText>
              <h1>{metaTitle}</h1>
              <p>{metaDescription.slice(0, 159)}</p>
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
          <br />
          <PostLikes
            likes={likes}
            isLiked={isLiked}
            postId={postId}
            userId={userId}
            token={token}
          />
        </PostLeft>
        <PostContent>
        {userId == postOwner ? <div className="icons">
          <BsPencilFill color="white" onClick={() => editing()}/>
          <AiTwotoneDelete color="white" onClick={() => toggleModal()}/>
        </div>
         : ""}
         <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
          >
          <div>My modal dialog.</div>
          <button onClick={toggleModal}>Close modal</button>
        </Modal>
          <Link key={postId} to={link} >{username}</Link>
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}
          >
          <p>{description}</p>
          </ReactTagify>
          <PostSnippet>
            <SnippetText>
              <h1>{metaTitle}</h1>
              <p>{metaDescription.slice(0, 159)}</p>
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

function MapPosts({ posts, userId, token }) {
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
          postOwner={post.postOwner}
          metaTitle={post.metaTitle}
          metaImage={post.metaImage}
          metaDescription={post.metaDescription}
          likes={post.likes}
          userId={userId}
          token={token}
          postId={post.id}
          isLiked={post.isLiked}
        />
      );
    });
  }
}

export default function PostList({ loading, posts, userId, token }) {
  if (loading) {
    return (
      <Oval height={80} width={80} color="#1877F2" secondaryColor="#0CF0F9" />
    );
  } else {
    return <MapPosts posts={posts} userId={userId} token={token} />;
  }
}
