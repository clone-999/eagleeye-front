import React from 'react'

const Amenities = ({selected, onChange}) => {

    function handleCbClick(ev) {
        const {checked,name} = ev.target;
        if (checked) {
          onChange([...selected, name]);
        } else {
          onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }

    return (
        <>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick} />
                <label className="form-check-label" htmlFor="inlineCheckbox1">Wifi</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCbClick} />
                <label className="form-check-label" htmlFor="inlineCheckbox2">Free parking spot</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCbClick} />
                <label className="form-check-label" htmlFor="inlineCheckbox2">TV</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" checked={selected.includes('radio')} name="radio" onChange={handleCbClick} />
                <label className="form-check-label" htmlFor="inlineCheckbox2">Radio</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCbClick} />
                <label className="form-check-label" htmlFor="inlineCheckbox2">Pets</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick} />
                <label className="form-check-label" htmlFor="inlineCheckbox2">Private entrance</label>
            </div>
        </>
    )
}

export default Amenities