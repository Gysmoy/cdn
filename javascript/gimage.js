class gimage {
  static async mini(input) {
    if(input.files.length < 0){
        return
    }
    const file = input.files[0];
    const type = file.type;
    const size = file.size;
    let desc = 10000 / size;

    const compress = (file, desc)=>{
        return new Promise((resolve, reject)=>{
            const $canvas = document.createElement("canvas");
            const image = new Image();
            image.onload = ()=>{
                $canvas.width = image.width;
                $canvas.height = image.height;
                $canvas.getContext("2d")
                .drawImage(image, 0, 0)
           
                $canvas.toBlob(
                    (blob)=>{
                        if(blob === null){
                            return reject(blob);
                        }else{
                            resolve(blob);
                        }
                    },
                    type,
                    desc 
                );
            };
            image.src = URL.createObjectURL(file);
        });
    }
    const blob = await compress(file, desc);
    return blob;
  }

  static async full(input) {
    if(input.files.length < 0){
        return
    }
    const file = input.files[0];
    const type = file.type;
    const size = file.size;
    let desc = 100000 / size;
    const compress = (file, desc)=>{
        return new Promise((resolve, reject)=>{
            const $canvas = document.createElement("canvas");
            const image = new Image();
            image.onload = ()=>{
                $canvas.width = image.width;
                $canvas.height = image.height;
                $canvas.getContext("2d")
                .drawImage(image, 0, 0)
                $canvas.toBlob(
                    (blob)=>{
                        if(blob === null){
                            return reject(blob);
                        }else{
                            resolve(blob);
                        }
                    },
                    type,
                    desc 
                );
            };
            image.src = URL.createObjectURL(file);
        });
    }
    const blob = await compress(file, desc);
    return blob;
  }
}
