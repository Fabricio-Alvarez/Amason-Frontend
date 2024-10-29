import api from '../../../services/api';

const cart = {
  namespaced: true,
  state: {
    cart: [],
    totalAmount: 0,
  },
  mutations: {
    setCart(state, products) {
      state.cart = products;
    },
    setTotalAmount(state, totalAmount) {
      state.totalAmount = totalAmount;
    },
    removeProduct(state, index) {
      state.cart.splice(index, 1);
    },
    updateProductQuantity(state, { index, quantity }) {
      state.cart[index].quantity = quantity;
    },
    clearCart(state) {
      state.cart = [];
      state.totalAmount = 0;
    },
  },
  actions: {
    async fetchCartItems({ commit }) {
      try {
        const response = await api.get('/cart', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 200) {
          const cartProducts = response.data.cart_products;
          commit('setCart', cartProducts);

          // Calcular totalAmount
          const totalAmount = cartProducts.reduce((total, product) => {
            return total + (product.product_price * product.quantity);
          }, 0);
          commit('setTotalAmount', totalAmount);
        } else {
          console.error('Error response from server:', response);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },

    async removeProductFromCart({ commit, state }, productId) {
      try {
        const productIndex = state.cart.findIndex(
          product => product.product_id === productId
        );

        if (productIndex === -1) {
          throw new Error('Product not found in cart');
        }

        const response = await api.post(
          '/cart/remove-product',
          {
            idproducttoremove: productId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.status === 200) {
          commit('removeProduct', productIndex);

          // Recalcular el totalAmount
          const newTotalAmount = state.cart.reduce((total, product) => {
            return total + (product.product_price * product.quantity);
          }, 0);
          commit('setTotalAmount', newTotalAmount);
        } else {
          console.error('Error response from server:', response);
        }
      } catch (error) {
        console.error('Error removing product from cart:', error);
      }
    },

    async updateProductQuantity({ commit, state }, { productId, quantity, action }) {
      try {
        // Actualiza localmente la cantidad antes de hacer la llamada a la API
        const productIndex = state.cart.findIndex(
          product => product.product_id === productId
        );
    
        if (productIndex === -1) {
          throw new Error('Product not found in cart');
        }
    
        // Actualiza la cantidad en el estado local
        commit('updateProductQuantity', { index: productIndex, quantity });
    
        // Recalcular el totalAmount localmente
        const newTotalAmount = state.cart.reduce((total, product) => {
          return total + (product.product_price * product.quantity);
        }, 0);
        commit('setTotalAmount', newTotalAmount);
    
        // Ahora realiza la llamada a la API
        const response = await api.post(
          '/cart/update-units',
          {
            idproducttoupdate: productId,
            quantity,
            action,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
    
        if (response.status !== 200) {
          console.error('Error response from server:', response);
          // Si la respuesta no es exitosa, revertimos el cambio
          // (opcional, solo si deseas manejar revertir en caso de error)
          const previousQuantity = state.cart[productIndex].quantity; // Guarda la cantidad anterior
          commit('updateProductQuantity', { index: productIndex, quantity: previousQuantity });
        }
    
      } catch (error) {
        console.error('Error updating product quantity:', error);
        // Aquí también puedes considerar revertir el cambio, si es necesario
      }
    },    

    async removeAllProductsFromCart({ commit }) {
      try {
        const response = await api.post(
          '/cart/removeall',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.status === 200) {
          commit('clearCart');
        } else {
          console.error('Error response from server:', response);
        }
      } catch (error) {
        console.error('Error removing all products from cart:', error);
      }
    },
  },

  getters: {
    cartItems: state => state.cart,
    totalAmount: state => state.totalAmount,
    formattedTotalAmount: state => {
      return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC',
      }).format(state.totalAmount);
    },
  },
};

export default cart;