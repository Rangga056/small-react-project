import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./create-form.css";

interface CreateFormData{
  title: string;
  description: string;
}

export const CreateForm = () => {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add description")
  })

  const{ register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
    resolver: yupResolver(schema)
  })

  const postsRef = collection(db, "posts")

  const onCreatePost = async (data: any) => {
    await addDoc(postsRef, {
      ...data,//u can use this because data.title and description already included in data
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  }

  return(
    <div className="formWrapper">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input className="titleInput" placeholder="title..." {...register("title")}/>
        <p>{errors.title?.message}</p>
        <textarea className="descriptionInput" placeholder="description..." {...register("description")}/>
        <p>{errors.description?.message}</p>
        <input className="inputSubmit" type="submit"  />
      </form>
    </div>
  ) 
}