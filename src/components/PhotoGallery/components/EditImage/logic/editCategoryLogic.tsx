import { Url, fotoGalleryOwner } from "../../../../../api/paths";
import {
  addCategoryLogicType,
  editCategoryLogicType,
} from "./../../../TypeDefinition";

export const editCategoryLogic: editCategoryLogicType = async (
  event,
  categoryName,
  setAlert
) => {
  event.preventDefault();
  if (!categoryName) return;
  setAlert({ header: "Ukládám změny", text: "malý moment...", color: "lime" });

  try {
    const resp = await fetch(`${Url.API}/saveCategoryName.php`, {
      method: "POST",
      body: JSON.stringify({
        categoryName,
        fotoGalleryOwner,
      }),
    });

    if (resp.status !== 200) {
      throw new Error("Request Failed");
    } else {
      setAlert({ header: "OK", text: ":-(", color: "lime" });
    }
  } catch (err: any) {
    setAlert({ header: "Error", text: err?.message, color: "red" });
  }
};

export const addCategoryLogic: addCategoryLogicType = async (
  event,
  setCategoryName
) => {
  event.preventDefault();
  setCategoryName((orig) => ({ ...orig, 10: "value" }));
};
