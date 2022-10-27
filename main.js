// USO DE LA LIBRERIA GIMAGE
btn_recortar.onclick = async ()=>{

    let blob = await gImage.mini(file);
    previzualize_image.src =  URL.createObjectURL(blob);

}

descargar.onclick = async ()=>{
    let blob = await gImage.mini(file);
    let url = URL.createObjectURL(blob);
    let enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "Imagen comprimida";
    enlace.click();
}
