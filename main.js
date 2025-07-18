const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(async () => {
  const sseViewerExtensionPath = path.join(__dirname, 'sse-viewer-main', 'src');
  try {
    await session.defaultSession.loadExtension(sseViewerExtensionPath);
    console.log('SSE Viewer extension loaded successfully');
  } catch (error) {
    console.error('Failed to load SSE Viewer extension:', error);
  }
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});