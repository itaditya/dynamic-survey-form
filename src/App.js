import React, { useEffect, useState } from 'react';
import cx from 'clsx';

import {
  getSteps,
  getInitialFormData,
  saveFormData,
  saveSurveyResult,
} from './utils';

import './styles.css'; // stylistic CSS
import './survey.css'; // important CSS

function Step({ step, selectedValue, onChange }) {
  const idLegend = `legend-label-${step.name}`;

  function scrollToStep() {
    const nodeLegend = document.getElementById(idLegend);
    nodeLegend.scrollIntoView();
  }

  useEffect(() => {
    let timeoutId;
    if (!selectedValue) {
      timeoutId = setTimeout(scrollToStep, 250);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div role="group" className="step-fieldset" aria-labelledby={idLegend}>
      <h2
        id={idLegend}
        className="step-legend"
        onFocus={scrollToStep}
        tabIndex={0}
      >
        {step.title}
      </h2>
      <div className="step-options">
        {step.options.map((option) => {
          const isChecked = selectedValue === option.value;
          return (
            <label
              key={option.value}
              className={cx('step-label', { checked: isChecked })}
            >
              <input
                type="radio"
                className="step-input"
                name={step.name}
                checked={isChecked}
                value={option.value}
                onChange={onChange}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [stateFormData, setFormData] = useState(getInitialFormData);

  const steps = getSteps(stateFormData);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((oldState) => {
      return {
        ...oldState,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    saveSurveyResult(steps, stateFormData);
  }

  useEffect(() => {
    saveFormData(stateFormData);
  }, [stateFormData]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Fill this survey please</h1>
      </header>
      <form noValidate onSubmit={handleSubmit}>
        {steps.map((step) => {
          const { name } = step;

          if (name === 'end') {
            return (
              <button className="submit-cta" type="submit">
                Finish Survey
              </button>
            );
          }

          return (
            <Step
              key={name}
              selectedValue={stateFormData[name]}
              step={step}
              onChange={handleChange}
            />
          );
        })}
      </form>
    </div>
  );
}
