var dirHome = 'X:/Dropbox/js/spanish';
var Thumbnail = require('thumbnail');
var thumbnail = new Thumbnail(dirHome + '/images', dirHome + '/thumbs');

thumbnail.ensureThumbnail('PAGAR.jpg', 100, 100, function (err, filename) {
    if(err) {
        throw err;
    }
  // "filename" is the name of the thumb in '/path/to/thumbnails'
});
console.log('Executed');
