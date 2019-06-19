import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SRLLightboxGalleryStage } from "./styles";

import SRLLightboxSlideComponent from "./SRLLightboxSlide";
import SRLLightboxControls from "./SRLLightboxControls";

const SRLLightboxGallery = ({
  isOpened,
  handleCloseLightbox,
  overlayColor,
  images,
  selectedImage,
  thumbnailGallery
}) => {
  const [currentImage, setCurrentImage] = useState(selectedImage);
  const [imagesGallery, setimagesGallery] = useState(images);

  useEffect(() => {
    // Add a class to the body to remove the overflow and compensate for the scroll-bar margin
    if (isOpened) {
      document.body.classList.add("SRLOpened");
    }
    // Clean up function to remove the class from the body
    return function cleanUp() {
      document.body.classList.remove("SRLOpened");
    };
  }, [currentImage, isOpened]);

  // Handle Current Image
  function handleCurrentImage(id) {
    const selectedImage = imagesGallery.filter(i => i.id === id);
    setCurrentImage({
      source: selectedImage.src,
      description: selectedImage.alt,
      id: selectedImage.id
    });
  }

  // Handle Next Image
  function handleNextImage(id) {
    /* We receive the ID of the current image and we want the image after that.
    Let's find the current position of the current image in the array */
    const currentPosition = imagesGallery.findIndex(i => i.id === id);
    /* The next image will be the next item in the array but it could be "undefined". If it's undefined we know we have reached the end and we go back to he first image */
    const nextimage = imagesGallery[currentPosition + 1] || imagesGallery[0];
    console.log(nextimage);
    setCurrentImage({
      source: nextimage.src,
      description: nextimage.alt,
      id: nextimage.id
    });
  }

  // Handle Next Image
  function handlePrevImage(id) {
    /* We receive the ID of the current image and we want the image after that.
      Let's find the current position of the current image in the array */
    const currentPosition = imagesGallery.findIndex(i => i.id === id);
    /* The prev image will be the prev item in the array but it could be "undefined" as it goes negative. If it does we need to start from the last image. */
    const nextimage =
      imagesGallery[currentPosition - 1] ||
      imagesGallery[imagesGallery.length - 1];
    setCurrentImage({
      source: nextimage.src,
      description: nextimage.alt,
      id: nextimage.id
    });
  }

  const controls = {
    currentImageId: currentImage.id,
    handleCurrentImage,
    handleNextImage,
    handlePrevImage,
    handleCloseLightbox
  };

  return (
    <SRLLightboxGalleryStage overlayColor={overlayColor}>
      {/* TODO: CREATE A COMPONENT FOR THE NAVIGATION */}
      <SRLLightboxControls {...controls} />

      {/* TODO: CREATE A COMPONENT FOR THE CHOOSEN IMAGE */}
      <SRLLightboxSlideComponent thumbnailGallery {...currentImage} />

      {/* TODO: CREATE A COMPONENT FOR THE GALLERY IF SELECTED */}
    </SRLLightboxGalleryStage>
  );
};

SRLLightboxGallery.propTypes = {
  isOpened: PropTypes.bool,
  images: PropTypes.array,
  overlayColor: PropTypes.string,
  thumbnailGallery: PropTypes.bool,
  selectedImage: PropTypes.object,
  handleCloseLightbox: PropTypes.func
};

export default SRLLightboxGallery;