const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getUserData = async (username) => {
  try {
    let userObject = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .findOne({ username });

    if (userObject) {
      return {
        status: true,
        message: "User found successfully",
        data: userObject,
      };
    } else {
      return {
        status: false,
        message: "No user found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "User finding failed",
      error: `User finding failed : ${error?.message}`,
    };
  }
};

const infomationchange = async (username,phone) => {
  try {
    let userObject = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .findOne({ username });

    if (userObject) {
      return {
        status: true,
        message: "User found successfully",
        data: userObject,
      };
    } else {
      return {
        status: false,
        message: "No user found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "User finding failed",
      error: `User finding failed : ${error?.message}`,
    };
  }
};

// const updateUser = async (id, username) => {
//   try {
//     // Sử dụng đúng đối tượng $set
//     let updateResult = await MongoDB.db
//       .collection(mongoConfig.collections.USERS)
//       .updateOne(
//         { _id: new MongoDB.ObjectId(id) },
//         { $set: { username: username } }
//       );

//     if (updateResult.modifiedCount > 0) {
//       let updatedUser = await MongoDB.db
//         .collection(mongoConfig.collections.USERS)
//         .findOne({ _id: new MongoDB.ObjectId(id) }); // Sử dụng đúng biến id

//       return {
//         status: true,
//         message: "User updated successfully",
//         data: updatedUser,
//       };
//     } else {
//       return {
//         status: false,
//         message: "User update failed or no changes made",
//       };
//     }
//   } catch (error) {
//     return {
//       status: false,
//       message: "User update failed",
//       error: error.message, // Thêm thông tin lỗi
//     };
//   }
// };




module.exports = { getUserData,};
