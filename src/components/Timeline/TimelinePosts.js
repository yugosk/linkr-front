import React from "react";
import { Oval } from "react-loader-spinner";
import NewPosts from "../Posts/PostsComponent";
import { PostsContainer } from "../Posts/StyledPosts";

export default function PostList({
  loading,
  posts,
  userId,
  token,
  newPosts,
  count,
  setPostList,
  getPosts,
}) {
  if (loading) {
    return (
      <Oval height={80} width={80} color="#1877F2" secondaryColor="#0CF0F9" />
    );
  } else {
    return (
      <PostsContainer>
        <NewPosts
          postList={posts}
          newPostList={newPosts}
          userId={userId}
          token={token}
          count={count}
          setPostList={setPostList}
          getPosts={getPosts}
        />
      </PostsContainer>
    );
  }
}
