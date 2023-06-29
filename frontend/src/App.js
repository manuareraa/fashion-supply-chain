import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import Loading from "./components/Loading";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import contractabi from "./smart-contract/contractabi";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import SellerHistory from "./pages/SellerHistory";
import BuyerHistory from "./pages/BuyerHistory";
import SupplyChain from "./pages/SupplyChain";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    loading: false,
    message: "",
  });
  const [appState, setAppState] = useState({
    loggedIn: false,
    web3: null,
    account: "",
    chainId: "",
    maticBalance: "",
    username: "",
    role: "",
    productCount: 0,
    products: [],
    transactions: [],
    contractAddress: "0x1Ebf1d55F475Ef6F44c8Dce302c04b5075dB1E5f",
    backendServer: "http://localhost:4000",
  });
  const [loggedInParty, setLoggedInParty] = useState({});

  const setUpWeb3 = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoading({
          loading: true,
          message: "Connecting to Metamask...",
        });
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        setAppState((prevState) => {
          return { ...prevState, web3: web3 };
        });
        console.log("<< Web3 Object Received  >>");

        window.ethereum
          .request({ method: "net_version" })
          .then(async (chainId) => {
            if (chainId !== "80001") {
              try {
                await window.ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: "0x13881" }],
                });
                console.log("Polygon Mumbai Chain found.");
              } catch (switchError) {
                console.log("Error connecting to Polygon Mumbai Chain (1)");
              }
            }
          });

        const accounts = await web3.eth.getAccounts();
        console.log("<< Account Received  >>", accounts[0]);

        setAppState((prevState) => {
          return {
            ...prevState,
            account: accounts[0],
          };
        });
        setLoading({
          loading: false,
          message: "Connecting to Metamask...",
        });
      } catch (error) {
        console.error(error);
        console.log("Error getting web3 object. Install Metamask.");
        setLoading({
          loading: false,
          message: "Connecting to Metamask...",
        });
      }
    } else {
      console.log("Please install MetaMask to connect your wallet.");
    }
  };

  const walletLogout = async () => {
    console.log("<< Wallet Logout Called  >>");
    setAppState((prevState) => {
      return {
        ...prevState,
        loggedIn: false,
        username: "",
        account: "",
      };
    });
    navigate("/");
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return date.toLocaleDateString("en-US", options);
  };

  const regsisterUser = (role) => {
    setLoading({
      loading: true,
      message: "Registering User...",
    });

    // call smart contract
    const contract = new appState.web3.eth.Contract(
      JSON.parse(contractabi),
      appState.contractAddress
    );

    if (role === "buyer") {
      contract.methods
        .registerBuyer(appState.account)
        .send({ from: appState.account })
        .then((receipt) => {
          console.log("<< Buyer Registered  >>", receipt);
          setLoading({
            loading: false,
            message: "Registering User...",
          });
          toast.success("User Registered Successfully");
        })
        .catch((error) => {
          console.log("Error registering user.", error);
          setLoading({
            loading: false,
            message: "Registering User...",
          });
          toast.error("Error registering user.");
        });
    } else {
      contract.methods
        .registerSeller(appState.account)
        .send({ from: appState.account })
        .then((receipt) => {
          console.log("<< Seller Registered  >>", receipt);
          setLoading({
            loading: false,
            message: "Registering User...",
          });
          toast.success("User Registered Successfully");
        })
        .catch((error) => {
          console.log("Error registering user.", error);
          setLoading({
            loading: false,
            message: "Registering User...",
          });
          toast.error("Error registering user.");
        });
    }
  };

  const loginUser = (role) => {
    setLoading({
      loading: true,
      message: "Logging in User...",
    });

    // call smart contract
    const contract = new appState.web3.eth.Contract(
      JSON.parse(contractabi),
      appState.contractAddress
    );

    if (role === "buyer") {
      contract.methods
        .loginBuyer()
        .call({ from: appState.account })
        .then((receipt) => {
          console.log("<< Buyer Logged In  >>", receipt);
          if (receipt === true) {
            setAppState((prevState) => {
              return {
                ...prevState,
                loggedIn: true,
                role: "buyer",
              };
            });
            setLoading({
              loading: false,
              message: "Logging in User...",
            });
            toast.success("User Logged In Successfully");
            navigate("/buyer-dashboard");
            getAllProducts();
            getAllTransactions();
          } else {
            setLoading({
              loading: false,
              message: "Logging in User...",
            });
            toast.error("Error logging in user. Invalid credentials");
          }
        })
        .catch((error) => {
          console.log("Error logging in user.", error);
          setLoading({
            loading: false,
            message: "Logging in User...",
          });
          toast.error("Error logging in user. Invalid credentials");
        });
    } else {
      contract.methods
        .loginSeller()
        .call({ from: appState.account })
        .then((receipt) => {
          console.log("<< Seller Logged In  >>", receipt);
          if (receipt === true) {
            setAppState((prevState) => {
              return {
                ...prevState,
                loggedIn: true,
                role: "seller",
              };
            });
            setLoading({
              loading: false,
              message: "Logging in User...",
            });
            toast.success("User Logged In Successfully");
            navigate("/seller-dashboard");
          } else {
            setLoading({
              loading: false,
              message: "Logging in User...",
            });
            toast.error("Error logging in user. Invalid credentials");
          }
        })
        .catch((error) => {
          console.log("Error logging in user.", error);
          setLoading({
            loading: false,
            message: "Logging in User...",
          });
          toast.error("Error logging in user. Invalid credentials");
        });
    }
  };

  const getProductCount = async () => {
    const response = await axios.get(
      `${appState.backendServer}/get-product-count`
    );
    console.log("<< Product Count  >>", response.data.count);
    setAppState((prevState) => {
      return {
        ...prevState,
        productCount: response.data.count,
      };
    });
    return response.data.count;
  };

  const addProduct = async (name, price, description, image) => {
    console.log("<< Add Product Called  >>", name, price, description, image);
    setLoading({
      loading: true,
      message: "Adding Product...",
    });

    try {
      const productId = await getProductCount();

      const formData = new FormData(); // Create a new FormData object

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image); // Append the image file with filename
      formData.append("productId", parseInt(productId) + 1);
      formData.append("seller", appState.account);

      axios
        .post(`${appState.backendServer}/add-product`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the Content-Type header
          },
        })
        .then(() => {
          toast.success("Product added successfully");
          setLoading({
            loading: false,
            message: "Adding Product...",
          });
          navigate("/seller-dashboard");
          getAllProducts();
        })
        .catch((error) => {
          console.error(error);
          setLoading({
            loading: false,
            message: "Adding Product...",
          });
          toast.error("Failed to add product");
        });
    } catch (error) {
      console.error(error);
      setLoading({
        loading: false,
        message: "Adding Product...",
      });
      toast.error("Failed to add product");
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      console.log("<< All Products  >>", response.data);
      setAppState((prevState) => {
        return {
          ...prevState,
          products: response.data,
        };
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const getAllTransactions = async () => {
    try {
      const response = await axios.get(
        `${appState.backendServer}/transactions`
      );
      console.log("<< All Transactions  >>", response.data);
      setAppState((prevState) => {
        return {
          ...prevState,
          transactions: response.data,
        };
      });
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const buyProduct = (sellerAddress, amount, id, name) => {
    setLoading({
      loading: true,
      message: "Buying Product...",
    });

    const contract = new appState.web3.eth.Contract(
      JSON.parse(contractabi),
      appState.contractAddress
    );

    contract.methods
      .paySeller(sellerAddress)
      .send({ from: appState.account, value: Web3.utils.toWei(amount) })
      .then((receipt) => {
        console.log("<< Product Bought  >>", receipt);
        setLoading({
          loading: false,
          message: "Buying Product...",
        });
        toast.success("Product bought successfully");
        let transactionObject = {
          buyer: appState.account,
          seller: sellerAddress,
          amount: amount,
          transactionHash: receipt.transactionHash,
          timestamp: new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          productId: id,
          productName: name,
        };

        console.log("<< Transaction Object  >>", transactionObject);

        axios
          .post(`${appState.backendServer}/add-transaction`, transactionObject)
          .then(() => {
            toast.success("Transaction added successfully");
            getAllProducts();
            getAllTransactions();
          })
          .catch((error) => {
            console.error(error);
            toast.error("Failed to add transaction");
          });
      })
      .catch((error) => {
        console.log("Error buying product.", error);
        setLoading({
          loading: false,
          message: "Buying Product...",
        });
        toast.error("Failed to buy product");
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <Toaster />
      <div className="h-screen">
        {loading.loading === true ? (
          <Loading loading={loading} setLoading={setLoading} />
        ) : null}

        <Header appState={appState} loggedInParty={loggedInParty} />
        <Navbar appState={appState} walletLogout={walletLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                appState={appState}
                setUpWeb3={setUpWeb3}
                walletLogout={walletLogout}
                regsisterUser={regsisterUser}
                loginUser={loginUser}
              />
            }
          />
          <Route
            path="/buyer-dashboard"
            element={
              <BuyerDashboard
                appState={appState}
                buyProduct={buyProduct}
                getAllProducts={getAllProducts}
                getAllTransactions={getAllTransactions}
              />
            }
          />
          <Route
            path="/seller-dashboard"
            element={
              <SellerDashboard
                appState={appState}
                getAllProducts={getAllProducts}
                getAllTransactions={getAllTransactions}
              />
            }
          />
          <Route
            path="/add-product"
            element={
              <AddProduct
                appState={appState}
                addProduct={addProduct}
                getAllProducts={getAllProducts}
                getAllTransactions={getAllTransactions}
              />
            }
          />
          <Route
            path="/seller-history"
            element={
              <SellerHistory
                appState={appState}
                addProduct={addProduct}
                getAllProducts={getAllProducts}
                getAllTransactions={getAllTransactions}
              />
            }
          />
          <Route
            path="/buyer-history"
            element={
              <BuyerHistory
                appState={appState}
                addProduct={addProduct}
                getAllProducts={getAllProducts}
                getAllTransactions={getAllTransactions}
              />
            }
          />
          <Route
            path="/supply-chain/:productName"
            element={
              <SupplyChain
                appState={appState}
                addProduct={addProduct}
                getAllProducts={getAllProducts}
                getAllTransactions={getAllTransactions}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
