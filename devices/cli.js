const express = require('express');
const path = require('path');
const HttpStatus = require('http-status-codes');
const multer  = require('multer');
const progressStream = require('progress-stream');
const uploadMulter = multer({ dest: path.resolve(__dirname, `./uploads`) });

const app = express();
app.use(express.static(path.resolve(__dirname, './public')));

app.post('/upload', function(req, res, next) {
    const progress = progressStream({ length: '0' }); // 注意这里 length 设置为 '0'
    req.pipe(progress);
    progress.headers = req.headers;
	
    // 获取上传文件的真实长度（针对 multipart)
    progress.on('length', function nowIKnowMyLength (actualLength) {
    	console.log('actualLength: %s', actualLength);
    	progress.setLength(actualLength);
    });

	// 获取上传进度
    progress.on('progress', function (obj) {		
    	console.log('progress: %s', obj.percentage);
        // res.send({ progress: obj.percentage });
    });
    uploadMulter.array('fileUpload[]')(progress, res, next);
});

app.post('/upload', function (req, res, next) {
    res.writeHead(HttpStatus.OK, {
        'Connection': 'close'
    });
    res.end("That's all folks!");
});



// function(req, res) {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let sampleFile = req.files.fileUpload;
//     Promise.all(Object.keys(req.files).map(f => {
//         return new Promise((resolve, reject) => {
//             const file = req.files[f];
//             file.mv(path.resolve(__dirname, `./${f}`), function(err) {
//                 if (err)
//                     reject(err);

//                 resolve(`${f} uploaded!`)
//             });
//         });
//     })).then(() => {
//         setTimeout(() => {
//             res.send('Files uploaded!');      
//         }, 10000);
//     }).catch(err => {
//         res.status(500).send(err);
//     })
// });
app.listen(3000);