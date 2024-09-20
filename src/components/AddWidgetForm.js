// src/components/AddWidgetForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../redux/dashboardSlice';

const AddWidgetForm = ({ categoryId }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const widget = { id: Date.now(), name: widgetName, showit: true, text: widgetText };
    dispatch(addWidget({ categoryId, widget }));
    setWidgetName('');
    setWidgetText('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-widget-form">
      <input
        type="text"
        placeholder="Widget Name"
        value={widgetName}
        onChange={e => setWidgetName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Widget Text"
        value={widgetText}
        onChange={e => setWidgetText(e.target.value)}
      />
      <button type="submit">Add Widget</button>
    </form>
  );
};

export default AddWidgetForm;
