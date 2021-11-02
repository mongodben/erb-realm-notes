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
2. Add the function to `ipcCalls.ts`
3. Call the function from the Renderer using `ipcRendererHandler`

<!-- TODO(Ben): expand on how this process works -->

## Contributors

Hacked together by [Ben Perlmutter](https://github.com/mongodben) in an attempt to learn how to use the MongoDB Realm JS SDK.
