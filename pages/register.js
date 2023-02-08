import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

function Register() {
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
        getValues,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ name, email, password }) => {
        try {
            setLoading(true);
            await axios.post('/api/auth/signup', {
                name,
                email,
                password,
            });

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                toast.error(result.error);
            }
            setLoading(false);
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
                            <h5 className="modal-title title">Register</h5>
                            <p className="font-size-14">Please enter all credentials to signup</p>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="contact-form-action">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="input-box">
                                    <label className="label-text">Full Name</label>
                                    <div className="form-group">
                                        <span className="la la-user form-icon"></span>
                                        <input 
                                            type="text"
                                            {...register('name', {
                                                required: 'Please enter name',
                                            })}
                                            className="form-control" 
                                            placeholder="Enter Your Full Name" 
                                            id="name"
                                            autoFocus />
                                        {errors.name && (
                                            <div className="error">{errors.name.message}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="input-box">
                                    <label className="label-text">Email Adress</label>
                                    <div className="form-group">
                                        <span className="la la-envelope form-icon"></span>
                                        <input 
                                            type="email" 
                                            {...register('email', {
                                                required: 'Please enter email',
                                                pattern: {
                                                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                                  message: 'Please enter valid email',
                                                },
                                            })}
                                            className="form-control" 
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
                                            className="form-control" 
                                            type="password" 
                                            placeholder="Enter password" 
                                            {...register('password', {
                                                required: 'Please enter password',
                                                minLength: { value: 6, message: 'password is more than 5 chars' },
                                            })} 
                                            id="password"
                                            autoFocus />
                                        {errors.password && (
                                            <div className="error">{errors.password.message}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="input-box">
                                    <label className="label-text">Confirm Password</label>
                                    <div className="form-group">
                                        <span className="la la-lock form-icon"></span>
                                        <input 
                                            className="form-control" 
                                            type="password" 
                                            placeholder="Confirm password" 
                                            {...register('confirmPassword', {
                                                required: 'Please enter confirm password',
                                                validate: (value) => value === getValues('password'),
                                                minLength: {
                                                  value: 6,
                                                  message: 'confirm password is more than 5 chars',
                                                },
                                            })}
                                            id="confirmPassword"
                                            autoFocus />
                                        {errors.confirmPassword && (
                                            <div className="error">
                                            {errors.confirmPassword.message}
                                            </div>
                                        )}

                                        {errors.confirmPassword &&
                                            errors.confirmPassword.type === 'validate' && (
                                            <div className="error">Password do not match</div>
                                        )}
                                    </div>
                                </div>

                                <hr />

                                <div className="form-group mt-3">
                                    <button type="submit" className="btn btn-default btn-lg btn-block effect" data-style="zoom-in">
                                        {loading ? <SyncOutlined spin /> : "Register"}
                                    </button>
                                </div>
                            </form>

                            <div className="btn-box pb-1 mt-2">
                                <Link href={`/register?redirect=${redirect || '/'}`} className="btn btn-block btn-outline-primary effect ladda-sm" data-style="zoom-in">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col align-self-end"></div>
            </div>
        </div>
    )
}

export default Register