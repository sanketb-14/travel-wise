import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";


function User() {
  const { user, isAuthenticated,logout } = useAuth();
  if (!isAuthenticated) return null;
  const navigate = useNavigate();
  return (
    <div role="alert" className="alert w-80 shadow-lg absolute flex right-8  top-0 justify-evenly rounded-xl  z-10 ">
      <img src={user.avatar} alt="" className="stroke-info shrink-0 w-6 h-6" />
      <div>
        <h3 className="font-bold">Welcome back,</h3>
        <div className="text-xs text-secondary"> {user.name}!</div>
      </div>
      <Button type="secondary" onClick={()=>{
        logout()
        navigate('/')
      
    }}>logout</Button>
      
    </div>
  );
}

export default User;
