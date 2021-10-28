import IpcCall from 'types/IpcCall';

const { ipcRenderer } = window.require('electron');

async function ipcRendererHandler(event: string, ...args: any[]): Promise<any> {
  const ipcCall: IpcCall = {
    event,
    data: args,
  };

  let res;
  try {
    res = await ipcRenderer.invoke('realmEvent', ipcCall);
  } catch (err) {
    console.error(err);
    return null;
  }
  return res;
}

// eslint-disable-next-line import/prefer-default-export
export { ipcRendererHandler };
