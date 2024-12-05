import { Url, fotoGalleryOwner } from "../../../api/paths";

export const loadPicturesfromMySQL = () =>
  fetch(`${Url.API}/pdo_read_foto.php?fotoGalleryOwner=${fotoGalleryOwner}`)
    .then((response) => response.json())
    .catch((response) => console.log({ response }));

export const readCategoryName = async () => {
  let respObj = {};
  try {
    const resp = await fetch(
      `${Url.API}/readCategoryName.php?fotoGalleryOwner=${fotoGalleryOwner}`
    );
    const respText = await resp.text();
    respObj = JSON.parse(respText)["categoryName"];
  } catch (err) {
    console.log({ err });
  }
  return respObj;
};
