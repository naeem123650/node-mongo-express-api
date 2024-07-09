class FilterFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    let excludeParams = ["page", "fields", "limit", "sort"];
    excludeParams.map((param) => delete queryObj[param]);

    // advance filter handling like greater, less, not equal
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortQuery = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortQuery);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const fieldQuery = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fieldQuery);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 1000;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = FilterFeature;
