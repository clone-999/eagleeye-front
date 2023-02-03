import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';

const FeaturedCar = ({ topCar }) => {
    const [showNumber, setShowNumber] = useState(false);
    
    return (
        <div className="col-lg-4" style={{marginBottom: 30}}>
            <div className="card-item mb-0">
                <div className="card-img">
                    <a href={`/car/${topCar?.v_id}`} className="d-block">
                        <img src={ topCar?.image_thumbnail_url } className="" alt="hotel-img" style={{height: 200}} />
                    </a>
                    <span className="badge">{topCar?.group} </span>
                </div>

                <div className="card-body">
                    <h3 className="card-title"><a href={`/car/${topCar?.v_id}`}>{topCar?.mileage}</a></h3>
                    <p className="card-meta">{ topCar?.fuel_policy }</p>
                    <div className="card-rating">
                        
                    </div>
                    <div className="card-price d-flex align-items-center justify-content-between">
                        <p>
                        <span className="price__num">
                            {topCar?.transmission}
                        </span>
                        <span className="price__text">Transmission</span>
                        </p>
                        <a href={`/car/${topCar?.v_id}`} className="btn-text">Details <i className="la la-angle-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCar