const fs = require('fs');
const Jimp = require("jimp");

const dropwrapper = document.getElementById("dropwrap");

dropwrapper.addEventListener('drop', (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files;
    if (files) {
        for(let file of files){
            let width = document.getElementById("input_width").value || 295;
            let height = document.getElementById("input_height").value || 413;
            convertImg(file.path, file.name, parseInt(width), parseInt(height))
        }
    }
})

dropwrapper.addEventListener('dragover', (e) => {
    e.preventDefault();
})

function convertImg(imgSrc, name, targetWidth, targetHeight){
    Jimp.read(imgSrc, function (err, lenna) {
        if (err) throw err;

        if(lenna.bitmap.height / lenna.bitmap.width >= targetHeight / targetWidth){
            let cutted_height = (targetWidth * lenna.bitmap.height / lenna.bitmap.width  - targetHeight) / 2;
            lenna.resize(targetWidth, Jimp.AUTO).crop(0, cutted_height, targetWidth, targetHeight)
                .write(`output/output_${name}`);
        }else{
            let cutted_width = (targetHeight * lenna.bitmap.width / lenna.bitmap.height  - targetWidth) / 2;
            lenna.resize(Jimp.AUTO, targetHeight).crop(cutted_width, 0, targetWidth, targetHeight)
                .write(`output/output_${name}`);
        }
    });
}