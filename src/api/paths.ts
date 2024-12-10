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

export const categoryName: { [key: number]: string } = {
  0: 'Ubytování',
  1: 'Lipenská přehrada',
  2: 'Příroda',
  3: 'Obce',
  4: 'Historie',
  5: 'Sport',
  6: 'Ostatní',
  10: 'Kaliště - kniha',
  11: 'Kaliště',
  99999: 'Všechny',
};
