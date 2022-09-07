"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printASCIIQR = void 0;
const qr = require("qrcode");
function printASCIIQR(content) {
    qr.toString(content, { type: "terminal" }, (err, text) => {
        if (err) {
            console.error("Error:", err.message);
        }
        console.log(text);
    });
}
exports.printASCIIQR = printASCIIQR;
printASCIIQR("6BFOXN*TS0BI$ZDHTHMECFFBQIA/JC/LD+NI5IAM+8RHMZWGRN3/42%QVHMC%GBHM759OXVAWBQ/YJZ4EABNPRLY70O5I9JR WM68FS15%NDF4SBLM*EW22NVAWSFGA9W.3QJ.8LP6+$NB.B/KECFCXDEV10SK5I0");
//# sourceMappingURL=qr.js.map