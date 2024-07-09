const Tour = require("../models/tourModel");
const FilterFeature = require("../utils/FilterFeature");
const ApiError = require("../utils/ApiError");

const getAllTours = async (query) => {
  const filterFeature = new FilterFeature(Tour.find(), query)
    .filter()
    .sort()
    .fields()
    .paginate();

  return await filterFeature.query;
};

const getTour = async (id) => {
  const tour = await Tour.findById(id);

  if (!tour) {
    throw new ApiError("Tour not available", 404);
  }

  return tour;
};

const createTour = async (data) => {
  const tour = await Tour.create(data);

  if (!tour) {
    throw new ApiError("Tour not available", 404);
  }
  return tour;
};

const updateTour = async (id, data) => {
  const tour = await Tour.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!tour) {
    throw new ApiError("Tour not available", 404);
  }

  return tour;
};
const deleteTour = async (id) => {
  const tour = await Tour.findByIdAndDelete(id);

  if (!tour) {
    throw new ApiError("Tour not available", 404);
  }

  return tour;
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
