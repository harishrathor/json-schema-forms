import path from 'path';

export function getClientRoot(clientName) {
    return path.join(SERVER.PATHS.APP_CLIENTS_ROOT, clientName, 'dist');
}

export function getClientAssetsPath(clientName) {
    return path.join(getClientRoot(clientName), 'assets');
}

export function getClientPrivateAssetsPath(clientName) {
    return path.join(getClientAssetsPath(clientName), 'private');
}