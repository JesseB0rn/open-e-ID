const ECKey = require("ec-key");
const fs = require("fs");

export class KeyStoreKey {
  eckey: typeof ECKey;

  constructor(public kid: string) {
    try {
      var pem = fs.readFileSync(`./keystore/key-${kid}.pem`);
    } catch {}
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
