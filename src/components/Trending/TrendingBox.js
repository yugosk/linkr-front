import axios from "axios";
import { Link } from "react-router-dom";
import BoxStyles from "./BoxStyles";
import { useState, useEffect } from "react";


export default function TrendingBox(){
    const [tagsList,setTagsList] = useState([]);

    async function getTags() {
        try {
          const promise = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/trendingtags`
          );
          setTagsList(promise.data);
        } catch (err) {
          console.log(err);
        }
    }
    useEffect(() => getTags(), []);
    
    function displayTag(tag){
        const link = '/hashtag/' + tag.trendingTags;
        return(
            <Link key={tag.tagId} to={link} ># {tag.trendingTags}</Link>
        )
    }


  async function getTags() {
    try {
      const promise = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/trendingtags`
      );
      setTagsList(promise.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => getTags(), []);

  function displayTag(tag) {
    const link = "/hashtag/" + tag.trendingTags;
    return (
      <Link key={tag.tagId} to={link}>
        # {tag.trendingTags}
      </Link>
    );
  }

  function TagList() {
    if (tagsList.length === 0) {
      return <p>No hashtags used yet</p>;
    } else {
      return tagsList.map(displayTag);
    }
  }

  return (
    <BoxStyles>
      <div className="trending">trending</div>
      <TagList />
    </BoxStyles>
  );
}
