const mongoose = require('mongoose');

const isValidObjectId = mongoose.Types.ObjectId.isValid;
exports.isValidObjectId = isValidObjectId;