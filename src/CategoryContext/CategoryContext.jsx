import React, { createContext, useState } from "react";

export const categoryContext = createContext();
export default function CategoryContextProvider({ children }) {
  const [selectedCategory, setselectedCategory] = useState(null);
  function handleChosenCategoryId(id) {
    setselectedCategory(id);
  }

  return (
    <categoryContext.Provider
      value={{ selectedCategory, setselectedCategory, handleChosenCategoryId }}
    >
      {children}
    </categoryContext.Provider>
  );
}
