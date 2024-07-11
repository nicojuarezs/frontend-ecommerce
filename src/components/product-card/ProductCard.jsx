import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar as faStarSolid, faPlus, faChevronRight, faMinus, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import "./ProductCard.css";
import { removeDecimals } from "../../services/utils/formatNumber";
import { useOrder } from "../../context/OrderContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
const { addOrderItem } = useOrder();

    return (
        <div className="card-container">
            <div className="card-wrapper">
                <article className="card">
                    <div className="card-header">
                        <img 
                            className="card-img card-img-1"
                            src={product.image} alt={product.name}
                        />
                        <img 
                            className="card-img card-img-2" 
                            src={product.image} alt={product.name}
                        />
                        <div className="actions">
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                    </div>

                    <div className="card-main">
                        <div className="card-category">{product.category}</div>
                        <h3 className="card-title">{product.name}</h3>

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
                                <small>$</small> { removeDecimals(product.price * 0.9) }
                            </span>
                            <span className="normal-price">
                                <small>$</small> { removeDecimals(product.price) }
                            </span>
                            <br />
                            <a className="link-style" href={`/pages/product-detail.html?id=${product?.id}`}>Ver más..</a>
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="card-selection">
                            <div className="Color">
                                <label className="selection-label" htmlFor="Color">Color</label>
                                <select name="Color" id="Color">
                                    <option value="pro">{product?.color1 || "Negro"}</option>
                                    <option value="digital">{product?.color2 || "Blanco"}</option>
                                </select>
                                
                            </div>
                            <div className="quantity">
                                <p className="selection-label">Cantidad</p>
                                <div className="quantity-actions">
                                    <button className="button-mm">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <div> 1 </div>
                                    <button className="button-mm">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>

                                <div>
                                <Link className="btn-icon" to={`/product-detail/${product.id}`}>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} title="Ver detalle" />
                        </Link>
                                </div>
                            </div>
                        </div>
                        <br />

                        <p className="selection-ingreso"><strong>Fecha de ingresado: {product?.dateAdded || "04/03/2024"}</strong></p>
                        <button onClick={() => addOrderItem(product) } className="add-to-cart">
                            Comprar
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>

                    </div>
                </article>
            </div>
        </div>
    );
}
