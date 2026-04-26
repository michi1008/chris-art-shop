import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSteps.css";

const STEPS = [
  { label: "Sign In", to: "/login" },
  { label: "Shipping", to: "/shipping" },
  { label: "Payment", to: "/payment" },
  { label: "Place Order", to: "/placeorder" },
];

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const active = [step1, step2, step3, step4];
  return (
    <nav className="cs-steps">
      {STEPS.map((step, i) => (
        <React.Fragment key={i}>
          <div className={`cs-step ${active[i] ? "cs-step--on" : "cs-step--off"}`}>
            <div className="cs-circle">{i + 1}</div>
            {active[i] ? (
              <Link to={step.to} className="cs-label">{step.label}</Link>
            ) : (
              <span className="cs-label">{step.label}</span>
            )}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`cs-connector ${active[i + 1] ? "cs-connector--on" : ""}`} />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default CheckoutSteps;
