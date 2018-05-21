class PhotoTrapper {
  constructor() {
    this.photos = [];
  }

  addPhoto(photo) {
    this.photos = [...this.photos, photo];
  }

  removePhoto(id) {
    this.photos = this.photos.filter(photo => photo.id !== id);

  }
};

const photoTrapper = new PhotoTrapper();

const populatePhotosOnLoad = () => {
  // get request
  // add to phototrapper
  // append photos
};

const collectUserInput = (e) => {
  e.preventdefault();
  const title = $('#title').val();
  const url = $('#url').val();
  // post request
  // add to phototrapper
  // append photo
  // clear inputs
};

const removePhoto = () => {
  // extract id from selected DOM node
  // remove from phototrapper
  // DELETE request
  // re-render photos
};

const appendPhoto = (photo) => {
  return `
    <article class="main__photo-container--photo-card" data-photoId="${photo.id}">
      <div class="main__photo-container--photo-card__image-container">
        <img class="main__photo-container--photo-card__image-container--img src="${photo.url}">
      </div>
      <div class="main__photo-container--photo-card__title-container">
        <h2 class="main__photo-container--photo-card__title-container--title">
          ${photo.title}
        </h2>
      </div>
    </article>
  `
};



$()

