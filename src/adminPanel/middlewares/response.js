//model, populate

const response = (model, populate) => {
  return async (req, res, next) => {
    let modelsQuery = model.find();

    //convert query string to number
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.per_page) || 2;
    const skip = (page - 1) * limit;
    const total = await model.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sortBy = req.query.sort;
    const order = req.query.order || 1;

    //populate
    if (populate) {
      modelsQuery = modelsQuery.populate(populate);
    }

    if (sortBy) {
      modelsQuery = modelsQuery.sort([[sortBy, order]]);
    }

    //filtering / searching
    if (req.query.name) {
      modelsQuery = model.find({
        name: { $regex: req.query.name, $options: "i" },
      });
    }

    //pagination results
    const meta = {};

    //add page info
    meta.current_page = page;
    meta.per_page = limit;
    meta.total = total;

    if (endIndex < total) {
      meta.next_page = page + 1;
    } else {
      meta.next_page = null;
    }
    if (startIndex > 0) {
      meta.prev_page = page - 1;
    } else {
      meta.prev_page = null;
    }
    meta.last_page = Math.ceil(total / limit);

    //execute query
    const data = await modelsQuery.find().skip(skip).limit(limit);

    res.result = {
      status: true,
      code: 200,
      message: "Data fetched successfully",
      errors: null,
      meta,
      data,
    };
    next();
  };
};

module.exports = response;
