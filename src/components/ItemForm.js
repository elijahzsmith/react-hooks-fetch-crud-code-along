import React, { useState } from "react";
import { v4 as uuid } from 'uuid'

function ItemForm({ items, setItems, onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const handleSubmit = (e) => {
    e.preventDefault()
    const newItem = {
      //id: uuid(),
      name: name,
      category: category,
      isInCart: false
    }
    console.log(newItem)
    fetch(`http://localhost:4000/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Accept: 'application/json',
      },
      body: JSON.stringify(newItem)
    })
    .then(res => res.json())
    .then(newItem => onAddItem(newItem))
  }
  
  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
