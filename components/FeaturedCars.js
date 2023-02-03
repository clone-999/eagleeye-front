import React from 'react';
import { NumericFormat } from 'react-number-format';
import FeaturedCar from './FeaturedCar';

const FeaturedCars = ({ topCars }) => {
  return (
    <section className="destination-area section--padding">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-8">
                    <div className="section-heading">
                        <h2 className="sec__title_left left-line" style={{fontSize: 22}}>Featured Cars For Sale</h2>
                    </div>
                </div>
            </div>

            <div className="row padding-top-50px">
                {topCars.map((topCar) => <FeaturedCar key={topCar?.vehicle_info?.v_id} topCar={topCar?.vehicle_info} />)}
            </div>
        </div>
    </section>
  )
}

export default FeaturedCars