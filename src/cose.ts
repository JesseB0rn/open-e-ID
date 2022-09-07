import { ID } from "./ID";

const cose = require("cose-js");
const zlib = require("node:zlib");
const cbor = require("cbor");
const base45 = require("base45");
const ECKey = require("ec-key");
const fs = require("fs");

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
export async function verify(verifier: { key: { x: Buffer; y: Buffer } }, b45: string) {
  const hex = base45.decode(b45);
  console.log(`HEX (ZLIB/COSE/CBOR): 0x${hex.toString("hex")}`);
  const uncompressed = zlib.inflateSync(hex);
  console.log(`HEX (COSE/CBOR): 0x${uncompressed.toString("hex")}`);
  const uncose = await cose.sign.verify(uncompressed, verifier);
  console.log("Verified message: " + uncose.toString("utf8"));
}

export function XYfromPublicHex(hex: string) {
  const publicKeyBuff = Buffer.from(hex, "hex");
  const pubKeyCoordsBuff = publicKeyBuff.slice(1); // First byte just signals that it is uncompressed. TRASH!
  const halfLen = Buffer.byteLength(pubKeyCoordsBuff) / 2; // should be 32;
  const x = pubKeyCoordsBuff.slice(0, halfLen);
  const y = pubKeyCoordsBuff.slice(halfLen, Buffer.byteLength(pubKeyCoordsBuff) + 1);

  console.log("x", x);
  console.log("y", y);

  return {
    x: x,
    y: y,
  };
}

// sign(
//   {
//     key: {
//       d: Buffer.from("MHcCAQEEIOj3i3VWHF68JUFzIoFKyuU6U1ktwweer569vUiSYBU9oAoGCCqGSM49AwEHoUQDQgAEQYkjWGNvxl+iHmAKTaqm/L5n5Yn931921vCeZGVw8Umh5YTeZ5VOGwScMK/XD5Rknyx3RKRP6H2Ik/ZGB5UYiQ==", "base64"),
//     },
//   },
//   "1",
//   new ID()
// );

// verify(
//   {
//     key: XYfromPublicHex("0441892358636fc65fa21e600a4daaa6fcbe67e589fddf5f76d6f09e646570f149a1e584de67954e1b049c30afd70f94649f2c7744a44fe87d8893f64607951889"),
//   },
//   "6BF280E30FFWJWG.FKY*49O0WA6/Q3TF3*F4BECFZCWF7AI9 QE5$CV44HECG445$CFZC3%F%88L-PP3558NLJIPP6%A9PAV*SGZVRT8N%LE5X0OU89U0V3B$:ES-V6M1JO9+2SU%NHB98Q2$8CZP7FBU:WUVAKPP9%$5OXPPGP7M8G3"
// );

async function test() {
  var pem = fs.readFileSync("./key.pem");
  var key = new ECKey(pem, "pem");

  let qr = await sign({ key: { d: key.d } }, "1", new ID());
  if (qr) {
    verify({ key: { x: key.x, y: key.y } }, qr);
  }
}

test();
