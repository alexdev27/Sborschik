
var config = require('../config');
var runSequence = require('run-sequence');
var gulp = require('gulp');


gulp.task('watch', ['startDev'] , function() {
    
/*  ПРИ НЕОБХОДИМОСТИ МОЖНО ПРОСТО ЗАКОМЕНТИРОВАТЬ/РАССКОМЕНТИРОВАТЬ
 ТАСК,КОТОРЫЙ НЕ БУДЕТ/БУДЕТ ИСПОЛЬЗОВАТЬСЯ  */


  // gulp.watch( config.images.watch.svgIcons, ['buildSvgSymbol']);

  gulp.watch( config.styles.watch,  ['sass']);
    
  gulp.watch( config.html.watchTemplates )
    .on('change', function () {

      global.notUpdateHtmlTmplt = false;
      gulp.start('html');
      global.notUpdateHtmlTmplt = true;
      console.log('htmlTmplt updated');
    });

  gulp.watch( config.html.watchPages )
    .on('change', function(e){ 
      rebuildFiles(e, 'updateHtml', 'html'); 
    });

  gulp.watch( config.scripts.watch )
    .on('change', function(e){
      rebuildFiles(e, 'updateJs', 'js');
    });

  gulp.watch( config.images.watch.rasterImages )
    .on('change', function(e){   
      rebuildFiles(e, 'updateImg', 'img'); 
    });

  /*gulp.watch( config.images.watch.pngIconsForSprite )
    .on('change', function (e) {
      rebuildFiles(e, 'updatePngSprite','buildPngSprite');
    })

  gulp.watch( config.fonts.watch )
    .on('change', function(e){
      rebuildFiles(e, 'updateFonts', 'convertFonts'); 
    });*/

});



function rebuildFiles(event, specialTask, defaultTask) {
  if (event.type === 'deleted') { gulp.start(specialTask); }
  else { gulp.start(defaultTask); }
}

/*  ПРИ НЕОБХОДИМОСТИ МОЖНО ПРОСТО ЗАКОМЕНТИРОВАТЬ ТАСК,КОТОРЫЙ НЕ БУДЕТ ИСПОЛЬЗОВАТЬСЯ  */
gulp.task('startDev',function (cb) {
  runSequence('del:build','img', /*'buildPngSprite',*//*'buildSvgSymbol',*/ [/*'convertFonts',*/'sass', 'html', 'js'], 'webserver', cb)
});

gulp.task('prod', function () {
  runSequence('del:build', 'clearCache', 'img', /*'buildPngSprite',*//*'svgIconsToBuild',*/ [/*'buildSvgSymbol', 'convertFonts',*/'sass', 'html', 'js'] ); 
});
