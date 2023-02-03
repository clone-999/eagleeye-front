import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import Amenities from '../../components/Amenities';
import PhotosUploader from '../../components/PhotosUploader';
import UserRoute from '../../components/routes/UserRoute';
import { Context } from '../../context';

const adsform = () => {
    const {
        state: { user },
    } = useContext(Context);

    const [title, setTitle] = useState('');
    const [mode, setMode] = useState('');
    const [homeCategory, setHomeCategory] = useState('');
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [size, setSize] = useState(0);
    const [numOfBedrooms, setNumOfBedrooms] = useState(1);
    const [numOfBathrooms, setNumOfBathrooms] = useState(1);
    const [furnished, setFurnished] = useState(false);
    const [noticePeriod, setNoticePeriod] = useState('');
    const [permitNumber, setPermitNumber] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);

    // router
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const propertyData = {
            title, mode, homeCategory,
            phone, description, size,
            numOfBedrooms, numOfBathrooms, furnished, noticePeriod,
            permitNumber, amenities, address, photos
        };
        try {
          // console.log(values);
          //alert("here")
          const { data } = await axios.post(`${serverUrl}/api/property`, propertyData);
          toast("Great! We will review your ads, then you can start adding more");
          router.push("/user/ads");
        } catch (err) {
            //console.log('err', err)
            toast(err.response?.data);
        }
    };

    return (
        <UserRoute>
            <div className="container">
                <div className="sidebar mb-0 mt-5">
                    <div className="sidebar-widget">
                        <h3 className="title stroke-shape" style={{textTransform: "capitalize"}}>Create New Ad</h3>
                    </div>

                    <div className="sidebar-widget">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-box">
                                    <div className="form-content">
                                        <form onSubmit={handleSubmit}>
                                            <div className="table-form table-responsive contact-form-action">
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Mode</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-money form-icon"></span>
                                                                    <div className="input-items">
                                                                        <select id="from_country" name="mode" className="select_ form-control" onChange={ev => setMode(ev.target.value)} >
                                                                            <option value="Rent">Rent</option>
                                                                            <option value="Sale">Sale</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Home Category</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-building form-icon"></span>
                                                                    <div className="input-items">
                                                                        <select id="from_country" name="homeCategory" className="select_ form-control" onChange={ev => setHomeCategory(ev.target.value)} >
                                                                            <option value="Apartment">Apartment</option>
                                                                            <option value="Villa">Villa</option>
                                                                            <option value="Town House">Town House</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Title</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-home form-icon"></span>
                                                                    <input className="form-control" type="text" name="title" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Enter name of the apartment"  />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Contact Number</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-phone form-icon"></span>
                                                                    <input className="form-control" type="text" name="phone" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="Enter contact phone number"  />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Price</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-money form-icon"></span>
                                                                    <input className="form-control" type="number" name="price" value={price} onChange={ev => setPrice(ev.target.value)} placeholder="Enter price"  />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Size</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-box form-icon"></span>
                                                                    <input className="form-control" type="number" name="size" value={size} onChange={ev => setSize(ev.target.value)} placeholder="Enter size"  />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Number Of Bedrooms</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-bed form-icon"></span>
                                                                    <input className="form-control" type="number" name="numOfBedrooms" value={numOfBedrooms} onChange={ev => setNumOfBedrooms(ev.target.value)} placeholder="Enter number of bedrooms"  />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Number of Bathrooms</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-bath form-icon"></span>
                                                                    <input className="form-control" type="number" name="numOfBathrooms" value={numOfBathrooms} onChange={ev => setNumOfBathrooms(ev.target.value)} placeholder="Enter number of bathrooms"  />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Furnished</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-money form-icon"></span>
                                                                    <div className="input-items">
                                                                        <select id="from_country" name="furnished" className="select_ form-control" onChange={ev => setFurnished(ev.target.value)} >
                                                                            <option value={true}>Furnished</option>
                                                                            <option value={false}>Un-Furnished</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Notice Period</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-clock form-icon"></span>
                                                                    <input className="form-control" type="text" name="noticePeriod" value={noticePeriod} onChange={ev => setNoticePeriod(ev.target.value)} placeholder="Enter notice period"  />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Tourism Permit Number (optional)</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-star-of-life form-icon"></span>
                                                                    <input className="form-control" type="text" name="permitNumber" value={permitNumber} onChange={ev => setPermitNumber(ev.target.value)} placeholder="Enter permit number" />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Amenities</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <Amenities selected={amenities} onChange={setAmenities} />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Address</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-home form-icon"></span>
                                                                    <input className="form-control" type="text" name="address" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Enter location"  />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Photos</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <PhotosUploader addedPhotos={photos} onChange={setPhotos} />
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="pl-0">
                                                                <div className="table-content">
                                                                    <h3 className="title font-weight-medium">Description</h3>
                                                                </div>
                                                            </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div className="form-group">
                                                                    <span className="la la-home form-icon"></span>
                                                                    <textarea className="form-control" rows="9" name="description" value={description} onChange={ev => setDescription(ev.target.value)} placeholder="Enter description"  />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="section-block"></div>
                                            <div className="btn-box mt-4">
                                                <button type="submit" className="theme-btn">Save</button>
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

export default adsform