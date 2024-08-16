import './ContactPage.css';


const ContactPage = () => {
  return (
    
    <main className="main-containers">
      <section className="main-contact">
        <div className="contact-form-wrapper">
          <form className="form-containers">
            <h2>FORMULARIO DE CONTACTO</h2>
            <div className="input-groups">
              <label htmlFor="fullname">Nombre Completo</label>
              <input
                type="text"
                name="fullname"
                placeholder="Juan Perez"
                required
                minLength="5"
                maxLength="150"
              />
            </div>

            <div className="input-groups">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Juan Perez"
                required
                minLength="5"
                maxLength="150"
                pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
              />
            </div>

            <div className="input-groups">
              <label htmlFor="message">Mensaje</label>
              <textarea
                name="message"
                id="message"
                placeholder="Ingrese su mensaje aqui"
                required
                minLength="20"
                maxLength="500"
              >
              </textarea>
            </div>

            <button type="submit" className="form-buttons">Enviar</button>
          </form>
        </div>
        <section className="contact-map-wrapper">
          <h2>Donde nos encontramos</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13131.220169490873!2d-58.40421745000006!3d-34.634366699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb0be5d34efd%3A0x982a059b4db56241!2sHospitales!5e0!3m2!1ses-419!2sar!4v1706054870848!5m2!1ses-419!2sar"
            width="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </main>
  );
}

export default ContactPage;
