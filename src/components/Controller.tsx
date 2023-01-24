import { useRecoilState } from "recoil";
import { processState, speedState, spikeState } from "../atoms/slider-atom";
import ControlSlider from "./ControlSlider";
import styled from "@emotion/styled";

const Controller = () => {
  const [speedValue, setSpeedValue] = useRecoilState(speedState);
  const [spikeValue, setSpikeValue] = useRecoilState(spikeState);
  const [processValue, setProcessValue] = useRecoilState(processState);

  return (
    <Wrapper>
      <div>
        <Label>Speed</Label>
        <ControlSlider
          value={speedValue}
          min={10}
          max={120}
          step={1}
          onChange={setSpeedValue}
        />
      </div>
      <div>
        <Label>Spikes</Label>
        <ControlSlider
          value={spikeValue}
          min={0.05}
          max={2}
          step={0.05}
          onChange={setSpikeValue}
        />
      </div>
      <div>
        <Label>Processing</Label>
        <ControlSlider
          value={processValue}
          min={0.6}
          max={2.4}
          step={0.01}
          onChange={setProcessValue}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Label = styled.label`
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  display: block;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

export default Controller;
