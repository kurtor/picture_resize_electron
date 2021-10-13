const {
    app,
    BrowserWindow,
} = require('electron')

const path = require('path')

app.on('ready', ()=>{
    createWindow()
})

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

function createWindow(){
    win = new BrowserWindow({
        width: 400,
        height: 400,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadFile(path.join(__dirname, 'index.html'));

    //win.webContents.openDevTools()
    
    win.on('closed', () => {
        win = null
    })
}