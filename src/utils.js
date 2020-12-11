import { surveyTree } from './surveyTree';

export function getNextStep(step, formData) {
  if (!step) {
    return [
      {
        name: 'end',
      },
    ];
  }

  const { name, options } = step;
  const value = formData[name];
  const selectedOption = options.find((option) => option.value === value);

  if (!selectedOption) {
    return [step];
  }

  const nextSteps = getNextStep(selectedOption.next, formData);
  return [step, ...nextSteps];
}

export function getSteps(formData) {
  const steps = getNextStep(surveyTree, formData);
  return steps;
}

export function getInitialFormData() {
  // return {}; // remove in actual use.
  const jsonData = localStorage.getItem('surveyData') || '{}';
  const formData = JSON.parse(jsonData);
  return formData;
}

export function saveFormData(formData) {
  const jsonData = JSON.stringify(formData);

  console.log('save in LocalStorage', jsonData);
  localStorage.setItem('surveyData', jsonData);
}

export function saveSurveyResult(steps, formData) {
  const actualSteps = steps.filter((step) => step.name !== 'end');
  const journeyValues = {};
  actualSteps.forEach((step) => {
    const { name } = step;
    const value = formData[name];

    if (value) {
      journeyValues[name] = value;
    }
  });
  // make API call to server.
  console.log('save in API server', journeyValues);
}
