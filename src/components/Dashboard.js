import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Widget from "./Widget";
import AddWidgetModal from "./WidgetModal.js";
import './Dashboard.css';


const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoriesFromStore = useSelector((state) => state.dashboard.categories);
  const [categories, setCategories] = useState(categoriesFromStore);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // Update categories state when Redux store changes
  useEffect(() => {
    setCategories(categoriesFromStore);
  }, [categoriesFromStore]);

  // Filter widgets whenever categories or searchTerm changes
  useEffect(() => {
    const filtered = categories.map((category) => ({
      ...category,
      widgets: category.widgets.filter((widget) => {
        return (
          widget.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          widget.showit === true
        );
      }),
    }));
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  // Handle opening and closing modal
  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Render only categories with matching widgets */}
      {filteredCategories
        .filter((category) => category.widgets.length > 0) // Only render categories that have widgets
        .map((category) => (
          <div key={category.id} className="category">
            <h2>{category.name}</h2>
            <div className="widgets">
              {category.widgets.map((widget) => (
                <Widget
                  key={widget.id}
                  widget={widget}
                  categoryId={category.id}
                />
              ))}
              <button className="widget" onClick={handleClick}>Add Widget</button>
            </div>

            <AddWidgetModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              categories={categories}
              setCategories={setCategories}
            />
          </div>
        ))}

      {/* Show a message if no widgets match the search */}
      {filteredCategories.every((category) => category.widgets.length === 0) && (
        <p>No widgets match your search.</p>
      )}
    </div>
  );
};

export default Dashboard;
