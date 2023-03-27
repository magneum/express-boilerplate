const readline = require('readline-sync');

function encrypt(password){
    dict = {a: "bYF", b: "={-", c: "4[D", d: "XWj", e: "4}+", f: "D<+", g: ")r_", h: "~#i", i: "X60", j: "rN_", k: "T-2", l: "k57",
    m: "ySF", n: "%t?", o: "D8^", p: '-!"', q: "t49", r: "NyH", s: "2^j", t: "lJ;", u: "W!C", v: "R+F", w: "I9?", x: "w4@", y: "#SL",
    z: "%h?", A: "q:m", B: "i]*", C: "Q(P", D: "YF7", E: ";eU", F: "]S:", G: "C#Z", H: "/?n", I: "g_m", J: "tQ@", K: "cA3", L: ";o3",
    M: ">^Q", N: "NOA", O: "2g)", P: "28$", Q: "$zf", R: "t2c", S: "VB]", T: '"Zq', U: "xi#", V: "a%H", W: "HWz", X: "EJK", Y: "-mb",
    Z: ":]k", 
    "0": "@u_", "1": "LbR", "2": "b<G", "3": "`Fy", "4": '_S"', "5": "GP!", "6": ">?U", "7": "NL7", "8": "4q9", "9": "Ss>",
    "`": "TvW", "!": "cMF", "@": "90n", "#": "_W*", 
    $: "WV^", _: "-<O",
    "%": "gUs", "^": "@$N", "&": "_a^", "*": "jsu", "(": "T;{", ")": "eKM", "+": ")`;"
};
  const list = [];
  for (let i = 0; i < password.length; i++) {
    for (const j in dict) {
      if (password[i] === j) {
        list.push(dict[j]);
      }
    }
  }
  return list.join('');
}

const password = readline.question('Enter the password: ');
const encryptedPassword = encrypt(password);
console.log('Encrypted password: ', encryptedPassword);

function decrypt(password){
    dict = {a: "bYF", b: "={-", c: "4[D", d: "XWj", e: "4}+", f: "D<+", g: ")r_", h: "~#i", i: "X60", j: "rN_", k: "T-2", l: "k57",
    m: "ySF", n: "%t?", o: "D8^", p: '-!"', q: "t49", r: "NyH", s: "2^j", t: "lJ;", u: "W!C", v: "R+F", w: "I9?", x: "w4@", y: "#SL",
    z: "%h?", A: "q:m", B: "i]*", C: "Q(P", D: "YF7", E: ";eU", F: "]S:", G: "C#Z", H: "/?n", I: "g_m", J: "tQ@", K: "cA3", L: ";o3",
    M: ">^Q", N: "NOA", O: "2g)", P: "28$", Q: "$zf", R: "t2c", S: "VB]", T: '"Zq', U: "xi#", V: "a%H", W: "HWz", X: "EJK", Y: "-mb",
    Z: ":]k", 
    "0": "@u_", "1": "LbR", "2": "b<G", "3": "`Fy", "4": '_S"', "5": "GP!", "6": ">?U", "7": "NL7", "8": "4q9", "9": "Ss>",
    "`": "TvW", "!": "cMF", "@": "90n", "#": "_W*", 
    $: "WV^", _: "-<O",
    "%": "gUs", "^": "@$N", "&": "_a^", "*": "jsu", "(": "T;{", ")": "eKM", "+": ")`;"
};
  const pd = [];
  const yt = [];
  let y = '';
  for (let i = 0; i < password.length; i += 3) {
    pd.push(password.slice(i, i + 3));
  }
  for (let i = 0; i < pd.length; i++) {
    for (const j in dict) {
      if (pd[i] === dict[j]) {
        yt.push(j);
      }
    }
  }
  y = yt.join('');
  return y;
}

const decryptedPassword = decrypt(encryptedPassword);
console.log('Decrypted password: ', decryptedPassword);
