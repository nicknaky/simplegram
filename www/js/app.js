angular
  .module("Simplegram", ["ionic"])
  .config(["$compileProvider", function($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  }]);
