import React from "react";
import { NoPosts, StyledNewPost } from "../Posts/StyledPosts";
import { HiRefresh } from "react-icons/hi";
import InfinitePosts from "./InfiniteScroll";

function MapPosts({ posts, userId, token, getPosts }) {
  if (posts === "No follows") {
    return (
      <NoPosts>You don't follow anyone yet. Search for new friends!</NoPosts>
    );
  } else {
    if (posts.length === 0) {
      if (window.location.pathname === "/timeline") {
        return <NoPosts>No posts found from your friends</NoPosts>;
      } else if (window.location.pathname.slice(1, 5) === "user") {
        return <NoPosts>This user has not posted anything yet</NoPosts>;
      } else {
        return <NoPosts>This hashtag has not been used yet</NoPosts>;
      }
    } else {
      return (
        <InfinitePosts
          posts={posts}
          userId={userId}
          token={token}
          getPosts={getPosts}
        />
      );
    }
  }
}

export default function NewPosts({
  postList,
  newPostList,
  userId,
  token,
  setPostList,
  getPosts,
}) {
  if (newPostList.length === 0) {
    return (
      <MapPosts
        posts={postList}
        userId={userId}
        token={token}
        getPosts={getPosts}
      />
    );
  } else {
    if (postList[0].id === newPostList[0].id) {
      return (
        <MapPosts
          posts={postList}
          userId={userId}
          token={token}
          getPosts={getPosts}
        />
      );
    } else {
      return (
        <>
          <StyledNewPost onClick={() => setPostList(newPostList)}>
            <p>{newPostList.length - postList.length} new posts, load more!</p>
            <HiRefresh />
          </StyledNewPost>
          <MapPosts
            posts={postList}
            userId={userId}
            token={token}
            getPosts={getPosts}
          />
        </>
      );
    }
  }
}
