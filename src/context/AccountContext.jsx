import React, { createContext, useState, useContext } from 'react';

const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  const [accountData, setAccountData] = useState({ personal: {}, address: {} });

  const updatePersonalData = (data) => {
    setAccountData((prevState) => ({
      ...prevState,
      personal: { ...prevState.personal, ...data },
    }));
  };

  const updateAddressData = (data) => {
    setAccountData((prevState) => ({
      ...prevState,
      address: { ...prevState.address, ...data },
    }));
  };

  return (
    <AccountContext.Provider value={{ accountData, updatePersonalData, updateAddressData }}>
      {children}
    </AccountContext.Provider>
  );
};
