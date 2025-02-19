export default (req:any, res:any) => {
    // Establecemos el código de estado de la respuesta HTTP en 200
    res.statusCode = 200;
    // Establecemos el tipo de contenido de la respuesta HTTP en 'application/json'
    res.setHeader("Content-Type", "application/json");
    // Enviamos como respuesta HTTP un objeto JSON que contiene la propiedad 'estamosEn' con el valor 'Medellín JS'
    res.end(JSON.stringify({ estamosEn: "Argetnina" }));
  };
