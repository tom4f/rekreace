export enum Url {
  DAVIS = '/davis',
  KAMERA = '/kamera',
  API = '/rekreace/api',
  NEW_API = '/api',
  GRAPHS = '/rekreace/graphs',
  FOTOGALERIE = '/rekreace/fotogalerie_ubytovani',
  GET_IP_KAMERA = '/rekreace/get_ip_kamera.php',
}

const urlParams = new URLSearchParams(new URL(document.URL).search);
export const fotoGalleryOwner =
  urlParams.get('fotoGalleryOwner') || '_ubytovani';
export const isFullscreen = () =>
  urlParams.get('fullscreen') === 'true' || false;
