const AsyncHandler = require("../utils/AsyncHandler");
const TourService = require("../services/tourService");

const getAllTours = AsyncHandler(async (req, res, next) => {
  const tours = await TourService.getAllTours(req.query);

  res.status(200).json({
    status: "success",
    tours,
  });
});

const getTour = AsyncHandler(async (req, res, next) => {
  const tour = await TourService.getTour(req.params.id);

  res.status(200).json({
    status: "success",
    tour,
  });
});

const createTour = AsyncHandler(async (req, res, next) => {
  const tour = await TourService.createTour(req.body);

  res.status(201).json({
    status: "success",
    tour,
  });
});

const updateTour = AsyncHandler(async (req, res, next) => {
  const tour = await TourService.updateTour(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    tour,
  });
});

const deleteTour = AsyncHandler(async (req, res, next) => {
  const tour = await TourService.deleteTour(req.params.id);

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
