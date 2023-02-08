import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";

const Profile = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue('name', session.user.name);
        setValue('email', session.user.email);
    }, [session.user, setValue]);

    const submitHandler = async ({ name, email, password }) => {
        try {
        setLoading(true)
        await axios.put('/api/auth/update', {
            name,
            email,
            password,
        });
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        toast.success('Profile updated successfully');
        setLoading(false)
        if (result.error) {
            toast.error(result.error);
            setLoading(false)
        }
        } catch (err) {
            toast.error(getError(err));
            setLoading(false)
        }
    };

    return (
        <div className="container">
            <div className="sidebar mb-0 mt-5">
                <div className="sidebar-widget">
                    <h3 className="title stroke-shape" style={{textTransform: "capitalize"}}>My Account</h3>
                </div>
                <div className="sidebar-widget">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-box">
                                <div className="form-content">
                                    <form onSubmit={handleSubmit(submitHandler)}>
                                        <div className="table-form table-responsive contact-form-action">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td className="pl-0">
                                                            <div className="table-content">
                                                                <h3 className="title font-weight-medium">Full Name</h3>
                                                            </div>
                                                        </td>
                                                        <td>:</td>
                                                        <td>
                                                            <div className="form-group">
                                                                <span className="la la-user form-icon"></span>
                                                                <input 
                                                                    className="form-control" 
                                                                    type="text"
                                                                    id="name"
                                                                    {...register('name', {
                                                                        required: 'Please enter name',
                                                                    })}
                                                                    autoFocus
                                                                />
                                                                {errors.name && (
                                                                    <div className="text-red-500">{errors.name.message}</div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="pl-0">
                                                            <div className="table-content">
                                                                <h3 className="title font-weight-medium">Email</h3>
                                                            </div>
                                                        </td>
                                                        <td>:</td>
                                                        <td>
                                                            <div className="form-group">
                                                                <span className="la la-envelope form-icon"></span>
                                                                <input 
                                                                    className="form-control" 
                                                                    type="email"
                                                                    {...register('email', {
                                                                        required: 'Please enter email',
                                                                        pattern: {
                                                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                                                            message: 'Please enter valid email',
                                                                        },
                                                                    })}
                                                                />
                                                                {errors.email && (
                                                                    <div className="text-red-500">{errors.email.message}</div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="pl-0">
                                                            <div className="table-content">
                                                                <h3 className="title font-weight-medium">Password</h3>
                                                            </div>
                                                        </td>
                                                        <td>:</td>
                                                        <td>
                                                            <div className="form-group">
                                                                <span className="la la-envelope form-icon"></span>
                                                                <input 
                                                                    className="form-control" 
                                                                    type="password"
                                                                    id="password"
                                                                    {...register('password', {
                                                                        minLength: { value: 6, message: 'password is more than 5 chars' },
                                                                    })}
                                                                />
                                                                {errors.password && (
                                                                    <div className="error">{errors.password.message}</div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="pl-0">
                                                            <div className="table-content">
                                                                <h3 className="title font-weight-medium">Confirm Password</h3>
                                                            </div>
                                                        </td>
                                                        <td>:</td>
                                                        <td>
                                                            <div className="form-group">
                                                                <span className="la la-envelope form-icon"></span>
                                                                <input 
                                                                    className="form-control" 
                                                                    type="password"
                                                                    id="confirmPassword"
                                                                    {...register('confirmPassword', {
                                                                        validate: (value) => value === getValues('password'),
                                                                        minLength: {
                                                                            value: 6,
                                                                            message: 'confirm password is more than 5 chars',
                                                                        },
                                                                    })}
                                                                />
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
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="section-block"></div>
                                        <div className="btn-box mt-4">
                                            <button type="submit" className="theme-btn">
                                                {loading ? <SyncOutlined spin /> : "Save"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Profile.auth = true;

export default Profile