import React, { useEffect, useState } from 'react'
import { Provider ,useSelector, useDispatch, connect } from "react-redux";
import axios from 'axios'
import { createStore, combineReducers } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import './App.css';


// ACTIONS
const Actions = {
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
}

const setProducts = (products) => {
  return {
    type: Actions.SET_PRODUCTS,
    payload: products,
  }
}

const addToCart = (productID) => {
  return{
    type: Actions.ADD_TO_CART,
    payload: {
      id: productID,
    },
  };
};

const removeFromCart = (productID) => {
  return{
    type: Actions.REMOVE_FROM_CART,
    payload: {
      id: productID,
    },
  };
};


//REDUX REDUCERS
const INTIAL_STATE = {
  products: [],
  cartItems: [],
}

const shopReducer = (state = INTIAL_STATE, action ) => {
  switch (action.type) {
    case Actions.SET_PRODUCTS:
      return {
        ...state, 
        products: action.payload,
      }
    case Actions.ADD_TO_CART:
      //GET THE PRODUCTS DATA FROM THE ARRAY
      const item = state.products.find((product) => product.id === action.payload.id)
      //CHECK IF PRODUCT IS IN THE CART ALREADY
      const inCart = state.cartItems.find((item) => item.id === action.payload.id ? true : false)
      return {
        ...state,
        cartItems: inCart ? state.cartItems.map(item => item.id === action.payload.id ? {...item, qty: item.qty + 1} : item)
        : [...state.cartItems, {...item, qty: 1 }],
      };
    case Actions.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
}


const reducers = combineReducers({
  allProducts: shopReducer, 
})


//REDUX STORE
const store = createStore(reducers, composeWithDevTools());


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ShoppingCart />
        <ProductFeed />
      </Provider>
      
  </div>
  );
}


//FEED FOR PRODUCTS
const ProductFeed = () => {

  const products = useSelector((state) => state.allProducts.products)
  const dispatch = useDispatch()

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Error", err)
      })
    dispatch(setProducts(response.data))
  }

  useEffect(() => {
    fetchProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(products)

  return(
    <div className='Page'>
      <h1 className='FeedHeadline'>Tanelin Tilipehööri</h1>
      <div className='Feed'>
          <ProductItem />
        </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  }
}

//PRODUCT SINGLE ITEM
function ProductItem(props) {
  const products = useSelector((state) => state.allProducts.products)
  const dispatch = useDispatch()

  const addToCart = (id) => {
    dispatch({
      type: Actions.ADD_TO_CART,
      payload: {
        id: id,
      },
    });
  };


  const renderList = products.map((product) => {
    const { id, title, image, price, category } = product

    return (
      <div className='four column wide' key={id}>
        <div className='ui link cards'>
          <div className='card'>
            <button onClick={() => addToCart(id)} className='Add-Button' >
              +
            </button>
            <div className='image'>
              <img src={image} alt={title}/>
            </div>
            <div className='content'>
              <div className='header'>{title}</div>
              <div className='meta price'>{price} €</div>
              <div className='meta'>{category}</div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return <>{renderList}</>
}


//SHOPPING CART LIST
const ShoppingCart = () => {
  const items = useSelector((state) => state.allProducts.cartItems)
  console.log(items)

  return (
    <div className='Shopping-Cart'>
      <h2 className='Cart-Header'>Shopping Cart</h2>
        <CartItem  />
      <div className='Cart-Counter'></div>
    </div>
  )
}

function CartItem(props) {
  const items = useSelector((state) => state.allProducts.cartItems)
  const dispatch = useDispatch()

  const removeFromCart = (id) => {
    dispatch({
      type: Actions.REMOVE_FROM_CART,
      payload: {
        id: id,
      },
    });
  };

  const renderList = items.map((item) => {
    const { id, title, price, } = item
    return (
      <div className='Cart-Item' key={id}>
        <div className='item-details'>
          <div className='item-name'>{title}</div>
          <div className='item-price'>{price}</div>
        </div>
        <button onClick={() => removeFromCart(id)} className='remove-button' >
          x
        </button>
      </div>
    )
  })
  return <>{renderList}</>
}

const mapStateToProps = state => {
  return {
    cartItems: state.allProducts.cartItems,
  }
}

export default App;