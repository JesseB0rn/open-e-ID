"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyStoreKey = void 0;
const ECKey = require("ec-key");
const fs = require("fs");
class KeyStoreKey {
    constructor(kid) {
        this.kid = kid;
        try {
            var pem = fs.readFileSync(`./keystore/key-${kid}.pem`);
        }
        catch (_a) { }
        this.eckey = new ECKey(pem, "pem");
    }
    get x() {
        return this.eckey.x;
    }
    get y() {
        return this.eckey.y;
    }
    get d() {
        return this.eckey.d;
    }
}
exports.KeyStoreKey = KeyStoreKey;
//# sourceMappingURL=key.js.map