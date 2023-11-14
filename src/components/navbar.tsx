import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "./style/navbar.css"

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  }

  return (
    <div className="Navbar">
      <div className="outerWrapper">
        <div className="empty"></div>
        <div className="wrapper">
          <div className="links">
            <Link className="Link" to="/" > Home </Link>
            {!user ? (<Link className="Link" to="/login" > Login </Link>) : 
            (<Link className="Link" to="/createpost" > Create Post </Link>)
          }
          </div>

          <div className="Profile">
            {user && (
              <>
                <p>{user?.displayName} </p>
                <img src={user?.photoURL || ""} width="40px" height="40px" />
                <button onClick={signUserOut}>Sign Out</button>
              </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}