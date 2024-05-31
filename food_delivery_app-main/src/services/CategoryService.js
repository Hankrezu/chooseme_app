import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const getAllCategory = async () => {
  console.log('CategoryService | getAllCategory');

  try {
    let categoryResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CATEGORY}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (categoryResponse?.status === 200) {
      return {
        status: true,
        message: 'Category data fetched',
        data: categoryResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: 'Food data not found',
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'Food data not found',
    };
  }
};

const getOneFoodById = async foodId => {
  console.log('FoodService | getOneFoodById');
  try {
    let foodResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.FOOD}/${foodId}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (foodResponse?.status === 200) {
      return {
        status: true,
        message: 'Food data fetched',
        data: foodResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: 'Food data not found',
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'Food data not found',
    };
  }
};

export default {getAllCategory,getOneFoodById};
