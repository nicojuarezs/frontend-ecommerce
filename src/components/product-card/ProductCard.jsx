import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar as faStarSolid, faChevronRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import "./ProductCard.css";
import { formatPrice } from "../../services/utils/formatNumber";
import { useOrder } from "../../context/OrderContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const imagesURL = import.meta.env.VITE_IMAGES_URL;
    const { addOrderItem } = useOrder();

    if (!product) return null;

    // Función para convertir timestamp en milisegundos a fecha en formato DD/MM/YYYY
    const formatDate = (timestamp) => {
        if (!timestamp) return "Fecha desconocida";

        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0'); // Días del mes de 01 a 31
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses de 01 a 12
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const formattedDate = formatDate(product?.createdAt);

    return (
        <article className="card">
            <div className="card-header">
                <img 
                    className="card-img"
                    src={`${imagesURL}/${product?.image}`} alt={product?.name}
                />
                <div className="actions">
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>

            <div className="card-main">
                <div className="card-category">{product?.category?.name}</div>
                <h3 className="card-title">{product?.name}</h3>
                <div className="card-average">
                    <FontAwesomeIcon icon={faStarSolid} />
                    <FontAwesomeIcon icon={faStarSolid} />
                    <FontAwesomeIcon icon={faStarSolid} />
                    <FontAwesomeIcon icon={faStarRegular} />
                    <FontAwesomeIcon icon={faStarRegular} />
                    (3)
                </div>
                <div className="card-price">
                    <span className="product-discount-price">
                        <small>$</small> {formatPrice(product?.price * 0.9)}
                    </span>
                    <span className="normal-price">
                        <small>$</small> {formatPrice(product?.price)}
                    </span>
                </div>
                <p className="selection-ingreso"><strong>Fecha de ingresado: {formattedDate || "04/03/2024"}</strong></p>
            </div>

            <div className="card-footer">
                <button onClick={() => addOrderItem(product)} className="add-to-cart">
                    Comprar
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <Link className="view-more-icon" to={`/product-detail/${product?._id}`} title="Ver detalle">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>
            </div>
        </article>
    );
}
