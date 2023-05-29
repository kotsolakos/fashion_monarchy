import './directory-item.styles.scss'
import { Link } from 'react-router-dom';

const DirectoryItem = (props) => {
    const { category } = props;
    return(
        <Link className = "directory-item-container" key={category.id} to={category.route}>
            <div className= "background-image" style={{backgroundImage: `url(${category.imageUrl})`}}/>
            <div className= "directory-item-body-container">
                <h2>{category.title}</h2>
                <p>Shop Now</p>
            </div>
        </Link>
    );
};

export default DirectoryItem;