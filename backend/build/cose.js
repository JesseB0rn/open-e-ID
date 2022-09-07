"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const cose = require("cose-js");
const zlib = require("node:zlib");
const cbor = require("cbor");
const base45 = require("base45");
const key_1 = require("./key");
const testdata_1 = require("./testdata");
function sign(signer, kid, object) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const plaintext = object.toObjectString();
            const headers = {
                p: { alg: "ES256" },
                u: { kid: kid },
            };
            const res = base45.encode(zlib.deflateSync(yield cose.sign.create(headers, cbor.encode(plaintext), signer)));
            console.log("SIGNED MSG (BASE45):", res);
            return res;
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    });
}
exports.sign = sign;
function verify(verifier, b45) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hex = base45.decode(b45);
            console.log(`HEX (ZLIB/COSE/CBOR): 0x${hex.toString("hex")}`);
            const uncompressed = zlib.inflateSync(hex);
            console.log(`HEX (COSE/CBOR): 0x${uncompressed.toString("hex")}`);
            const uncose = yield cose.sign.verify(uncompressed, verifier);
            console.log("Verified message: " + uncose.toString("utf8"));
            return uncose;
        }
        catch (_a) {
            return false;
        }
    });
}
exports.verify = verify;
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = new key_1.KeyStoreKey("1");
        let qr = yield sign({ key: { d: key.d } }, key.kid, testdata_1.personA);
        if (qr) {
            const i = yield verify({ key: { x: key.x, y: key.y } }, qr);
            console.log(JSON.parse(i.toString("utf8").slice(2)));
        }
    });
}
test();
//# sourceMappingURL=cose.js.map