"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCache = void 0;
var InMemoryCache = /** @class */ (function () {
    function InMemoryCache() {
    }
    InMemoryCache.prototype.update = function (item) {
        console.log("cache successfully updated with " + item);
    };
    return InMemoryCache;
}());
exports.InMemoryCache = InMemoryCache;
