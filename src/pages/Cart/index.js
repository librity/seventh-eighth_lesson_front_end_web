import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { formatPricePtBr } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  const total = useSelector(state =>
    formatPricePtBr(
      state.cart.reduce((totalCost, product) => {
        return totalCost + product.price * product.amount;
      }, 0)
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      formattedSubtotal: formatPricePtBr(product.price * product.amount),
    }))
  );

  const dispatch = useDispatch();

  const decrement = product => {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  };

  const increment = product => {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  };

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.formattedPrice}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.formattedSubtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(CartActions.removeFromCart(product.id))
                  }
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
