import { useState, useEffect } from "react";
import { baseUrl, carBaseUrl, carFetchApi, fetchApi } from '../utils/fetchApi';
import TopAgencies from "../components/TopAgencies";
import PropertiesForRent from "../components/PropertiesForRent";
import PropertiesForSale from "../components/PropertiesForSale";
import SearchFilters from "../components/SearchFilters";
import HolidaySearch from "../components/HolidaySearch";
import { useRouter } from 'next/router';
import FeaturedCars from "../components/FeaturedCars";

const Index = ({ propertiesForSale, propertiesForRent, topAgencies }) => {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('apartments');
  const router = useRouter();
  const { query } = router;
  
    return (
      <>
        <section className="hero-wrapper">
          <div className="hero-box hero-bg active" data-bg="/assets/img/slider/bg1.jpg" style={{
            minHeight: 371,
            backgroundAttachment: 'fixed',
            backgroundImage: 'url(/assets/img/slider/bg1.jpg)',
            backgroundSize: 'contain'
          }}> 
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mx-auto responsive--column-l">

                  <div className="hero-content pb-4">
                    <div className="section-heading">
                      
                    </div>
                  </div>

                  <div className="section-tab fade-in glass" style={{minHeight: 167}}>
                    <ul className="nav nav-tabs listitems" id="Tab" role="tablist">
                      <li data-position="1" className="nav-item" role="presentation">
                        <button className={(active == "apartments") ? "nav-link active" : "nav-link" } id="apartments-tab" data-bs-toggle="tab" data-bs-target="#apartments" type="button" role="tab" aria-controls="apartments" aria-selected="false" onClick={() => setActive('apartments')} >
                          <span className="d-xl-none d-lg-none">
                            <i className="la la-hotel mx-1"></i>
                          </span>
                          <span className="d-none d-lg-block d-xl-block">
                            <i className="la la-hotel mx-1"></i>
                            PROPERTIES
                          </span>
                        </button>
                      </li>

                      <li data-position="2" className="nav-item" role="presentation">
                        <button className={(active == "holiday") ? "nav-link active" : "nav-link" } id="hotels-tab" data-bs-toggle="tab" data-bs-target="#hotels" type="button" role="tab" aria-controls="hotels" aria-selected="false" onClick={() => setActive('holiday')} >
                          <span className="d-xl-none d-lg-none">
                            <i className="la la-car mx-1"></i>
                          </span>
                          <span className="d-none d-lg-block d-xl-block">
                            <i className="la la-car mx-1"></i>
                            BUY CARS
                          </span>
                        </button>
                      </li>
                    </ul>

                    {(active == "apartments") &&
                      <SearchFilters page={'none'} setLoading={setLoading} loading={loading} rquery={query} />}

                    {(active == "holiday") && <HolidaySearch setLoading={setLoading} loading={loading} />}

                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="info-area info-bg padding-top-50px padding-bottom-50px text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="icon-box">
                  <div className="info-icon">
                      <i className="la la-bullhorn"></i>
                  </div>
                  <div className="info-content">
                      <h4 className="info__title">You'll never roam alone</h4>
                      <p className="info__desc">
                        Find best apartment services and book them instantly
                      </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="icon-box">
                  <div className="info-icon">
                      <i className="la la-globe"></i>
                  </div>
                  <div className="info-content">
                      <h4 className="info__title">Travel to anytime, anywhere</h4>
                      <p className="info__desc">
                        No limits and boundaries for your next destination
                      </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="icon-box">
                  <div className="info-icon">
                      <i className="la la-thumbs-up"></i>
                  </div>
                  <div className="info-content">
                      <h4 className="info__title">Ease of mind, search filter and book</h4>
                      <p className="info__desc">
                        Let's help you find best travel deals and offers today
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TopAgencies topAgencies={topAgencies} />
       
        <PropertiesForRent propertiesForRent={propertiesForRent}/>
        <PropertiesForSale propertiesForSale={propertiesForSale} />

      </>
    );
  };

  export async function getStaticProps() {
    const propertiesForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
    const propertiesForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);
    const topAgencies = await fetchApi(`${baseUrl}/agencies/list?query=dubai&hitsPerPage=9&page=0&lang=en`);
    //const topCars = await carFetchApi(`${carBaseUrl}/v1/car-rental/search?sort_by=recommended&drop_off_latitude=38.537605&pick_up_latitude=38.537605&from_country=ar&pick_up_longitude=55.277027&currency=AED&drop_off_datetime=2023-04-17%2013%3A00%3A00&pick_up_datetime=2023-04-16%2013%3A00%3A00&drop_off_longitude=55.277027&locale=en-gb`);

    //console.log("topCars?.search_results", topCars)
  
    return {
      props: {
        propertiesForSale: propertiesForSale?.hits,
        propertiesForRent: propertiesForRent?.hits,
        topAgencies: topAgencies?.hits,
        //topCars: topCars?.search_results
      },
    };
  }

  export default Index;