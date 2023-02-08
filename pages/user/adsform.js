import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify'
import Amenities from '../../components/Amenities';
import PhotosUploader from '../../components/PhotosUploader';
import { getError } from '../../utils/error';
import { SyncOutlined } from "@ant-design/icons";

const Adsform = () => {
    const [loading, setLoading] = useState(false);
    const [amenities, setAmenities] = useState([]);
    const [photos, setPhotos] = useState([]);

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ title, address, phone, description, extraInfo, checkIn, checkOut, maxGuests, price }) => {
        try {
            setLoading(true);
            await axios.post('/api/properties', {
                title, address, photos, phone,
                description, amenities, extraInfo,
                checkIn, checkOut, maxGuests, price,
            });
            toast.success('Profile updated successfully');
            router.push('/user/ads')
        } catch (err) {
            toast.error(getError(err));
            setLoading(false);
        }
    }

    return (
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
                                    <form onSubmit={handleSubmit(submitHandler)}>
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
                                                                    <select 
                                                                        id="mode" 
                                                                        className="select_ form-control" 
                                                                        {...register('mode', {
                                                                            required: 'Please select mode',
                                                                        })} >
                                                                        <option value=""></option>
                                                                        <option value="Rent">Rent</option>
                                                                        <option value="Sale">Sale</option>
                                                                    </select>
                                                                    {errors.mode && (
                                                                        <div className="error">{errors.mode.message}</div>
                                                                    )}
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
                                                                    <select 
                                                                        id="homeCategory"
                                                                        className="select_ form-control"
                                                                        {...register('homeCategory', {
                                                                            required: 'Please select home category',
                                                                        })} >
                                                                        <option value=""></option>
                                                                        <option value="Apartment">Apartment</option>
                                                                        <option value="Villa">Villa</option>
                                                                        <option value="Town House">Town House</option>
                                                                    </select>
                                                                    {errors.homeCategory && (
                                                                        <div className="error">{errors.homeCategory.message}</div>
                                                                    )}
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
                                                                <input 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    {...register('title', {
                                                                        required: 'Please enter apartment name',
                                                                    })} 
                                                                    placeholder="Enter name of the apartment"  />
                                                                {errors.title && (
                                                                    <div className="error">{errors.title.message}</div>
                                                                )}
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
                                                                <input 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    {...register('phone', {
                                                                        required: 'Please enter contact phone number',
                                                                    })} 
                                                                    placeholder="Enter contact phone number"  />
                                                                {errors.phone && (
                                                                    <div className="error">{errors.phone.message}</div>
                                                                )}
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
                                                                <input 
                                                                    className="form-control" 
                                                                    type="number" 
                                                                    {...register('price', {
                                                                        required: 'Please enter price',
                                                                    })} 
                                                                    placeholder="Enter price"  />
                                                                {errors.price && (
                                                                    <div className="error">{errors.price.message}</div>
                                                                )}
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
                                                                <input 
                                                                    className="form-control" 
                                                                    type="number"
                                                                    {...register('size', {
                                                                        required: 'Please enter size',
                                                                    })} 
                                                                    placeholder="Enter size"  />
                                                                {errors.size && (
                                                                    <div className="error">{errors.size.message}</div>
                                                                )}
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
                                                                <input 
                                                                    className="form-control" 
                                                                    type="number" 
                                                                    {...register('numOfBedrooms', {
                                                                        required: 'Please enter number Of bedrooms',
                                                                    })} 
                                                                    placeholder="Enter number of bedrooms"  />
                                                                {errors.numOfBedrooms && (
                                                                    <div className="error">{errors.numOfBedrooms.message}</div>
                                                                )}
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
                                                                <input 
                                                                    className="form-control" 
                                                                    type="number" 
                                                                    {...register('numOfBathrooms', {
                                                                        required: 'Please enter number Of bathrooms',
                                                                    })}
                                                                    placeholder="Enter number of bathrooms" />
                                                                {errors.numOfBathrooms && (
                                                                    <div className="error">{errors.numOfBathrooms.message}</div>
                                                                )}
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
                                                                    <select 
                                                                        className="select_ form-control" 
                                                                        {...register('furnished', {
                                                                            required: 'Please select status',
                                                                        })} >
                                                                        <option value=""></option>
                                                                        <option value={true}>Furnished</option>
                                                                        <option value={false}>Un-Furnished</option>
                                                                    </select>
                                                                    {errors.furnished && (
                                                                        <div className="error">{errors.furnished.message}</div>
                                                                    )}
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
                                                                <input 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    {...register('noticePeriod', {
                                                                        required: 'Please enter notice period',
                                                                    })} 
                                                                    placeholder="Enter notice period"  />
                                                                {errors.noticePeriod && (
                                                                    <div className="error">{errors.noticePeriod.message}</div>
                                                                )}
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
                                                                <input 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    {...register('permitNumber', {
                                                                        required: 'Please enter permit number',
                                                                    })} 
                                                                    placeholder="Enter permit number" />
                                                                {errors.permitNumber && (
                                                                    <div className="error">{errors.permitNumber.message}</div>
                                                                )}
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
                                                                <input 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    {...register('address', {
                                                                        required: 'Please enter address',
                                                                    })} 
                                                                    placeholder="Enter location"  />
                                                                {errors.address && (
                                                                    <div className="error">{errors.address.message}</div>
                                                                )}
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
                                                                <textarea 
                                                                    className="form-control" 
                                                                    rows="9" 
                                                                    name="description" 
                                                                    {...register('description', {
                                                                        required: 'Please enter description',
                                                                    })} 
                                                                    placeholder="Enter description"  />
                                                                {errors.description && (
                                                                    <div className="error">{errors.description.message}</div>
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

Adsform.auth = true;

export default Adsform