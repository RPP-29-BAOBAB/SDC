import React from 'react';
import ScrollingArrows from '../shared/ScrollingArrows';
import ImageNavigator from './ImageNavigator';
import ImageGalleryModel from './ImageGalleryModel';
import './imageGallery.css';

class ImageGallery extends React.Component {
  constructor(props) { // = {
  //   photos: [],
  //   isExpanded: false,
  //   isZoomed: false,
  //   onClickExpand,
  //   onClickCollapse,
  //   onClickZoom
  // }) {
    super(props);

    this.state = {
      selectedPhotoIndex: 0
    };

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(index) {
    console.log('Updating selectedPhotoIndex: ', index);
    this.setState({
      selectedPhotoIndex: index
    });
  }

  // TODO: Finish dev
  // imageZoom(imgID, resultID) {
  //   // create & insert lens
  //   // TODO: Style lense to be 1/zoom * the width & height of the img, where zoom = 2.5
  //   const lens = document.createElement('DIV');
  //   lens.setAttribute('class', 'img-zoom-lens');

  //   const img = document.getElementById(imgID);
  //   img.parentElement.insertBefore(lens, img);

  //   // Set up result div to display image
  //   // TODO: Style result to be same dims as the img, same location as img, but higher z index
  //   const result = document.getElementById(resultID);
  //   const ratioResultLens = this.getRatioBetweenResultAndLens(result, lens);

  //   result.style.backgroundImage = `url('${img.src}')`;
  //   result.style.backgroundSize = `${(img.width * ratioResultLens.x)}px ${(img.height * ratioResultLens.y)}px`;

  //   // execute a function when someone moves the cursor over the image, or the lens
  //   const moveLens = this.moveLens.bind(null, img, lens);
  //   lens.addEventListener('mousemove', moveLens);
  //   img.addEventListener('mousemove', moveLens);

  //   // touch screen events
  //   lens.addEventListener('touchmove', moveLens);
  //   img.addEventListener('touchmove', moveLens);
  // }

  // moveLens(img, lens, e) {
  //   // prevent any other actions that may occur when moving over the image:
  //   e.preventDefault();

  //   // TODO: Finish dev. These methods are in ZoomedImageModel.
  //   // const cursorPosition = this.getCursorPosition(e, img, window);
  //   // const lensPosition = this.getLensPosition(cursorPosition, img, lens);

  //   // // set the position of the lens:
  //   // lens.style.left = `${lensPosition.x}px`;
  //   // lens.style.top = `${lensPosition.y}px`;

  //   // // display what the lens "sees"
  //   // result.style.backgroundPosition = `-${lensPosition.x * xResultLenseRatio}px -${lensPosition.y * yResultLensRatio}px`;
  // }

  render() {
    console.log('Rendering image gallery');

    const currentIndex = this.state.selectedPhotoIndex;
    console.log('currentIndex', currentIndex);

    const model = new ImageGalleryModel({
      photos: this.props?.photos,
      isExpanded: this.props?.isExpanded,
      isZoomed: this.props?.isZoomed
    }, currentIndex);
    const thumbnails = model.getPhotoThumbnailUrls();
    const viewId = model.getViewId();
    const attributes = model.getAttributes();
    const photoUrl = model.getSelectedPhoto();
    const handleImageClick = model.isExpanded ? this.props.onClickZoom : this.props.onClickExpand;

    return (
      <div id="po-image-gallery" {...attributes}>
        <div id={viewId}>
          <div class="row">
            {
              !model.isZoomed &&
              <ImageNavigator
                onClick={this.updateIndex}
                thumbnails={thumbnails}
                selectedId={currentIndex}
                length={thumbnails.length}
                useIcons={model.isExpanded}
              />
            }
            <div class="column">
              {
                !model.isExpanded &&
                <div class="image-gallery-expanded-view-toggle" onClick={this.props.onClickExpand}>
                  <svg viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M1 1v6h2V3h4V1H1zm2 12H1v6h6v-2H3v-4zm14 4h-4v2h6v-6h-2v4zm0-16h-4v2h4v4h2V1h-2z"
                    />
                  </svg>
                </div>
              }
              {
                model.isExpanded &&
                <div class="image-gallery-collapsed-view-toggle" onClick={this.props.onClickCollapse}>
                  <svg viewBox="0,0,999,937">
                    <path
                      d="M687.572+406.573L968.56+406.573C986.292+406.573+999.53+392.585+999.53+374.883C999.53+357.15+986.292+344.13+968.56+344.161L718.795+344.161L718.795+93.8959C718.795+76.1631+705.308+62.676+687.575+62.676C669.842+62.676+656.355+76.1631+656.355+93.8959L656.355+374.883C656.355+374.976+656.386+375.039+656.386+375.101C656.386+375.194+656.355+375.257+656.355+375.35C656.353+392.771+670.151+406.604+687.572+406.573Z"
                    />
                    <path
                      d="M312.176+62.9251C294.474+62.9251+281.454+76.1942+281.454+93.8959L281.454+343.66L31.2199+343.66C13.4871+343.66+0+357.147+0+374.88C0+392.613+13.4871+406.1+31.2199+406.1L312.207+406.1C312.3+406.1+312.363+406.069+312.425+406.069C312.518+406.069+312.581+406.1+312.674+406.1C330.095+406.1+343.894+392.302+343.894+374.88L343.894+93.8959C343.897+76.1942+329.909+62.9563+312.176+62.9251Z"
                    />
                    <path
                      d="M312.425+593.427L31.4405+593.427C13.7077+593.459+0.469725+607.415+0.469725+625.148C0.469725+642.881+13.7077+655.901+31.4405+655.87L281.205+655.87L281.205+906.104C281.205+923.837+294.692+937.324+312.425+937.324C330.158+937.324+343.645+923.837+343.645+906.104L343.645+625.117C343.645+625.024+343.614+624.961+343.614+624.899C343.614+624.806+343.645+624.743+343.645+624.65C343.647+607.226+329.846+593.427+312.425+593.427Z"
                    />
                    <path
                      d="M968.777+593.427L687.793+593.427C687.7+593.427+687.637+593.459+687.575+593.459C687.482+593.459+687.419+593.427+687.326+593.427C669.905+593.427+656.106+607.226+656.106+624.647L656.106+905.634C656.106+923.367+670.094+936.574+687.827+936.605C705.529+936.636+718.549+923.367+718.549+905.666L718.549+655.901L968.777+655.901C986.51+655.901+999.997+642.414+999.997+624.681C999.997+606.948+986.513+593.459+968.777+593.427Z"
                    />
                  </svg>
                </div>
              }
              {
                !model.isZoomed &&
                <ScrollingArrows
                  callback={this.updateIndex}
                  max={model.length - 1}
                  stem={true}
                />
              }
            </div>
          </div>
          <div id="po-main-image" onClick={handleImageClick}>
            <img src={photoUrl} />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageGallery;