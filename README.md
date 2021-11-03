# MD Notes

This application lets you take notes in [Markdown](https://www.markdownguide.org/) and preview them.

Notes are saved to the local device and backed up to the cloud.

The application is available on Mac, Linux, and Windows.

## Technologies Used

MD Notes is an [Electron](https://www.electronjs.org/) and [React](https://reactjs.org/) application, bootstrapped with [Electron React Boilerplate](https://electron-react-boilerplate.js.org/). It also uses MongoDB Realm as a local database and auth provider. All code is written in [TypeScript](https://www.typescriptlang.org/).

## Development

### Getting Started

To get started, run:

```shell
git clone https://github.com/mongodben/erb-realm-notes.git
cd erb-realm-notes
yarn install
cd release/app
yarn install # installs native dependencies not transpiled by webpack, including realm
cd ../..
yarn start 
```

Notes:

* The renderer process has hot refresh, but the main process requires killing and restarting the process for code updates

### Application Architecture

MD Notes roughly follows a model-view-controller design pattern. The component parts are:

* **Model**: Realm database
* **View**: React frontend in the Electron Renderer Process
* **Controller**: NodeJS with the Realm JS SDK in the Electron Main Process

Communication between the View and Controller is performed using [Electron's inter-process communication (IPC)](https://www.electronjs.org/docs/latest/glossary#ipc) functionality. Communication between the renderer and Realm is *stateless*, initiated by IPC calls from the renderer (similar to a client making HTTP calls to a server).

#### Design Considerations

The application's use of IPC for stateless communication between the renderer and main is fairly different from standard Electron application design, in which most of the data is handled in the renderer process. It's also fairly different from standard Realm apps, where data is handled in the client (in this case the client would be the renderer).

The reason that the IPC approach was chosen was to accelerate development. Weird errors occurred when using Realm in the renderer process, and rather than debugging said errors, it was decided to forego the debugging by calling Realm from the main process. This decision was made largely because the primary goal of the project was for the developer to practice with the Realm JS SDK, rather than build the optimal application.

In the future, the application may be refactored to use Realm from the Renderer process.

### Using Realm

**Note:** Before reading this section, you should be familiar with the basic architecture of an Electron application, including the **Renderer** and **Main** processes. MD Notes makes heavy use of Electron's IPC functionality, and having a basic understanding of it is important to a productive developer experience. With this being said, most of the underlying logic is abstracted away by helper functions.

To communicate between the renderer and Realm, you must do the following:
1. Create a function in the Main process for handling Realm data
2. Add the function to known IPC call list
3. Call the function from the Renderer

#### 1. Create a function in the Main process for handling Realm data

Create a function to handle Realm data in the Main process folder `src/main/realm`.

The function should have the arguments:

```ts
function myRealmFunction(app: Realm.App, realm: RealmWrapper, args: any[]): any {
// ...my code
}
```

Notes:

* If the function doesn't have this shape, TypeScript throws an error.
* If you're not using any of the arguments, replace them with `_`, `__` ...
* The `app` and `realm` arguments are invoked by `ipcMain.handle('realmEvent', ...)`. 

#### 2. Add function to known IPC call list

After creating the realm Function, add it to the list of known IPC calls. This list is found in the file `src/main/realm/ipcCalls.ts`. Only Realm IPC calls added to this list can be invoked from the Renderer process without writing additional handler code.

In `src/main/realm/ipcCalls.ts`:

```ts
import myRealmFunction from './path/to/file'

const realmIpcCalls: Map = {
  // other Realm functions
  myRealmFunction,
  // other Realm functions
};

export default realmIpcCalls;
```

#### 3. Call the function from the Renderer

From within the Renderer process, call the Realm function in the main process using the helper method `ipcRendererHandler` defined in `src/renderer/ipc/index/ts`. 

The function has the following shape:

```ts
async function ipcRendererHandler(event: string, ...args: any[]): Promise<any> {

```

To call the function:

```ts
const res = await ipcRendererHandler('myRealmFunction', foo, bar);
```

Notes:

* The function is async, and should be used with await/Promises
* The event parameter should match the name of the Realm function defined in the main process and included in ipcCalls.ts.

## Contributors

Hacked together by [Ben Perlmutter](https://github.com/mongodben) in an attempt to learn how to use the MongoDB Realm JS SDK.
