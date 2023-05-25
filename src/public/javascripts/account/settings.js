const avatarImage = document.getElementById('avatar-img');
const imageInput = document.getElementById('image-input');
const userName = document.getElementsByClassName("user-name")[0]

userName.addEventListener('click', () => {
    imageInput.click();
});

avatarImage.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    avatarImage.src = URL.createObjectURL(file);
});