import Modal from "../UI/Modal";
import style from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import React, { useContext } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useState } from "react/cjs/react.development";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmtting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrgerHandler = async (userData) => {
    setIsSubmtting(true);
    await fetch(
      "https://reactjs-learning-cdb2d-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );
    setIsSubmtting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((item, index) => (
        <CartItem
          key={index}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrgerHandler}
          onCancel={props.onHideCartHandler}
        />
      )}
      {!isCheckout && (
        <div className={style.actions}>
          <button
            className={style["button--alt"]}
            onClick={props.onHideCartHandler}
          >
            Close
          </button>
          {hasItems && (
            <button className={style.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const isSubmittingMoalContent = <p>Sending order data....</p>;
  const didSubmitMoalContent = <p>Sucessfully sent the order!</p>;
  return (
    <Modal onHideCartHandler={props.onHideCartHandler}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingMoalContent}
      {didSubmit && didSubmitMoalContent}
    </Modal>
  );
};

export default Cart;
