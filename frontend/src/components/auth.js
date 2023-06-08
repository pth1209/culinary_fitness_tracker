import { useState } from "react"
import axios from "axios"
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Auth= () => {
    return <div className = "auth">
        <Login />
        <Register />
    </div>
}

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post("http://localhost:5000/auth/login", {
          username,
          password,
        });
  
        setCookies("access_token", response.data.token);
        console.log(response.data.token)
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };

    return <Form 
            sername = {username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            label = "Login" 
            onSubmit = {handleSubmit}/>
}

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:5000/auth/register", {username, password,})
            alert("Registration completed")
        } catch (error) {
            console.error(error)
        }
    }

    return <Form 
            username = {username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            label = "Register"
            onSubmit = {handleSubmit}/>
}

const Form = ({username, setUsername, password, setPassword, label, onSubmit }) => {
    return <div className = "register">
        <form onSubmit = {onSubmit}>
            <h2> {label} </h2>
            <div className = "register-user">
                <label htmlFor = "username">Username</label>
                <input 
                type = "text" 
                id = "username" 
                value = {username}
                onChange = {(event) => setUsername(event.target.value)} />
            </div>
            <div className = "register-user">
                <label htmlFor = "password">Passowrd</label>
                <input 
                type = "password" 
                id = "passowrd"
                value = {password} 
                onChange = {(event) => setPassword(event.target.value)} />
            </div>
            <button type = "submit">{label}</button>
        </form>
    </div>
}