import axios from "axios";
import { useState } from "react";
import "./login.css";


function Login(props) {
    const [cin, setcin]= useState("JK53677");
    const [password, setpassword]= useState("123456");
    console.log(props);

    const onButtonClick= async(e)=>{
        e.preventDefault();
        console.log(cin,password);
        const  url="https://notes.devlop.tech/api/login";
        const data={
        "cin": cin,
        "password": password
      };
        
        const resp= await axios.post(url,data);
        console.log(resp);
        localStorage.setItem("token",resp.data.token)

       
        props.setIsconnected(true);
        
    }
    
    return(
        <div className="login">
            <h2>login</h2>
            <form  className="loginform" action="">
                <input id="input1" value={cin} type="text" onChange={e=>setcin(e.target.value)} placeholder="CIN" />
                <br />
                <input  id="input2" value={password} type="password" onChange={e=>setpassword(e.target.value)} placeholder="password" />
                <br />
                <button className="loginbutton"  type="button" onClick={onButtonClick}>login
                </button>

            </form>

        </div>

    );


}
export default Login;
