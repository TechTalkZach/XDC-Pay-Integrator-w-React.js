import React, { useState } from "react";
import { Web3ModalContext } from "../../context/Web3ModalContext";
import styles from "./styles.module.scss";

const Content: React.FC = () => {

  const {account, chainId, web3} = React.useContext(Web3ModalContext);

  const [currentChainId, setCurrentChainId] = useState("");
  const [walletStatus, setWalletStatus] = useState(false);
  const [myBalance, setMyBalance] = useState("");

  // function ellipseAddress(
  //   address: string = "",
  //   width: number = 4
  // ): string {
  //   return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
  // }

  const getBalance = async () => {
    if(web3 && account){
      const balance = await web3?.eth.getBalance(account);
      console.log(balance)
      // balance => transform from 18 decimal to readable format
      setMyBalance(web3?.utils.fromWei(balance, "ether"));
    } else {
      setMyBalance("");

    }
  }

  const getChainId = () => {
    if(chainId) {
      setCurrentChainId(String(chainId))
    } else {
      setCurrentChainId("");
    }
  }

  const getWalletStatus = () => {
    if(account && chainId) {
      setWalletStatus(true);
    } else {
      setWalletStatus(false);
    }
  }

  React.useEffect(() => {
    getChainId();
    getWalletStatus();
    getBalance()
  }, [account, chainId, web3]);


  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.interface}>
          <div className={styles.columns} style={{ height: "300px" }}>
              <div className={styles.form}>
                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Address:</label>
                  </div>
                  <input
                    type="text"
                    value={account ? (account) : ("") }
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>Connected to:</label>
                  </div>
                  <input
                    type="text"
                    value={currentChainId}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Balance:</label>
                  </div>
                  <input
                    type="text"
                    value={myBalance}
                  />
                </div>

                <div className={styles.walletStatus}>
                      <div
                        className={styles.ball}
                        style={
                          walletStatus
                            ? { backgroundColor: "lime" }
                            : { backgroundColor: "red" }
                        }
                      />
                      Wallet {walletStatus ? "Connected" : "Disconnected"}
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </section>
  );
};

export default Content;
