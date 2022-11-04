

class gStorage{
    static local(key = null, value = null){
            if(key !=null && value == null){
                // RECUPERAR
               let data = sessionStorage.getItem(key);
               return data;

            }else if(key != null && value != null){
                // SETEAR
                localStorage.setItem(key,value);
                return true;
            }else{
                // LIMPIAR
                localStorage.clear()
                return true;
            }
    }
    static session(key = null, value = null){

    }
}