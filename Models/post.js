const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostSchema = new Schema(
  {
    nameOfPost: { type: "string", default: "" },
    postDate_update: { type: "string", default: "" },
    shortInformation: { type: "string", default: "" },
    headingKey1: { type: "string", default: "" },
    headingKey2: { type: "string", default: "" },
    headingKey3: { type: "string", default: "" },
    importantDate: { type: "string", default: "" },
    applicationFee: { type: "string", default: "" },
    subHeading1key1: { type: "string", default: "" },
    subHeading2key1: { type: "string", default: "" },
    examName: { type: "string", default: "" },
    subHeading3key1: { type: "string", default: "" },
    subHeading4key1: { type: "string", default: "" },
    subHeading5key1: { type: "string", default: "" },
    downloadResult_Scorecard: { type: "string", default: "" },
    downloadAnswerKey: { type: "string", default: "" },
    downloadAdmitcard_CheckExamCity: { type: "string", default: "" },
    isDeleted: { type: Boolean, default: false },
  },

  { timestamps: true }
);

module.exports = mongoose.model("PostModel", PostSchema);
