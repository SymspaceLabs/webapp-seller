"use client";

import { Fragment, useEffect, useState } from "react";
import { Box, Typography, Stepper, Step, StepLabel  } from "@mui/material"; // GLOBAL CUSTOM COMPONENT
import { H3 } from "../../../../components/Typography"; // Local CUSTOM COMPONENT
import ProductForm from "../product-form";
import { FlexBox } from "../../../../components/flex-box";

const ProductCreatePageView = () => {

  const [selectedStep, setSelectedStep] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const INITIAL_VALUES = {
    name: "",
    tags: "",
    stock: "",
    price: "",
    category: [],
    sale_price: "",
    description: ""
  };

  const handleFormSubmit = values => {
    console.log(values);
  };

  return (
    <Box sx={{background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px 15px', overflow:'hidden'}}>
      
      <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px  15px' }}>
        <H3 sx={{mb:2, fontFamily:'Elemental End', color:'#fff', textTransform:'lowercase'}}>
          Add New Product
        </H3>
        

        <Box sx={{ py:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px' }}>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel sx={{fontFamily:'Elemental End', color:'#fff', textTransform:'lowercase'}}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <ProductForm
            initialValues={INITIAL_VALUES}
            handleFormSubmit={handleFormSubmit}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        </Box>


      </Box>
    </Box>
    );
};


 

const steps = [
  'Product Info',
  'Details',
  'Safety & Compliance',
  'Review & Submit'
];


export default ProductCreatePageView;
