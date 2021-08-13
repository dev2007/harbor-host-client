const { app, Menu, BrowserWindow,shell } = require('electron')
//主窗体构建
function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: "MorTnon Harbor",
    menuBarVisible:false,
    minWidth: 800,
    minHeight: 600
  })

  win.loadURL(`file://${app.getAppPath()}/index.html`)

  win.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });
}

//应用相关
// app.whenReady().then(createMainWindow)

app.on('ready', () => {
  createMainWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})