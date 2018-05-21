class PhotoTrapper {
  constructor() {
    this.photos = [];
  }

  addPhotos(photos) {
    this.photos = [...this.photos, ...photos];
  }

  removePhoto(id) {
    this.photos = this.photos.filter(photo => photo.id !== id);

  }
};

const photoTrapper = new PhotoTrapper();

const populatePhotosOnLoad = async () => {
  // get request
  const photos = await getPhotos();
  // add to phototrapper
  photoTrapper.addPhotos(photos);
  // append photos
  generatePhotoContainerContent(photos);
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

const getPhotos = async () => {
  const url = '/api/v1/photos';

  try {
    const response = await fetch(url);
    const photos = response.json();
    return photos;
  } catch (error) {
    return error.message;
  }
};

const createPhotoCard = (photo) => {
  console.log(photo.url)
  return `
    <article class="main__photo-container--photo-card" data-photoId="${photo.id}">
      <div class="main__photo-container--photo-card__image-container">
        <img class="main__photo-container--photo-card__image-container--img" src="${photo.url}">
      </div>
      <div class="main__photo-container--photo-card__title-container">
        <h2 class="main__photo-container--photo-card__title-container--title">
          ${photo.title}
        </h2>
        <button class="remove-btn">
          Remove
        </button>
      </div>
    </article>
  `
};

const generatePhotoContainerContent = (photos) => {
  const photoHTML = photos.reduce((html, photo) => {
    return html + createPhotoCard(photo);
  }, '') ;
  $('.main__photo-container').append(photoHTML);
};

$(document).ready(populatePhotosOnLoad);
$('#submit').on('click', collectUserInput);
$('.main__photo-container').on('click', '.remove-btn', removePhoto);

