using System.Collections.Generic;

namespace gLibraries
{
    public class gCookie
    {
        /// <summary>
        /// Retorna un diccionario de todas las propiedades almacenadas en 
        /// la aplicación.
        /// </summary>
        /// <returns>
        /// Un diccionario de string y valores dinámicos.
        /// </returns>
        public static IDictionary<string, dynamic> all()
        {
            IDictionary<string, dynamic> lista = Xamarin.Forms.Application.Current.Properties;
            return lista;
        }

        /// <summary>
        /// Retorna el valor de una propiedad almacenada en la aplicación.
        /// </summary>
        /// <param name="name">Nombre de la propiedad que se quiere obtener.</param>
        /// <returns>
        /// El valor de la propiedad almacenada.
        /// </returns>
        public static dynamic get(string name)
        {
            return all()[name];
        }

        /// <summary>
        /// Recibe un string y un valor dinámico para almacenarlos como
        /// una propiedad en la aplicación.
        /// </summary>
        /// <param name="name">Nombre de la propiedad a almacenar.</param>
        /// <param name="dynamic">Valor dinámico para la propiedad.</param>
        /// <returns>
        /// Un valor booleano
        /// </returns>
        public static bool set(string name, dynamic value)
        {
            Xamarin.Forms.Application.Current.Properties[name] = value;
            return true;
        }

        /// <summary>
        /// Recibe la lista de claves o clave singular que será borrada
        /// de la caché de la aplicación. Si no recibe nada entonces se
        /// se limpia toda la caché.
        /// </summary>
        /// <param name="dynamic">Puede ser una clave, o una lista de 
        /// claves, por defecto es null.</param>
        /// <returns>
        /// Un valor booleano
        /// </returns>
        public static bool clean(dynamic e = null)
        {
            List<string> keys = new List<string>();
            if (e is string)
            {
                keys.Add(e);
            }
            else if (e is List<string>)
            {
                keys = e;
            }
            else
            {
                keys = (List<string>)all().Keys;
            }
            keys.ForEach(key =>
            {
                Xamarin.Forms.Application.Current.Properties.Remove(key);
            });
            return true;
        }
    }
}
