'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');

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

  ipcMain.on('openREPL', (event, arg) => {
    console.log("OPEN STUFF", arg);
    let win = new BrowserWindow({
      width: 800,
      height: 800,
      resizable: false
    })
    // event.sender.send("received on min", "received on main");
  })

});
