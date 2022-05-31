const { getRandomString } = require('../helpers');
const cache = require('../models/cache');
const Cache = require('../models/cache');
let moment = require('moment');

exports.getAll = async (req, res) => {
  try {
    const cache = await Cache.find({}).exec();

    res.status(200).json({ success: 1, data: cache });
  } catch (error) {
    res.status(400).json({
      success: 0,
      error: error.message,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    let key = req.params.key;
    const cache = await Cache.findOne({ key: key }).exec();
    if (cache) {
      // let expiryTime = Date.parse(cache.createdAt) + cache.ttl * 1000;
      let expiryTime = moment(cache.createdAt).add(cache.ttl, 'm').toDate();
      if (expiryTime > Date.now()) {
        console.log('No Time To Live');
        // cache.isValid = false;
        // cache.save().exec();
        res.status(410).json({ message: 'Not valid Anymore' });
      } else {
        console.log('Cache Hit!!!');
        res.status(200).json({ success: 1, data: cache });
      }
    } else {
      console.log('Cache Miss !!');
      let value = getRandomString();
      const newCache = new Cache({ key: key, val: value });
      const data = await newCache.save();
      res.status(201).json({ success: 1, data });
    }
  } catch (error) {
    res.status(400).json({
      success: 0,
      error: error.message,
    });
  }
};

exports.createOrUpdate = async (req, res) => {
  try {
    let key = req.params.key;
    let body = {
      key: key,
      val: req.body.value,
    };
    let newCache = await Cache.findOneAndUpdate({ key: key }, body, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    res.status(201).json({ success: 1, data: newCache });
  } catch (error) {
    res.status(400).json({
      success: 0,
      error: error.message,
    });
  }
};
