import './cart-dropdown.styles.scss'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
            {
                cartItems.length ? (cartItems.map((item) => {
                                        return <CartItem key={item.id} cartItem={item} />
                                    }))
                : (<span>Your cart is empty</span>)
            }
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;