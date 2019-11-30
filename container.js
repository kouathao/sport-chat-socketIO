// configuration for dependable
const dependable = require("dependable");

// tell dependable to go into any files to look for module that need to be reuse anywhere else

const path = require("path");

const container = dependable.container();

// register module ['Name', 'Name']
const simpleDependecies = [["_", "lodash"]];

// register dependices
// 1) loop through array
simpleDependecies.forEach(function(val) {
  container.register(val[0], function() {
    return require(val[1]);
  });
});

// make use of this in every file
container.load(path.join(__dirname, "./controllers"));
container.load(path.join(__dirname, "./helpers"));

container.register("container", function() {
  return container;
});

// export module
module.exports = container;
