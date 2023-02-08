import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { signIn, useSession } from "next-auth/react";
import { useForm } from 'react-hook-form';

function Login() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const submitHandler = async ({ email, password }) => {
        try {
            setLoading(true);
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                toast.error(result.error);
            }
            //setLoading(false);
        } catch (err) {
            toast.error(getError(err));
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
                            <form onSubmit={handleSubmit(submitHandler)}>

                                <div className="input-box">
                                    <label className="label-text">Email Adress</label>
                                    <div className="form-group">
                                        <span className="la la-envelope form-icon"></span>
                                        <input 
                                            type="email"
                                            {...register('email', {
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                                message: 'Please enter valid email',
                                            },
                                            })} 
                                            className="form-control"
                                            placeholder="Enter your email"
                                            id="email" />
                                        {errors.email && (
                                            <div className="error">{errors.email.message}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="input-box">
                                    <label className="label-text">Password</label>
                                    <div className="form-group">
                                        <span className="la la-lock form-icon"></span>
                                        <input 
                                            type="password" 
                                            {...register('password', {
                                                required: 'Please enter password',
                                                minLength: { value: 6, message: 'password should be more than 5 chars' },
                                            })}
                                            className="form-control" 
                                            id="password"
                                            autoFocus
                                            placeholder="Enter password" />
                                        {errors.password && (
                                            <div className="error">{errors.password.message}</div>
                                        )}
                                    </div>
                                </div>

                                <hr />

                                <div className="form-group mt-3">
                                    <button type="submit" className="btn btn-default btn-lg btn-block effect" data-style="zoom-in">
                                        {loading ? <SyncOutlined spin /> : "Login"}
                                    </button>
                                </div>
                            </form>

                            <div className="btn-box pb-1 mt-2">
                                <Link href={`/register?redirect=${redirect || '/'}`} className="btn btn-block btn-outline-primary effect ladda-sm" data-style="zoom-in">Register</Link>
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