const { response } = require("express");
const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");
const { ObjectId } = require('mongodb');

const getAllRestaurant = async () => {
  try {
    let restaurants = await MongoDB.db
      .collection(mongoConfig.collections.RESTAURANTS)
      .find()
      .toArray();

    if (restaurants && restaurants?.length > 0) {
      return {
        status: true,
        message: "Restaurants found successfully",
        data: restaurants,
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

const getOneRestaurantById = async (restaurantId) => {
  try{
    let restaurant = await MongoDB.db
      .collection(mongoConfig.collections.RESTAURANTS)
      .aggregate([
        {
          $match: {
            _id: ObjectId(restaurantId),
          },
        },
        {
          $lookup: {
            from: "foods",
            localField: "_id",
            foreignField: "restaurantId",
            as: "foods",
          },
        },
      ])
      .toArray();

    if (restaurant && restaurant?.length > 0) {
      let categoryNames = restaurant[0]["categories"].map(async(categoryId) =>  {
        let categoriyDetail = await MongoDB.db
          .collection(mongoConfig.collections.CATEGORIES)
          .findOne({ _id: ObjectId(categoryId)})
        return categoriyDetail["name"]
      })

      restaurant[0]["categories"] = await Promise.all(categoryNames)

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


module.exports = { getAllRestaurant, getOneRestaurantById };
