import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import Image from 'next/image';
import nl2br from 'react-nl2br';
import Property from '../../models/Property';
import db from '../../utils/db';

const PropertyView = ({ property }) => {

    return (
        <section className="tour-detail-area padding-bottom-90px">
            <div className="single-content-navbar-wrap menu section-bg" id="single-content-navbar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="single-content-nav" id="single-content-nav">
                                <ul>
                                    <li><a data-scroll="photos" href="#photos" className="scroll-link active">Apartment Photos</a></li>
                                    <li><a data-scroll="description" href="#description" className="scroll-link">Description</a></li>
                                    <li><a data-scroll="amenities" href="#amenities" className="scroll-link">Amenities</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" id='photos'>
                <div className="single-content-item my-4">
                    <div className="row">
                        <div className="col-md-7">
                            <h3 className="title font-size-26">{property.title}
                            </h3>

                            <div className="d-flex align-items-center pt-2">
                                <p className="mr-2">{property.address}</p>
                                <div className="Clear"></div>
                            </div>
                        </div>

                        <div className="col-md-2 bestvalue" style={{ fontSize: 16 }}>
                            <p><small>Price</small></p>
                            <p><strong>&nbsp;<NumericFormat value={property.price} displayType={'text'} thousandSeparator={true} prefix={'AED '} /></strong></p>

                        </div>

                        <div className="col-md-3">
                           
                        </div>
                    </div>
                </div>

                <div className="" style={{ borderRadius: 15, borderBlock: 'solid', overflow: 'hidden', overflowY: 'hidden !important', position: 'relative' }}>
                    <Carousel dotPosition={"right"} autoplay>
                        {property.photos.map((photo) => (
                            <div key={photo._id}>
                                <Image alt="Property Image" blurDataURL={photo.url} src={photo.url} width={1200} height={500} />
                            </div>
                        ))}
                    </Carousel>
                </div>

            </div>

            <div className="single-content-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="single-content-wrap padding-top-10px">
                                <div id="description" className="page-scroll">
                                    <div className="section-block"></div>
                                    <div className="single-content-item padding-top-30px padding-bottom-10px">
                                        <h3 className="title font-size-20">About {property.title}</h3>
                                        {nl2br(property.description)}
                                    </div>
                                    <div className="section-block"></div>
                                </div>
                            </div>

                            <div id="availability" className="page-scroll">
                                <div className="section-heading mt-3 mb-3">
                                    <h3 className="sec__title_left left-line">Property Information</h3>
                                </div>

                                <br />

                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>Type</td>
                                                    <th>{property.homeCategory}</th>
                                                </tr>
                                                <tr>
                                                    <td>Purpose</td>
                                                    <th>{property.mode}</th>
                                                </tr>
                                                <tr>
                                                    <td>Furnishing Status</td>
                                                    <th>{property.furnished ? "Yes" : "No"}</th>
                                                </tr>
                                                <tr>
                                                    <td>Bedrooms</td>
                                                    <th>{property.numOfBedrooms}</th>
                                                </tr>
                                                <tr>
                                                    <td>Bathrooms</td>
                                                    <th>{property.numOfBathrooms}</th>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>

                                    <div className='col-lg-6'>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>Rent Frequency</td>
                                                    <th>{property.mode}</th>
                                                </tr>
                                                <tr>
                                                    <td>Area</td>
                                                    <th>{property.address}</th>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="single-content-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="single-content-wrap padding-top-10px">
                                <div id="amenities" className="page-scroll">
                                    <div className="single-content-item padding-top-40px padding-bottom-20px">
                                        <h3 className="title font-size-20">Amenities</h3>
                                        <div className="amenities-feature-item pt-4">
                                            <div className="row">
                                                
                                                {property?.amenities?.map((amenity) => (
                                                    <div key={amenity} className="col-lg-4 responsive-column">
                                                        <div className="single-tour-feature d-flex align-items-center mb-3">
                                                            <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                                                
                                                                <i className="la la-check"></i>
                                                                
                                                                
                                                            </div>
                                                            <div className="single-feature-titles">
                                                                <h3 className="title font-size-15 font-weight-medium">{amenity}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section-block"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
  
    await db.connect();
    const property = await Property.findOne({ slug }).lean();
    console.log("property", db.convertDocToObj(property))
    await db.disconnect();
    return {
      props: {
        property: property ? db.convertDocToObj(property) : null,
      },
    };
}

export default PropertyView