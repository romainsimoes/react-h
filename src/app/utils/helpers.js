export const whichNavigator = () => {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {
      return "chrome";
    } else {
      return "safari";
    }
  }
}
