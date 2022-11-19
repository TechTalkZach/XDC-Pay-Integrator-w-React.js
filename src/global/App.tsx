import React from "react";
import Web3 from "web3";
import Content from "../components/Content";
import Header from "../components/Header";
import styles from "./styles.module.scss";
import Web3ModalProvider from "../context/Web3ModalContext";

const App: React.FC = () => {
  return (
      <div className={styles.app}>
        <Web3ModalProvider>
          <Header />
          <Content />
        </Web3ModalProvider>
      </div>
  );
};

export default App;
