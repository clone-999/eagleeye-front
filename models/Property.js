import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const propertySchema = new mongoose.Schema(
    {
        title: {
          type: String,
          trim: true,
          minlength: 3,
          maxlength: 320,
          required: true,
        },
        slug: {
          type: String,
          lowercase: true,
        },
        mode: {
            type: String,
            default: "Rent",
            enum: ["Rent", "Sale"],
        },
        homeCategory: {
          type: String,
          default: "Apartment",
          enum: ["Apartment", "Villa", "Town House"],
        },
        phone: {
            type: String,
            minlength: 3,
            maxlength: 21,
            required: true,
        },
        price: {
            type: Number,
            default: 9.99,
            required: true,
        },
        description: {
            type: {},
            minlength: 720,
            required: true,
        },
        size: {
            type: Number,
        },
        numOfBedrooms: {
            type: Number,
        },
        numOfBathrooms: {
            type: Number,
        },
        furnished: {
            type: Boolean,
        },
        refID: {
            type: String,
        },
        noticePeriod: {
            type: String,
        },
        permitNumber: {
            type: String,
        },
        amenities: {
            type: [String],
        },
        address: {
          type: String,
          minlength: 3,
          maxlength: 320,
          required: true,
        },
        photos: [
          {
            public_id: {
              type: String,
            },
            url: { 
              type: String,
              required: true
            }
          }
        ],
        partner: {
          type: ObjectId,
          ref: "User",
          required: true,
        },
    },
  {
    timestamps: true,
  }
);

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
export default Property;
