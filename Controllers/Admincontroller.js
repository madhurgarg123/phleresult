const PostModel = require("../Models/post")
const Auth = require("../common/authentication");
const Functions = require("../common/functions");

// const csv = require("csvtojson");
// const path = require("path");
// const fs = require("fs");
// const constants = require("../../common/constants");

module.exports.login = async (req, res, next) => {
    try {

      let accessToken = await Auth.getToken({ username : req.body.username, password: req.body.password, role: "ADMIN" });
     
      return res.success("ACCOUNT_LOGIN_SUCCESSFULLY", accessToken);
    } catch (error) {
      next(error);
    }
  };

  module.exports.addNewPost = async (req, res, next) => {
    try {
       
      const doc = await PostModel.create(req.body);
  
      console.log(doc);
      
        await doc.save();
        return res.success("SUCCESS", doc);

      }
      catch (error) {
        next(error);
      }
    } 

    module.exports.getPost = async (req, res, next) => {
      try {
        const doc = await PostModel.findOne({ _id: req.User._id });
    
        return res.success("DATA_FETCHED", doc);
      } catch (error) {
        next(error);
      }
    };

    module.exports.editPost = async (req, res, next) => {
      try {
    
        //const criteria = { _id: ObjectId(req.params.id), isDeleted: false };
        // data = _.pickBy(data, _.identity);
        let criteria = { _id: req.params.id };

        let doc = await PostModel.findOneAndUpdate(
          criteria,
          { $set: req.body },
          { new: true }
        );
        if (!doc) throw new Error("USER_NOT_FOUND");
    
        return res.success("UPDATED_SUCCESSFULLY", doc);
      } catch (error) {
        next(error);
      }
    };
   
  module.exports.deletePost = async (req, res, next) => {
    try {
      console.log("frfr")
      console.log(req.params.id)
      let criteria = { _id: req.params.id };
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
 
  
  
  