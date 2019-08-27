module.exports = {
  Users: require("./users")
};


// 0] C:\Users\paget\Projects\suited\node_modules\mongoose\lib\index.js:490
// [0]       throw new mongoose.Error.MissingSchemaError(name);
// [0]       ^
// [0] MissingSchemaError: Schema hasn't been registered for model "Users".
// [0] Use mongoose.model(name, schema)
// [0]     at new MissingSchemaError (C:\Users\paget\Projects\suited\node_modules\mongoose\lib\error\missingSchema.js:22:11)
// [0]     at Mongoose.model (C:\Users\paget\Projects\suited\node_modules\mongoose\lib\index.js:490:13)
// [0]     at Object.<anonymous> (C:\Users\paget\Projects\suited\routes\api\users.js:5:24)
// [0]     at Module._compile (internal/modules/cjs/loader.js:689:30)
// [0]     at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
// [0]     at Module.load (internal/modules/cjs/loader.js:599:32)
// [0]     at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
// [0]     at Function.Module._load (internal/modules/cjs/loader.js:530:3)
// [0]     at Module.require (internal/modules/cjs/loader.js:637:17)
// [0]     at require (internal/modules/cjs/helpers.js:22:18)
// [0]     at Object.<anonymous> (C:\Users\paget\Projects\suited\routes\api\index.js:3:21)
// [0]     at Module._compile (internal/modules/cjs/loader.js:689:30)
// [0]     at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
// [0]     at Module.load (internal/modules/cjs/loader.js:599:32)
// [0]     at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
// [0]     at Function.Module._load (internal/modules/cjs/loader.js:530:3)
// [0] [nodemon] app crashed - waiting for file changes before starting...