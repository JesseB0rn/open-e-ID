export class ID {
  /**
   * List of Names (ex. ['Rapheal', 'Roland', 'Mayer'])
   *
   * @type {string[]}
   * @memberof ID
   */
  names: string[];

  /**
   * Brithday in format 2005-12-01
   *
   * @type {string}
   * @memberof ID
   */
  ddn: string;

  /**
   * issuance in format 2023-01-01
   *
   * @type {string}
   * @memberof ID
   */
  issuance: string;

  /**
   * expiry in format 2028-01-01
   *
   * @type {string}
   * @memberof ID
   */
  expiry: string;
  /**
   * UID of ID (24 chars)
   *
   * @type {string}
   * @memberof ID
   */
  uid: string;

  /**
   * Hight in cm
   *
   * @type {number}
   * @memberof ID
   */
  hight: number;

  /**
   * Place of Origin (ex. `AG-5000-AARAU`)
   *
   * @type {string}
   * @memberof ID
   */
  placeOfOrigin: string;

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

  constructor(names: string[], ddn: string, issuance: string, expiry: string, uid: string, hight: number, placeOfOrigin: string) {
    this.names = names;
    this.ddn = ddn;
    this.issuance = issuance;
    this.uid = uid;
    this.expiry = expiry;
    this.hight = hight;
    this.placeOfOrigin = placeOfOrigin;
  }
}
