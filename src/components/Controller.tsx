import { EuiRange } from "@elastic/eui";
import { useRecoilState } from "recoil";
import { processState, speedState, spikeState } from "../atoms/slider-atom";

const Controller = () => {
  const [speedValue, setSpeedValue] = useRecoilState(speedState);
  const [spikeValue, setSpikeValue] = useRecoilState(spikeState);
  const [processValue, setProcessValue] = useRecoilState(processState);

  return (
    <div className="controls">
      <div>
        <label>Speed</label>
        <EuiRange
          min={10}
          max={120}
          step={1}
          value={speedValue}
          onChange={(e) => setSpeedValue(Number(e.currentTarget.value))}
          showLabels
          showValue
        />
      </div>
      <div>
        <label>Spikes</label>
        <EuiRange
          min={0.05}
          max={2}
          step={0.05}
          value={spikeValue}
          onChange={(e) => setSpikeValue(Number(e.currentTarget.value))}
          showLabels
          showValue
        />
      </div>
      <div>
        <label>Processing</label>
        <EuiRange
          min={0.6}
          max={2.4}
          step={0.01}
          value={processValue}
          onChange={(e) => setProcessValue(Number(e.currentTarget.value))}
          showLabels
          showValue
        />
      </div>
    </div>
  );
};

export default Controller;
