import { getSession } from 'next-auth/react';
import { nanoid } from "nanoid";
import Property from '../../../models/Property';
import db from '../../../utils/db';
import cloudinary from '../../../utils/cloudinary';
import slugify from "slugify";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('admin signin required');
  }
  // const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, session.user);
  } else if (req.method === 'POST') {
    return postHandler(req, res, session.user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const postHandler = async (req, res, user) => {
  await db.connect();
  const alreadyExist = await Property.findOne({
    slug: slugify(req.body.title.toLowerCase()),
  });
  if (alreadyExist) return res.status(400).send("Title is taken");

  req.body.photos = await upload(req.body.photos, res)
  req.body.refID = nanoid(6).toUpperCase();
  const { title, address, description, extraInfo, checkIn, phone, checkOut, maxGuests, price, amenities, photos, refID } = req.body;
  const newProperty = new Property({
    title: title,
    address: address,
    description: description,
    extraInfo: extraInfo,
    checkIn: checkIn,
    checkOut: checkOut,
    maxGuests: maxGuests,
    price: price,
    phone: phone,
    amenities: amenities,
    photos: photos,
    refID: refID,
    partner: user._id,
    slug: slugify(title)
  });

  const property = await newProperty.save();
  await db.disconnect();
  res.send({ message: 'Property created successfully', property });
};

const getHandler = async (req, res, user) => {
  await db.connect();
  const properties = await Property.find({}).populate("partner", "_id name")
  .exec();
  await db.disconnect();
  res.send(properties);
};

export const upload = async (photos, res) => {
    try {
      let imagesBuffer = [];
      
      for (let i =0; i < photos.length;  i++){
        let imageUrl = photos[i].url;
        if (imageUrl.includes("http")) {
          imagesBuffer.push({
            public_id: null,
            url: imageUrl
          })
        } else {
          const result = await cloudinary.uploader.upload(imageUrl, {
            folder: "banners",
            width: 1920,
            crop: "scale"
          });
    
          imagesBuffer.push({
            public_id: result.public_id,
            url: result.secure_url
          })
        }
  
      }
      return imagesBuffer;
  
    } catch (error) {
      console.log(error);
      return res.status(400).send("Image upload failed. Try again.");
    }
}
export default handler;