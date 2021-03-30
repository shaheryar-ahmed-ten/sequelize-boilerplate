exports.makeRandom = (length, num = false) => {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   if (num) {
      characters = '0123456789';
   }
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

exports.makeSeq = (str, from) => {
   return Number(str.substr(from)) + 1
}