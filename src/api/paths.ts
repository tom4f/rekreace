export enum Url {
  DAVIS = '/davis',
  WEBCAM = '/kamera',
  API = '/rekreace/api',
  NEW_API = '/api',
  GRAPH_QL_API = '/api/graphql/index.php',
  GRAPHS = '/rekreace/graphs',
  FOTOGALERIE = '/rekreace/fotogalerie_ubytovani',
}

const urlParams = new URLSearchParams(new URL(document.URL).search);
export const fotoGalleryOwner =
  urlParams.get('fotoGalleryOwner') || '_ubytovani';
export const isFullscreen = () =>
  urlParams.get('fullscreen') === 'true' || false;
