import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BigImageType } from "../../TypeDefinition";
import { EditImage } from "./../EditImage/EditImage";
import "./BigImages.css";
import { BigImg } from "./BigImg.styled";
import { CategoryList } from "./CategoryList";
import { ChangeImage } from "./ChangeImage";
import { InfoText } from "./InfoText";
import { Presentation } from "./Presentation";

export const BigImage = ({
  bigPhoto,
  imgPosition,
  setImgPosition,
  categoryObj,
  length,
}: BigImageType) => {
  const [fadeIn, setFadeIn] = useState(true);
  const [editPhoto, setEditPhoto] = useState(bigPhoto);
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  const imgSizeHandler = (): void => {
    // if (!mainRef.current) return
    // if (!mainRef.current.style.backgroundImage) return

    if (mainRef.current) {
      const url = window
        .getComputedStyle(mainRef.current, "::after")
        .getPropertyValue("background-image")
        .slice(5, -2);

      //const url = mainRef.current.style.backgroundImage.split('"')[1]
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (!mainRef.current) return;
        const mainWidth = mainRef.current.offsetWidth;
        const { width: imgWidth, height: imgHeight } = img;
        const height = (imgHeight * mainWidth) / imgWidth + "px";
        mainRef.current.style.height = height;
        mainRef.current.style.maxHeight = "calc(100vh - 105px)";
      };
    }
  };

  useEffect(() => {
    setFadeIn(true);
    const timeout = setTimeout(() => setFadeIn(false), 500);
    if (pathname === "/fotogalerie/edit") {
      setEditPhoto(bigPhoto);
    }
    imgSizeHandler();
    return () => clearTimeout(timeout);
  }, [bigPhoto, pathname]);

  useEffect(() => {
    window.addEventListener("resize", imgSizeHandler);
    return () => window.removeEventListener("resize", imgSizeHandler);
  }, []);

  return (
    <BigImg
      ref={mainRef}
      bigPhoto={bigPhoto}
      editPhoto={editPhoto}
      className={`main-img`}
      fadeIn={fadeIn}
      imgPosition={imgPosition}
    >
      <InfoText bigPhoto={bigPhoto} />
      <ChangeImage
        setImgPosition={setImgPosition}
        length={length}
        imgPosition={imgPosition}
      />
      <Presentation setImgPosition={setImgPosition} length={length} />
      <CategoryList setImgPosition={setImgPosition} categoryObj={categoryObj} />
      {pathname === "/fotogalerie/edit" && (
        <EditImage
          setImgPosition={setImgPosition}
          categoryObj={categoryObj}
          editPhoto={editPhoto}
          setEditPhoto={setEditPhoto}
        />
      )}
    </BigImg>
  );
};
