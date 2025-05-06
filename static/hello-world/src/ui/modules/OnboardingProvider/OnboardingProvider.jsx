// OnboardingProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import Joyride from 'react-joyride';
import { invoke } from '@forge/bridge';

export const ONBOARDING_STEPS = [
  { target: '[data-tour="add-goal"]',   content: 'Let’s start by adding a new goal.',    disableBeacon: true, event: 'none' },
  { target: '[data-tour="add-metric"]', content: 'Now add a metric to track this goal.', disableBeacon: true, event: 'none' },
  { target: '[data-tour="edit-metric"]', content: 'Great! Try editing the metric you added.', disableBeacon: true, event: 'none' },
  { target: '[data-tour="feedback-button"]', content: 'You can request a feature or report a bug here.', disableBeacon: true, event: 'none' },
  { target: '[data-tour="status-badge"]',   content: 'This badge shows our current progress status.', disableBeacon: true },
];

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [run, setRun]               = useState(false);
  const [stepIndex, setStepIndex]   = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  // 1) Load saved progress, compute firstIncomplete (or mark done by pushing index out of bounds)
  useEffect(() => {
    (async () => {
      const state = (await invoke('get-onboarding-state')) || { completedSteps: [] };
      setCompletedSteps(state.completedSteps);
      const firstIncomplete = ONBOARDING_STEPS.findIndex((_, i) => !state.completedSteps.includes(i));
      setStepIndex(firstIncomplete === -1 ? ONBOARDING_STEPS.length : firstIncomplete);
    })();
  }, []);

  // 2) Watch for valid stepIndex → bail if done, otherwise wait for target and then run
  useEffect(() => {
    if (stepIndex >= ONBOARDING_STEPS.length) {
      console.log('🎉 Onboarding fully complete—no more steps');
      setRun(false);
      return;
    }
    const selector = ONBOARDING_STEPS[stepIndex].target;
    const checkTarget = () => {
      console.log('Checking for', selector);
      if (document.querySelector(selector)) {
        setRun(true);
      } else {
        setTimeout(checkTarget, 400);
      }
    };
    checkTarget();
  }, [stepIndex]);

  const pauseOnboarding = () => {
    console.log('⏸️ Pausing onboarding for step', stepIndex);
    setRun(false);
  };

  // 3) Called by your button/modal when the user actually finishes the action
  const completeStepManually = async () => {
    const idx = stepIndex;
    console.log('Completing step', idx);
    const newDone = [...completedSteps, idx];
    setCompletedSteps(newDone);
    await invoke('set-onboarding-state', { completedSteps: newDone });

    const next = idx + 1;
    if (next >= ONBOARDING_STEPS.length) {
      console.log('🎉 Reached final step—stopping tour');
      setStepIndex(ONBOARDING_STEPS.length);
      setRun(false);
    } else {
      setStepIndex(next);
    }
  };

  // 4) Joyride callback only needs to pause after the user clicks “Next” in tooltip
  const handleJoyrideCallback = ({ type, status }) => {
    if (type === 'step:after') setRun(false);
    if (status === 'finished' || status === 'skipped') {
      // mark everything done
      invoke('set-onboarding-state', { completedSteps: ONBOARDING_STEPS.map((_, i) => i) });
      setStepIndex(ONBOARDING_STEPS.length);
    }
  };

  return (
    <OnboardingContext.Provider value={{ pauseOnboarding, completeStepManually }}>
      <Joyride
        steps={ONBOARDING_STEPS}
        run={run}
        stepIndex={stepIndex}
        showSkipButton
        showProgress
        scrollToFirstStep
        disableScrolling
        spotlightClicks
        styles={{
          options: { zIndex: 9999 },
          spotlight: { borderRadius: '999px', boxShadow: '0 0 0 9999px rgba(0,0,0,0.4)' },
        }}
        callback={handleJoyrideCallback}
      />
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
