import React, { useState, memo } from 'react';
import styled, { css } from 'styled-components';

const TooltipBody = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  width: fit-content;
  font-size: 1rem;
  color: #A7B5C2;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TooltipDiv = styled.div`
  min-width: 100px;
  width: fit-content;
  height: fit-content;
  padding: 4px;
  background: white;
  color: #36404A;
  font-size: 1rem;
  z-index: 2;

  ${({$position}) => $position};
`;

const Tooltip = ({text, label, control=false}) => {

  const [showTooltip, setShowTooltip] = useState(false);
  const [pointLoc, setPointLoc] = useState({x: 0, y:0});

  const showTooltipCondition = (e) => {
    setPointLoc((prev) => ({...prev, x: e.clientX + 5, y: e.clientY + 10}));
    setShowTooltip(true);
  };

  const hideTooltipCondition = () => {
    setShowTooltip(false);
  };

  const positionCSS = control ?  
  css`
    position: absolute;
    top: unset;
    bottom: -24px; 
    left: unset;
    right: unset;
    margin: auto;
  ` : 
  css`
    position: fixed;
    top: ${pointLoc.y}px;
    left: ${pointLoc.x}px;
  `

  return (
    <TooltipBody onMouseOver={showTooltipCondition} onMouseLeave={hideTooltipCondition}>
      {label}
      {showTooltip && 
      <TooltipDiv $position={positionCSS}>
        {text}
      </TooltipDiv>}
    </TooltipBody>
  )
}

export default memo(Tooltip);