import styles from './ListProduct.module.scss'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom'
import { FaRegHeart, FaExpand } from "react-icons/fa";
import { formatter } from '../../../utils/utils'

function ListProduct({ currentItems }) {
    return (
        <Row>
            {currentItems.map((product) => {
                return (
                    <Col lg={4} md={4} sm={6} xs={12} key={product._id}>
                        <div className={styles.productWrapper}>
                            <div className={styles.thumb}>
                                <Link to={`/shop/${product._id}`} className={styles.image}>
                                    <img src={product.img} alt={product.name} />
                                    {/* <img src="" alt="" /> */}
                                </Link>
                                <span className={styles.badges}>
                                    {product.percent_sale !== 0 ? <span className={product.percent_sale !== "" ? styles.sale : ""}>
                                        {product.percent_sale + "% OFF"}</span>
                                        : ''}
                                </span>
                                <div className={styles.actions}>
                                    <a href="" className={`${styles.wishList} ${styles.action}`} title="Wishlist">
                                        <FaRegHeart />
                                    </a>
                                    <a href="" className={`${styles.quickView} ${styles.action}`} title="Quickview">
                                        <FaExpand />
                                    </a>
                                </div>
                                <Link to={`/shop/${product._id}`}><button className={`${styles.addToCart}`}>Add to cart</button></Link>

                            </div>
                            <div className={styles.content}>
                                <h5 className={styles.title}>
                                    <a href="">{product.name}</a>
                                </h5>
                                <span className={styles.price}>
                                    {product.percent_sale !== "" ? formatter.format(product.price * ((100 - product.percent_sale) / 100)) : formatter.format(product.price)}
                                </span>
                            </div>
                        </div>
                    </Col>

                )
            })}
        </Row>)
}
export default ListProduct