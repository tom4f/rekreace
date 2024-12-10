enum ServerUrl {
  LOCALHOST = 'http://localhost:80',
  LIVE = 'https://www.frymburk.com',
}
const dev = process.env.NODE_ENV !== 'production';

const target = dev ? ServerUrl.LIVE : '';

export enum Url {
  DAVIS = 'https://www.frymburk.com/davis',
  KAMERA = 'https://www.frymburk.com/kamera',
  API = 'https://www.frymburk.com/rekreace/api',
  NEW_API = 'https://www.frymburk.com/api',
  GRAPHS = 'https://www.frymburk.com/rekreace/graphs',
  FOTOGALERIE = 'https://www.frymburk.com/rekreace/fotogalerie_ubytovani',
  BIG_GRAPH = 'https://www.frymburk.com/rekreace/aktuality_big_graph.php',
  GET_IP_KAMERA = 'https://www.frymburk.com/rekreace/get_ip_kamera.php',
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
