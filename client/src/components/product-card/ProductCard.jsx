import StarRating from '../star-rating/StarRating.jsx';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import axios from 'axios';

export default function ProductCard(props) {
  const navigate = useNavigate();

  

  const handleAddToCart = async () => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/cart",
        { productId: props.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      // Ignore all errors silently
    }
  };

  return (
    <div className={styles['product-container']}>
      <div className={styles['product-image-container']}>
        <Link to={`/product/${props.id}`}>
          <img className={styles['product-image']} src={props.imageUrl} alt={props.name} />
        </Link>
      </div>
      <Link className={styles['product-link']} to={`/product/${props.id}`}>
        <h2 className={styles['product-title']}>{props.name}</h2>
      </Link>
      <StarRating rating={props.ratingAverage} />
      <p>{`$${props.price.toFixed(2)}`}</p>

      {props.showAddToCart && (
        <button className={styles['cart-button']} onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
}
