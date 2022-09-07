import { ID } from "./ID";

const cose = require("cose-js");
const zlib = require("node:zlib");
const cbor = require("cbor");
const base45 = require("base45");

import { KeyStoreKey } from "./key";
import { personA } from "./testdata";

export async function sign(signer: { key: { d: Buffer } }, kid: string, object: ID): Promise<string | undefined> {
  try {
    const plaintext = object.toObjectString();
    const headers = {
      p: { alg: "ES256" },
      u: { kid: kid },
    };
    const res = base45.encode(zlib.deflateSync(await cose.sign.create(headers, cbor.encode(plaintext), signer)));
    console.log("SIGNED MSG (BASE45):", res);
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
export async function verify(verifier: { key: { x: Buffer; y: Buffer } }, b45: string): Promise<any> {
  try {
    const hex = base45.decode(b45);
    console.log(`HEX (ZLIB/COSE/CBOR): 0x${hex.toString("hex")}`);
    const uncompressed = zlib.inflateSync(hex);
    console.log(`HEX (COSE/CBOR): 0x${uncompressed.toString("hex")}`);
    const uncose = await cose.sign.verify(uncompressed, verifier);
    console.log("Verified message: " + uncose.toString("utf8"));
    return uncose;
  } catch {
    return false;
  }
}

async function test() {
  const key = new KeyStoreKey("1");
  // const key2 = new KeyStoreKey("2");

  let qr = await sign({ key: { d: key.d } }, key.kid, personA);
  if (qr) {
    const i = await verify({ key: { x: key.x, y: key.y } }, qr);
    console.log(JSON.parse(i.toString("utf8").slice(2)));
  }
}

test();
