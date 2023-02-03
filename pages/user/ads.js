import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import PropertyAd from '../../components/PropertyAd';
import UserRoute from '../../components/routes/UserRoute';
import { Context } from '../../context';

const Ads = () => {
    const {
        state: { user },
    } = useContext(Context);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        const { data } = await axios.get("/api/partner-properties");
        setProperties(data);
    };

    return (
        <UserRoute>
            <div className="container">
                <div className="sidebar mb-0 mt-5">
                    <div className="sidebar-widget">
                        <h3 className="title stroke-shape" style={{textTransform: "capitalize"}}>My Ads</h3>
                    </div>

                    <div className="sidebar-widget">
                        <div className="row">
                            <div className="col-lg-12">
                                <section data-ref="container" id="data">
                                    <ul>
                                        {properties.length > 0 && properties.map(property => (
                                            <PropertyAd key={property.slug} property={property} user={user} />
                                        ))}
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserRoute>
    )
}

export default Ads