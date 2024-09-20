import React, { useEffect, useState } from "react";
import AddWidgetForm from "./AddWidgetForm";
import { useSelector } from "react-redux";

const WidgetModal = ({ isOpen, onClose, categories, setCategories }) => {
  const kcategories = useSelector((state) => state.dashboard.categories);
  const [activeCategory, setActiveCategory] = useState(categories[0]); // Default to the first category

  // Sync categories with the Redux store and reset active category if needed
  useEffect(() => {
    setCategories(kcategories);

    // If the active category is no longer present, reset it to the first available category
    const updatedActiveCategory = kcategories.find(
      (category) => category.id === activeCategory?.id
    ) || kcategories[0]; // Default to the first category if not found

    setActiveCategory(updatedActiveCategory);
  }, [kcategories, activeCategory?.id, setCategories]);

  if (!isOpen) return null;

  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Update the active category when clicked
  };

  const handleCheckBoxChange = (widgetId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === activeCategory.id) {
        // For the active category, update the widget
        const updatedWidgets = category.widgets.map((widget) => {
          if (widget.id === widgetId) {
            return {
              ...widget,
              showit: !widget.showit, // Toggle the showit property
            };
          }
          return widget;
        });
        return {
          ...category,
          widgets: updatedWidgets, // Update widgets of the active category
        };
      }
      return category; // No change to other categories
    });

    // Update the categories state
    setCategories(updatedCategories);

    // Update the active category
    const updatedActiveCategory = updatedCategories.find(
      (category) => category.id === activeCategory.id
    );
    setActiveCategory(updatedActiveCategory);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Widget</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>

        {/* Tabs for categories */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${
                activeCategory.id === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Widget list for the active category */}
        <div className="widget-list">
          {activeCategory.widgets.map((widget) => (
            <div key={widget.id} className="widget-item">
              <input
                type="checkbox"
                onChange={() => handleCheckBoxChange(widget.id)}
                checked={widget.showit || false}
              />
              <span>{widget.name}</span>
            </div>
          ))}
          <AddWidgetForm categoryId={activeCategory.id} />
          <button className="ok-btn" onClick={onClose}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default WidgetModal;
