const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getAllCategory = async () => {
    try {
      let categories = await MongoDB.db
        .collection(mongoConfig.collections.CATEGORY)
        .find()
        .toArray();
  
      if (categories && categories?.length > 0) {
        return {
          status: true,
          message: "Restaurants found successfully",
          data: categories,
        };
      } else {
        return {
          status: false,
          message: "No restaurants found",
        };
      }
    } catch (error) {
      return {
        status: false,
        message: "Restaurant finding failed",
        error: `Restaurant finding failed : ${error?.message}`,
      };
    }
  };
  
  const getOneCategoryById = async (categoryId) => {
    try {
      let category = await MongoDB.db
        .collection(mongoConfig.collections.RESTAURANTS)
        .aggregate([
          {
            $match: {
              id: categoryId,
            },
          },
          {
            $lookup: {
              from: "foods",
              localField: "id",
              foreignField: "restaurantId",
              as: "foods",
            },
          },
        ])
        .toArray();
      if (category && category?.length > 0) {
        return {
          status: true,
          message: "Restaurant found successfully",
          data: restaurant[0],
        };
      } else {
        return {
          status: false,
          message: "No restaurant found",
        };
      }
    } catch (error) {
      return {
        status: false,
        message: "Restaurant finding failed",
        error: `Restaurant finding failed : ${error?.message}`,
      };
    }
  };
  
  module.exports = { getAllCategory, getOneCategoryById };
  