const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name is required."],
      trim: true,
      unique: true,
      minLength: [10, "Name should be greater than 10 character"],
      maxLength: [40, "Name should be less than 40 character"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "Number of days is required"],
      min: [1, "Duration should have min 1 day."],
      max: [10, "Duration should have max 10 day."],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Max group size is required"],
      min: [1, "Max group should have min 1 day."],
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      trim: true,
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "{VALUE} is not supported",
      },
    },
    ratingAverage: {
      type: Number,
    },
    ratingQuantity: {
      type: Number,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    priceDiscount: {
      type: Number,
      default: 0,
      validate: {
        validator: function (val) {
          return this.price > val;
        },
        message: "Price discount shouldn't be greater than price",
      },
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      trim: true,
    },
    images: [String],
    startDates: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// getting extra field id as well. so need to investigate

// virtuals in mongoose
tourSchema.virtual("fullName").get(function () {
  return `${this.name} ${this.duration}`;
});

// Document middleware
tourSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
});

module.exports = mongoose.model("Tour", tourSchema);
