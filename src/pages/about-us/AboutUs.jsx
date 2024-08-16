import './about-us.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>Quiénes Somos</h1>
        <p className="text-acercade">
          Nuestra historia comienza en 2022, con la inauguración de nuestra primera tienda física.
        </p>
        <p className="text-acercade">
          Somos una compañía que comercializa una gran variedad de productos de la marca de primera línea NIKE para toda la familia.
        </p>
        <p className="text-acercade">
          Buscamos atraer y fidelizar a nuestros clientes a través de una oferta de valor diferencial, basada en la combinación de los mejores productos de las principales marcas del mundo deportivo, tiendas modernas con layout de vanguardia y vendedores capacitados.
        </p>
        <p className="text-acercade">
          Nuestra misión es la de “Vestir a la gente con espíritu libre.“
        </p>
        <p className="text-acercade">
          Nuestra visión es “Ser la cadena deportiva líder y preferida por la calidad de sus ofertas así como por su cobertura geográfica en la Argentina.”
        </p>
        <p className="text-acercade">
          Nuestros principales valores como compañía son la “honestidad, austeridad y excelencia.“
        </p>
      </div>

      <div className="avatar-container">
        <h1>Información del estudiante</h1>
        <p className="text-acercade">
          Esta web fue creada por Nicolas Juarez, nacido el 24/12/1997 en Ciudad Autónoma de Buenos Aires, Argentina.
        </p>
        <div className="avatar-image-container">
          <img className="avatar-image" src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png" alt="Avatar" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
