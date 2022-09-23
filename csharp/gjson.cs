using Newtonsoft.Json;
using Microsoft.CSharp;

namespace gLibraries
{
    /**
     * gJSON es una clase que contiene métodos estáticos que son contenedores
     * para los métodos de Newtonsoft.Json.
     * 
     * Propiedad de SoDe World
     */
    public static class gJSON
    {
        public static object Parse(string text)
        {
            return JsonConvert.DeserializeObject<object>(text);
        }

        public static string Stringify(object _object)
        {
            return JsonConvert.SerializeObject(_object);
        }

        /**
         * Método que verifica si un string es un JSON válido.
         * @param text - Texto a verificar.
         * @returns un valor booleano.
         */
        public static bool Parseable(string text)
        {
            try
            {
                gJSON.Parse(text);
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
    }
}