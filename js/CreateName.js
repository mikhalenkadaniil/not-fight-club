const nameCheckbox = document.getElementById('name-checkbox')
const nameInput = document.getElementById('NameInput')
const nameBtn = document.getElementById('createCharacter__btn')

export default function CreateName () {
    if (!localStorage.getItem('nameCharacter')) nameCheckbox.checked = !nameCheckbox.checked;
    nameBtn.addEventListener('click', () => {
        if(nameInput.value.length) {
            localStorage.setItem('nameCharacter', nameInput.value);
            nameCheckbox.checked = !nameCheckbox.checked;
        }
    });
}