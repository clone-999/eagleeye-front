import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import PropertyAd from '../../components/PropertyAd';
import { useRouter } from "next/router";
import { getError } from '../../utils/error';
import { useSession } from 'next-auth/react';

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, properties: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        state;
    }
}

const Ads = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [
        { loading, error, properties },
        dispatch,
    ] = useReducer(reducer, {
        loading: true,
        properties: [],
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/properties`);
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        };

        fetchData();
    }, []);

    return (
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
                                    {properties?.length > 0 && properties.map(property => (
                                        <PropertyAd key={property.slug} property={property} user={session.user} />
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Ads.auth = true;

export default Ads