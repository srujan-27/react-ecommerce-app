import Star from './Star'
import styles from './StarRating.module.css'

export default function StarRating(props) {
    function createStars() {
        return Array.from({ length: 5 }).map((_, index) => {
            const percentFilled = Math.min(100, Math.max(0, (props.rating - index) * 100))
            return (
                <Star key={index} percentFilled={percentFilled} />
            )
    
        })
    }

    return (
        <div className={styles.container}>
            { createStars() }
        </div>
    )


}