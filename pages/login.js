import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { serverUrl } from "../utils/fetchApi";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // state
    const {
        state: { user },
        dispatch,
    } = useContext(Context);
    // const { user } = state;

    // router
    const router = useRouter();

    useEffect(() => {
        if (user !== null) router.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.table({ name, email, password });
        try {
          setLoading(true);
          const { data } = await axios.post(`${serverUrl}/api/login`, {
            email,
            password,
          });
          // console.log("LOGIN RESPONSE", data);
          dispatch({
            type: "LOGIN",
            payload: data,
          });
          // save in local storage
          window.localStorage.setItem("user", JSON.stringify(data));
          // redirect
          router.push("/user");
          // setLoading(false);
        } catch (err) {
          toast(err.response.data);
          setLoading(false);
        }
    };

    return (
        <div className="cd-main-content container">
            <div className="row mt-5 mb-5">
                <div className="col col align-self-start"></div>
                <div className="modal-content col align-self-center">
                    <div className="modal-header">
                        <div>
                            <h5 className="modal-title title">Login</h5>
                            <p className="font-size-14">Welcome Back</p>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="contact-form-action">
                            <form onSubmit={handleSubmit}>

                                <div className="input-box">
                                    <label className="label-text">Email Adress</label>
                                    <div className="form-group">
                                        <span className="la la-envelope form-icon"></span>
                                        <input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" value={email} required />
                                    </div>
                                </div>

                                <div className="input-box">
                                    <label className="label-text">Password</label>
                                    <div className="form-group">
                                        <span className="la la-lock form-icon"></span>
                                        <input className="form-control" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                </div>

                                <hr />

                                <div className="form-group mt-3">
                                    <button type="submit" disabled={!email || !password || loading} className="btn btn-default btn-lg btn-block effect" data-style="zoom-in">
                                        {loading ? <SyncOutlined spin /> : "Login"}
                                    </button>
                                </div>
                            </form>

                            <div className="btn-box pb-1 mt-2">
                                <Link href="/register" className="btn btn-block btn-outline-primary effect ladda-sm" data-style="zoom-in">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col align-self-end"></div>
            </div>
        </div>
    )
}

export default Login