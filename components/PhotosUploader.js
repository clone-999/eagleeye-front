import React, { useState } from 'react'

const PhotosUploader = ({addedPhotos, onChange}) => {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        onChange(prev => {
        return [...prev, {public_id: null, url: photoLink}];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        const files = Array.from(ev.target.files);
        const data = new FormData();
        files.forEach(file =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            //console.log("reader.result", reader.result)
            onChange(oldArray => {
            return [...oldArray, {public_id: null, url: reader.result}]
            })
        }
        })
    }

    function removePhoto(ev,filename) {
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo.url !== filename)]);
    }

    function selectAsMainPhoto(ev,fileObject) {
        ev.preventDefault();
        onChange([fileObject,...addedPhotos.filter(photo => photo.url !== fileObject.url)]);
    }

    return (
        <>
            <div className='row'>
                {addedPhotos && addedPhotos.map(link => (
                    <div key={link.url} className="col-lg-4 responsive-column deal-card" style={{position: "relative"}}>
                        <img src={link.url} style={{display: "block", width: 250, height: 200}} />

                        <strong><i className="la la-trash" onClick={ev => removePhoto(ev,link.url)} style={{position: "absolute", bottom:10, left:35, backgroundColor: "white", padding: 10}} role="button" title='Remove image from list'></i></strong>

                        <strong><i className={link?.url === addedPhotos[0]?.url ? "las la-star" : "lar la-star" } onClick={ev => selectAsMainPhoto(ev, link)} style={{position: "absolute", bottom:10, right:35, backgroundColor: "white", padding: 10}} role="button" title='Set as main photo'></i></strong>
                    </div>
                ))}
            </div>
            <br />
            <input type="file" className="form-control" onChange={uploadPhoto} multiple/>
        </>
    )
}

export default PhotosUploader