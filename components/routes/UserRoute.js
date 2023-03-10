import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { serverUrl } from "../../utils/fetchApi";

const UserRoute = ({ children, showNav = true }) => {
  // state
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/current-user`);
      console.log("check here", ok);
      if (data.ok) {
        setOk(true)
      } else {
        return router.push("/login")
      }
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <>
            {children}
        </>
      )}
    </>
  );
};

export default UserRoute;
