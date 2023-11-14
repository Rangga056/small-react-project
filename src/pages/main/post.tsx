import { Post as IPost } from "./main";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "./post.css";

interface Props {
  post: IPost;
}

interface Like {
  userId: string;
  likeId: string;
}

export const Post = (props: Props) => {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const { post } = props;
  const [user] = useAuthState(auth);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async (data: any) => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async (data: any) => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);

      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="post">
      <div className="post-wrapper">
          <div className="post-title">
            <h1>{post.title}</h1>
          </div>
          <div className="body post-description">
            <p>{post.description}</p>
          </div>
          <div className="post-footer">
            <p className="username">@{post.username}</p>
            <div className="likes"> 
              {likes && <p>Likes: {likes?.length}</p>}
              <button className="post-button" onClick={hasUserLiked ? removeLike : addLike}>
                {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};
