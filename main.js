const {app, BrowserWindow} = require('electron')
const {ipcMain} = require('electron')
const {dialog} = require('electron')
const electron = require('electron')
const path = require('path')
const remote = require('electron').remote;
let fs = require('fs-extra');

const MAIN_HTML = path.join('file://', __dirname, '/Sections/TitlePage/index.html');
const CHILD_PADDING = 50;

const onAppReady = function () {
const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  let parent = new BrowserWindow({
    transparent: true, width: 1200, height: 900, x: 0, y: 0, alwaysOnTop: false, frame: true, autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      contextIsolation: false
    }
  })
  //handle errors that arise for later logging
  parent.once('close', () => {
    parent = null;
  });

  parent.loadURL(MAIN_HTML);
  //parent.toggleDevTools();
};

// Event handler for synchronous incoming messages
ipcMain.on('write-to-file', (event, arg) => {

  // Synchronous event emmision
  event.returnValue = 'sync pong'

  //write to file
  fs.writeFile(path.join(process.env.APPDATA, "/Software-Soundboard/buttons.txt"), arg, (err) => {})
})

ipcMain.on('get-from-file', (event, arg) => {

  //check and make sure file actually exists
  if (fs.existsSync(path.join(process.env.APPDATA, "/Software-Soundboard/buttons.txt"))) {
    console.log('Button Config File Found!')
  } else {
    fs.writeFile(path.join(process.env.APPDATA, "/Software-Soundboard/buttons.txt"), '[["toys.mp3","1"],["toys.mp3","3"],["toys.mp3","4"]]', (err) => {})
  }

  //Make sure the Audio folder exists
  fs.ensureDir(path.join(process.env.APPDATA, "/Software-Soundboard/Audio-Files/"), err => {
    console.log(err) // => null
    // dir has now been created, including the directory it is to be placed in
  })
    

  //write to file
  let data = fs.readFileSync(path.join(process.env.APPDATA, "/Software-Soundboard/buttons.txt"), 'utf8').split('\n')

  // Synchronous event emmision
  event.returnValue = data;
})

ipcMain.on('copy-mp', (event, arg) => {

  
  //open the file dialog
  dialog.showOpenDialog({
    properties: ['openFile']
    }).then((data) => {
      fs.copy(data.filePaths[0], path.join(process.env.APPDATA, "/Software-Soundboard/Audio-Files/" + path.parse(data.filePaths[0]).base))
      .then(() => event.returnValue = path.parse(data.filePaths[0]).base)
      .catch(err => event.returnValue = "Error: " + err)
    });
  
  
  // Synchronous event emmision

})

ipcMain.on('get-Path', (event, arg) => {

  event.returnValue = path.join(process.env.APPDATA, "/Software-Soundboard/Audio-Files/");

})

//~ app.on('ready', onAppReady);
app.on('ready', () => setTimeout(onAppReady, 500));

//handle the closing of the app
app.on('window-all-closed', () => {
  app.quit()
})
