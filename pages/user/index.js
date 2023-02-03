import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const UserIndex = () => {
    const {
        state: { user },
    } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    return (
        <UserRoute>
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
                                        <form>
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
                                                                    <input className="form-control" type="text" name="name" value={user?.name} disabled />
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
                                                                    <input className="form-control" type="email" name="email" value={user?.email} disabled />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="section-block"></div>
                                            <div className="btn-box mt-4">
                                                <button type="submit" className="theme-btn" disabled>Save</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserRoute>
    )
}

export default UserIndex