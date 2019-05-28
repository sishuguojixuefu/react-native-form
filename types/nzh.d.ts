export = nzh;
declare class nzh {
  static langs: {
    b: {
      ch: string;
      ch_d: string;
      ch_f: string;
      ch_u: string;
      m_t: string;
      m_u: string;
      m_z: string;
    };
    hk_b: {
      ch: string;
      ch_d: string;
      ch_f: string;
      ch_u: string;
      m_t: string;
      m_u: string;
      m_z: string;
    };
    hk_s: {
      ch: string;
      ch_d: string;
      ch_f: string;
      ch_u: string;
    };
    s: {
      ch: string;
      ch_d: string;
      ch_f: string;
      ch_u: string;
    };
  };
  constructor(lang: any);
  lang: any;
  encode: any;
  decode: any;
  toMoney: any;
}
declare namespace nzh {
  namespace cn {
    function decodeB(...args: any[]): any;
    function decodeS(...args: any[]): any;
    function encodeB(num: any, options: any): any;
    function encodeS(num: any, options: any): any;
    function toMoney(num: any, options: any): any;
  }
  namespace hk {
    function decodeB(...args: any[]): any;
    function decodeS(...args: any[]): any;
    function encodeB(num: any, options: any): any;
    function encodeS(num: any, options: any): any;
    function toMoney(num: any, options: any): any;
  }
}
