const PostModel = require("../Models/post");
const Auth = require("../common/authentication");
const Functions = require("../common/functions");


module.exports.login = async (req, res, next) => {
    try {
      const criteria = [];
      if (req.body.email) {
        criteria.push({ email: req.body.email });
        criteria.push({ "temp.email": req.body.email });
      } else if (req.body.phoneNo && req.body.dialCode) {
        criteria.push({ phoneNo: req.body.phoneNo, dialCode: req.body.dialCode });
        criteria.push({ "temp.phoneNo": req.body.phoneNo });
      }
      const doc = await PostModel.findOne({
        $or: criteria,
        isDeleted: false,
      });
      if (!doc) throw new Error("INVALID_CREDENTIALS");
  
      await doc.authenticate(req.body.password);
  
      if (req.body.email && !doc.isEmailVerified) {
        return res.error(403, "ACCOUNT_NOT_VERIFIED");
      }
      if (req.body.phoneNo && !doc.isPhoneVerified) {
        return res.error(403, "ACCOUNT_NOT_VERIFIED");
      }
      if (doc.isBlocked) {
        return res.error(403, "ACCOUNT_BLOCKED");
      }
  
      doc.loginCount += 1;
      doc.accessToken = await Auth.getToken({ _id: doc._id, role: "CUSTOMER" });
      doc.deviceToken = req.body.deviceToken;
      doc.deviceType = req.body.deviceType;
      await doc.save();
  
      return res.success("ACCOUNT_LOGIN_SUCCESSFULLY", doc);
    } catch (error) {
      next(error);
    }
  };

  module.exports.getPost = async (req, res, next) => {
    try {
      const doc = await PostModel.find();
  
      return res.success("DATA_FETCHED", doc);
    } catch (error) {
      next(error);
    }
  };

  module.exports.deletePost = async (req, res, next) => {
    try {
      let criteria = { _id: ObjectId(req.params.id) };
      let deleteUser = await PostModel.findOneAndUpdate(
        criteria,
        {
          $set: { isDeleted: true },
        },
        { new: true }
      );
      if (!deleteUser) throw new Error("USER_NOT_FOUND");
  
      return res.success("USER_DELETED", {});
    } catch (error) {
      next(error);
    }
  };
  
  