import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import styled from "@emotion/styled";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
};

const ControlSlider = ({ value, onChange, min, max, step }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Wrapper>
      <Mark>{min}</Mark>
      <Slider
        width={150}
        id="slider"
        value={value}
        min={min}
        max={max}
        step={step}
        colorScheme="teal"
        onChange={onChange}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={value}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <Mark>{max}</Mark>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Mark = styled.div`
  color: #fff;
`;

export default ControlSlider;
