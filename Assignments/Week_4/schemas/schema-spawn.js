var SchemaSpawn = (function (schemaObj, name) {
  return {
    schema: null,
    model: null,
    init(mongoose) {
      this.schema = mongoose.Schema(schemaObj);
    },
    compile(mongoose) {
      this.model = mongoose.model(name, this.schema);
    },
    createModel(mongoose) {
      this.init(mongoose);
      this.compile(mongoose);
    },
  };
});

module.exports = SchemaSpawn;
