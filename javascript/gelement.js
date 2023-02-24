HTMLSelectElement.prototype.pretty = function (options) {

    let id = this.id;
    let option = this.children[0];

    this.style.display = 'none';

    let new_select = document.createElement('div');
    // Estylos compartidos
    new_select.className = this.className;
    if (options.select) {
        for (let key in options.select) {
            let value = options.select[key];
            new_select.style[key] = value;
        }
    }

    // Valor del elemento seleccionado
    new_select.textContent = this.selectedOptions[0].innerText;

    // onclick
    new_select.onclick = () => {
        console.log(this.children)
    }

    this.insertAdjacentElement('afterend', new_select);

    this.onchange = this.pretty;
}