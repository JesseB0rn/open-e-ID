const qr = require("qrcode");

export function printASCIIQR(content: any) {
  qr.toString(content, { type: "terminal" }, (err: any, text: string) => {
    if (err) {
      console.error("Error:", err.message);
    }

    console.log(text);
  });
}

printASCIIQR("6BFOXN*TS0BI$ZDHTHMECFFBQIA/JC/LD+NI5IAM+8RHMZWGRN3/42%QVHMC%GBHM759OXVAWBQ/YJZ4EABNPRLY70O5I9JR WM68FS15%NDF4SBLM*EW22NVAWSFGA9W.3QJ.8LP6+$NB.B/KECFCXDEV10SK5I0");
