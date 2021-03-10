//combines nodejs and chromium into a single runtime so its a big application
//main process -> json main script creates browser window instances to run web pages
//and renderer process -> each webpage runs its own isolated process called the renderer process
const {app,browserWindow, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

//global reference to window object. if not created,
//window object closed automatically when js object is garbage collected
let win;

//creates browser window
function createWindow(){
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + "/img/download.jpg",
  });
  //load index.html page
  win.loadURL(url.format({
      pathname: path.join(__dirname,'index.html'),
      protocol: 'file:',
      slashes: true
  }));
}