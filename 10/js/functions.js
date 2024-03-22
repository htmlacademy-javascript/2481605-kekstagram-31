function getLength(string, maxLength) {
  return string.length <= maxLength;
}
getLength('Длина строки', 10);
function isPalindrome(string) {
  const newString = (string.replaceAll(' ', '')).toLowerCase();
  let emptyString = '';
  for (let i = newString.length - 1; i >= 0 ; i--) {
    emptyString += newString.at(i);
  }
  return emptyString === newString;
}
isPalindrome('топот');
