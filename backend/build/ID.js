"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ID = void 0;
class ID {
    constructor(names, ddn, issuance, expiry, uid, hight, placeOfOrigin) {
        this.names = names;
        this.ddn = ddn;
        this.issuance = issuance;
        this.uid = uid;
        this.expiry = expiry;
        this.hight = hight;
        this.placeOfOrigin = placeOfOrigin;
    }
    toObjectString() {
        return JSON.stringify({
            names: this.names,
            ddn: this.ddn,
            issuance: this.issuance,
            expiry: this.expiry,
            uid: this.uid,
            hight: this.hight,
            placeOfOrigin: this.placeOfOrigin,
        });
    }
}
exports.ID = ID;
//# sourceMappingURL=ID.js.map