import axios from "axios";
import { useState } from "react";
import "./login.css";

function Login(props) {
    const [cin, setcin] = useState("JK53677");
    const [password, setpassword] = useState("123456");
    console.log(props);

    const onButtonClick = async (e) => {
        e.preventDefault();
        console.log(cin, password);
        const url = "https://notes.devlop.tech/api/login";
        const data = {
            "cin": cin,
            "password": password
        };

        const resp = await axios.post(url, data);
        console.log(resp);
        localStorage.setItem("token", resp.data.token)

        props.setIsconnected(true);
    }

    return (
        <div className="login" id="login-container">
            <h2 id="login-title">LOGIN</h2>
            <form className="loginform" action="" id="login-form">
                <input
                    id="input-cin"
                    value={cin}
                    type="text"
                    onChange={e => setcin(e.target.value)}
                    placeholder="CIN"
                />
                <br />
                <input
                    id="input-password"
                    value={password}
                    type="password"
                    onChange={e => setpassword(e.target.value)}
                    placeholder="Password"
                />
                <br />
                <button
                    id="login-button"
                    className="loginbutton"
                    type="button"
                    onClick={onButtonClick}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
