'use strict';

const {app, BrowserWindow} = require('electron');

require('electron-reload')(__dirname);

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 450,
    height: 500,
    resizable: false
  })

  win.loadURL(`file://${__dirname}/app/index.html`)

  win.on('closed', () => {
    win = null
  })

});
