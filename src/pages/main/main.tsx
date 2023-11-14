import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  username: string;
}

export const Main = () => {
  const [postList, setPostList] = useState<Post[] | null>(null);
  const postRef = collection(db, "posts");

  const getPost = async () => {
    const data = await getDocs(postRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPost();
  }, []);

  return(
    <div>
      <h1>
        {postList?.map((post) => (
          <Post post={post} />
        ))}
      </h1>
    </div>
  );
};
