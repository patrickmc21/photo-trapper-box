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
  try {
    const photos = await getPhotos();
    
    photoTrapper.addPhotos(photos);
    generatePhotoContainerContent(photos);
  } catch (error) {
    $('.main__form-container--error-message').text(error);
  }
};

const collectUserInput = async (event) => {
  event.preventDefault();
  const title = $('#title').val();
  const url = $('#url').val();

  try {
    const photo = await postPhoto(title, url);

    photoTrapper.addPhotos([photo]);
    generatePhotoContainerContent([photo]);
    $('#title').val('');
    $('#url').val('');
  } catch (error) {
    $('.main__form-container--error-message').text(error);
  }
};

async function removePhoto(){
  try {
    const id = $(this).data('photoid');

    await deletePhoto(id)
    photoTrapper.removePhoto(id);
    $('.main__photo-container').html('')
    generatePhotoContainerContent(photoTrapper.photos)
  } catch (error) {
    $('.main__form-container--error-message').text(error);
  }
};

const getPhotos = async () => {
  const endPoint = '/api/v1/photos';

  try {
    const response = await fetch(endPoint);
    const photos = response.json();

    return photos;
  } catch (error) {
    return error.message;
  }
};

const postPhoto = async (title, url) => {
  if (!title || !url) {
    throw Error({message: 'You must include title and url'})
  }

  const endPoint = '/api/v1/photos';
  const options = {
    method: 'POST',
    body: JSON.stringify({title, url}),
    headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const response = await fetch(endPoint, options);
    const photo = await response.json();
    console.log(response)
    return photo;
  } catch (error) {
    console.log(error)
    return error.message
  }
};

const deletePhoto = (id) => {
  const endPoint = '/api/v1/photos';
  const options = {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    fetch(endPoint, options);
  } catch (error) {
    return error.message;
  }
}

const createPhotoCard = (photo) => {
  return `
    <article class="main__photo-container--photo-card">
      <div class="main__photo-container--photo-card__image-container">
        <img class="main__photo-container--photo-card__image-container--img" src="${photo.url}">
      </div>
      <div class="main__photo-container--photo-card__title-container">
        <h2 class="main__photo-container--photo-card__title-container--title">
          ${photo.title}
        </h2>
        <button class="remove-btn" data-photoId="${photo.id}">
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

