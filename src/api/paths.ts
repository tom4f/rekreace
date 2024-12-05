export enum Url {
  DAVIS = '/davis',
  KAMERA = '/kamera',
  API = '/rekreace/api',
  GRAPHS = '/rekreace/graphs',
  FOTOGALERIE = '/rekreace/fotogalerie_ubytovani',
  BIG_GRAPH = '/rekreace/aktuality_big_graph.php',
  GET_IP_KAMERA = '/rekreace/get_ip_kamera.php',
}

const urlParams = new URLSearchParams(new URL(document.URL).search);
export const fotoGalleryOwner =
  urlParams.get('fotoGalleryOwner') || '_ubytovani';

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
