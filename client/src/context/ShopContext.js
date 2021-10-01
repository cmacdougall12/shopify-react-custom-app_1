import React, { Component } from "react";
import shopifyClient from "shopify-buy";

const ShopContext = React.createContext();

const client = shopifyClient.buildClient({
  storefrontAccessToken: "dd4d4dc146542ba7763305d71d1b3d38",
  domain: "graphql.myshopify.com",
});

class ShopProvider extends Component {
  state = {
    products: [],
    product: {},
    checkout: {},
    isCartOpen: false,
  };

  componentDidMount() {
    // check local storage for previous cart
    //no checkout? then create a new checkout
    // else fetch the checkout from shopify
    if (localStorage.checkout) {
      this.fetchCheckout(localStorage.checkout);
    } else {
      this.createCheckout();
    }
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout", checkout.id);
    this.setState({ checkout });
  };

  fetchCheckout = async (checkoutID) => {
    client.checkout
      .fetch(checkoutID)
      .then((checkout) => {
        this.setState({ checkout });
      })
      .catch((err) => console.log(err));
  };

  addItemsToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this.setState({ checkout });
  };

  removeItem = async (lineItemIdsToRemove) => {
    const checkout = client.checkout
      .removeLineItems(this.state.checkout.id, [lineItemIdsToRemove])
      .then((checkout) => this.setState({ checkout }));
  };

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  };

  fetchProductWithId = async (id) => {
    const product = await client.product.fetch(id);
    this.setState({ product: product });
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };

  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithId: this.fetchProductWithId,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addItemsToCheckout: this.addItemsToCheckout,
          removeItem: this.removeItem,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
