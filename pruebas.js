let quoting = false;

const waitQuoting = async () => {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            if (quoting == false) resolve();
        }, 100);
    })
}

const quote = async () => {
    console.log('Cotizando');
    quoting = true;
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 4000);
    })
    console.log('cotizado');
    quoting = false;
}

quote();

(async () => {
    console.log('Esperando disponibilidad para cotizar');
    await waitQuoting();
    console.log('La cotización está disponible');
    await quote();
    console.log('Cotización 2 completada');
})();