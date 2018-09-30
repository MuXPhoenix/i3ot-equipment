import electron = require('electron');
// Module to control application life
const app = electron.app;
const domainUrl = "http://127.0.0.1:4200";
// This should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
	// Squirrel event handled and app will exit in 1000ms, so don't do anything else
	app.quit();
}

import path = require('path');
import url = require('url');

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: electron.BrowserWindow;

// Get environment type (dev / prod)
const args = process.argv.slice(1);
let dev = args.some(arg => arg === '--dev');


function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({ width: 1024, height: 720 });
	// mainWindow.setMenu(null);

	let url_path = '';
	const mainMenuTemplate = [{
		label: '设备列表',
		click(){
			url_path = '/activate';
			mainWindow.loadURL(url.format({
				pathname: path.join(__dirname, 'dist/index.html'),
				// pathname: path.join(__dirname, 'index.html'),
				protocol: 'file:',
				slashes: true,
				hash: url_path
			}));
		}
	},{
		label: 'MQTT',
		click(){
			url_path = '/mqtt';
			mainWindow.loadURL(url.format({
				pathname: path.join(__dirname, 'dist/index.html'),
				// pathname: path.join(__dirname, 'index.html'),
				protocol: 'file:',
				slashes: true,
				hash: url_path
			}));
		}
	},{
		label: 'MODBUS',
		click(){
			url_path = '/modbus';
			mainWindow.loadURL(url.format({
				pathname: path.join(__dirname, 'dist/index.html'),
				// pathname: path.join(__dirname, 'index.html'),
				protocol: 'file:',
				slashes: true,
				hash: url_path
			}));
		}
	},{
		label: '登录',
		click(){
			url_path = '/login';
			mainWindow.loadURL(url.format({
				pathname: path.join(__dirname, 'dist/index.html'),
				// pathname: path.join(__dirname, 'index.html'),
				protocol: 'file:',
				slashes: true,
				hash: url_path
			}));
		}
	},{
		label: '系统',
		submenu:[
			{
				label:'退出',
				click(){
					app.quit();
				}
			}
		]
	}];
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	Menu.setApplicationMenu(mainMenu);

	if(url_path == '' || url_path == '/') {

		if (!dev) {
			// and load the index.html of the app.
			mainWindow.loadURL(url.format({
				pathname: path.join(__dirname, 'dist/index.html'),
				protocol: 'file:',
				slashes: true
			}));
		} else {
			mainWindow.loadURL(domainUrl);
		}
	}

	//zxx  ----------
	// if(dev){
        // Open the DevTools.
       	mainWindow.webContents.openDevTools();
	// }

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {

		createWindow();
	}
});

function handleSquirrelEvent(app) {
	if (process.argv.length === 1) {
		return false;
	}

	const ChildProcess = require('child_process');
	const path = require('path');

	const appFolder = path.resolve(process.execPath, '..');
	const rootAtomFolder = path.resolve(appFolder, '..');
	const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
	const exeName = path.basename(process.execPath);

	const spawn = function(command, args) {
		let spawnedProcess, error;

		try {
			spawnedProcess = ChildProcess.spawn(command, args, {
				detached: true
			});
		} catch (error) {}

		return spawnedProcess;
	};

	const spawnUpdate = function(args) {
		return spawn(updateDotExe, args);
	};

	const squirrelEvent = process.argv[1];
	switch (squirrelEvent) {
		case '--squirrel-install':
		case '--squirrel-updated':
			// Optionally do things such as:
			// - Add your .exe to the PATH
			// - Write to the registry for things like file associations and
			//   explorer context menus

			// Install desktop and start menu shortcuts
			spawnUpdate(['--createShortcut', exeName]);

			setTimeout(app.quit, 1000);
			return true;

		case '--squirrel-uninstall':
			// Undo anything you did in the --squirrel-install and
			// --squirrel-updated handlers

			// Remove desktop and start menu shortcuts
			spawnUpdate(['--removeShortcut', exeName]);

			setTimeout(app.quit, 1000);
			return true;

		case '--squirrel-obsolete':
			// This is called on the outgoing version of your app before
			// we update to the new version - it's the opposite of
			// --squirrel-updated

			app.quit();
			return true;
	}
}


// import { app, BrowserWindow, screen ,Menu} from 'electron';
// import * as path from 'path';
// import * as url from 'url';
//
// let win, win1,serve;
// const args = process.argv.slice(1);
// serve = args.some(val => val === '--serve');
//
// function createWindow() {
//
// 	const electronScreen = screen;
// 	const size = electronScreen.getPrimaryDisplay().workAreaSize;
//
// 	// Create the browser window.
// 	win = new BrowserWindow({
// 		x: 0,
// 		y: 0,
// 		width: size.width,
// 		height: size.height
// 	});
// 	let url_path = '';
// 	const mainMenuTemplate = [{
// 		label: '设备列表',
// 		click(){
// 			url_path = '/activate';
// 			win.loadURL(url.format({
// 				pathname: path.join(__dirname, 'dist/index.html'),
// 				protocol: 'file:',
// 				slashes: true,
// 				hash: url_path
// 			}));
// 		}
// 	},{
// 		label: 'MQTT',
// 		click(){
// 			url_path = '/mqtt';
// 			win.loadURL(url.format({
// 				pathname: path.join(__dirname, 'dist/index.html'),
// 				protocol: 'file:',
// 				slashes: true,
// 				hash: url_path
// 			}));
// 		}
// 	},{
// 		label: 'MODBUS',
// 		click(){
// 			url_path = '/modbus';
// 			win.loadURL(url.format({
// 				pathname: path.join(__dirname, 'dist/index.html'),
// 				protocol: 'file:',
// 				slashes: true,
// 				hash: url_path
// 			}));
// 		}
// 	},{
// 		label: '登录',
// 		click(){
// 			url_path = '/login';
// 			win.loadURL(url.format({
// 				pathname: path.join(__dirname, 'dist/index.html'),
// 				protocol: 'file:',
// 				slashes: true,
// 				hash: url_path
// 			}));
// 		}
// 	},{
// 		label: '系统',
// 			submenu:[
// 			{
// 				label:'退出',
// 				click(){
// 					app.quit();
// 				}
// 			}
// 		]
// 	}];
// 	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
// 	Menu.setApplicationMenu(mainMenu);
//
// 	if(url_path == '' || url_path == '/') {
// 		if (serve) {
// 			// require('electron-reload')(__dirname, {
// 			// 	electron: require(`${__dirname}/node_modules/electron`)
// 			// });
// 			win.loadURL('http://127.0.0.1:4200');
// 		} else {
// 			// win.loadURL(url.format({
// 			// 	pathname: path.join(__dirname, 'index.html'),
// 			// 	protocol: 'file:',
// 			// 	slashes: true
// 			// }));
// 			win.loadURL(url.format({
// 				pathname: path.join(__dirname, 'dist/index.html'),
// 				protocol: 'file:',
// 				slashes: true
// 			}));
// 		}
// 	}
//
// 	win.webContents.openDevTools();
//
// 	// Emitted when the window is closed.
// 	win.on('closed', () => {
// 		// Dereference the window object, usually you would store window
// 		// in an array if your app supports multi windows, this is the time
// 		// when you should delete the corresponding element.
// 		win = null;
// 	});
//
// }
//
// try {
//
// 	// This method will be called when Electron has finished
// 	// initialization and is ready to create browser windows.
// 	// Some APIs can only be used after this event occurs.
// 	app.on('ready', createWindow);
//
// 	// Quit when all windows are closed.
// 	app.on('window-all-closed', () => {
// 		// On OS X it is common for applications and their menu bar
// 		// to stay active until the user quits explicitly with Cmd + Q
// 		if (process.platform !== 'darwin') {
// 			app.quit();
// 		}
// 	});
//
// 	app.on('activate', () => {
// 		// On OS X it's common to re-create a window in the app when the
// 		// dock icon is clicked and there are no other windows open.
// 		if (win === null) {
// 			createWindow();
// 		}
// 	});
//
// } catch (e) {
// 	// Catch Error
// 	// throw e;
// }