'use strict';
const express       = require('express');
const router        = express.Router();
const jsonfile      = require("jsonfile");

module.exports = function() {

router.get('/', function(req, res){
  res.end('welcome to digital markets API')
});

router.get('/subscribe', function(req, res){
  let id = req.query.id;
  let href = req.query.href;
  let anchortext = req.query.anchortext;
  let image = req.query.image;
  let title = req.query.title;
  let description = req.query.description;

  let website = {
    href: href,
    anchortext: anchortext,
    image: image,
    title: title,
    description: description
  }

  jsonfile.readFile('./data/api.websites.json', function(err, obj){
    let status = false; // new website
    let index = -1;

    obj.forEach(function(website,i){
        console.log(website);
        if(website.href == href) {
          status = true;
          index = i;
        }
    });

    let objNew = obj;

    if(!status) {
      console.log('register new website');
      objNew.push(website);
    } else {
      console.log('edit website');
      objNew[index] = website;
    }

    let error = null;

    jsonfile.writeFile('./data/api.websites.json', objNew, function(err){
      if(err) {
        error = err;
        status = 'incomplete';
      } else {
        error = null;
        status = 'complete';
      }
      res.json({
        error: error,
        status: status,
        content: website
      })
    });



  });
});

router.get('/unsubscribe', function(req, res){

});
router.get('/getwebsites', function(req, res){
  getWebsites().then(function(obj){
    res.json(obj);
  }).catch(function(error){});
});
  return router;
}

function getWebsites() {
  return new Promise(function(resolve, reject) {
    jsonfile.readFile('./data/api.websites.json', function(error, obj){
      if(error)
        reject(error);
      else
        resolve(obj);
    });
  });
}

function checkWebsites(href, arr) {
  let status = false, index = -1;
  arr.forEach(function(website,i){
    if(website.href == href) {
      status = true;
      index = i;
    }
  });
  return {
    status: status,
    index: i
  }
}
