import KarsegardWcSelect from "https://esm.sh/@karsegard/wc-select";
const { useState } = React;

function GapInsuranceCalculator() {
  const [settlementAmount, setSettlementAmount] = useState(0);
  const [loanValue, setLoanValue] = useState(0);
  const [hasGapInsurance, setHasGapInsurance] = useState('');
  const [gapInsuranceSource, setGapInsuranceSource] = useState('');
  const [result, setResult] = useState('');

  const calculateCoverage = () => {
    if (hasGapInsurance === 'no') {
      setResult(`You don't have GAP insurance. The difference between your loan value and settlement amount (${(loanValue - settlementAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}) is not covered.`);
      return;
    }

    if (gapInsuranceSource === 'dealership') {
      setResult(`Your GAP insurance through the dealership covers 100% of the difference: ${(loanValue - settlementAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
    } else {
      const coverage = settlementAmount * 0.25;
      setResult(`Your GAP insurance through the insurance company covers 25% of the settlement amount: ${coverage.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
    }
  };

  return (
    <div>
      <h1>GAP Insurance Calculator</h1>
      <div className="calculator">
        <div className="input-group">
          <label htmlFor="settlement">Car Market Value Settlement Amount</label>
          <input
            id="settlement"
            type="number"
            placeholder="Enter settlement amount"
            onChange={(e) => setSettlementAmount(Number(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label htmlFor="loan">Loan Value</label>
          <input
            id="loan"
            type="number"
            placeholder="Enter loan value"
            onChange={(e) => setLoanValue(Number(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label>Do you have GAP insurance?</label>
          <div>
            <label>
              <input
                type="radio"
                value="yes"
                checked={hasGapInsurance === 'yes'}
                onChange={(e) => setHasGapInsurance(e.target.value)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={hasGapInsurance === 'no'}
                onChange={(e) => setHasGapInsurance(e.target.value)}
              />
              No
            </label>
          </div>
        </div>
        {hasGapInsurance === 'yes' && (
          <div className="input-group">
            <label>Is your GAP insurance through the dealership or car insurance company?</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="dealership"
                  checked={gapInsuranceSource === 'dealership'}
                  onChange={(e) => setGapInsuranceSource(e.target.value)}
                />
                Dealership
              </label>
              <label>
                <input
                  type="radio"
                  value="insurance"
                  checked={gapInsuranceSource === 'insurance'}
                  onChange={(e) => setGapInsuranceSource(e.target.value)}
                />
                Car Insurance Company
              </label>
            </div>
          </div>
        )}
        <button onClick={calculateCoverage}>Calculate Coverage</button>
        {result && <div className="result">{result}</div>}
      </div>
      <div className="info">
        <h3>Additional Information:</h3>
        <ul>
          <li>GAP (Guaranteed Asset Protection) insurance covers the difference between what you owe on your car and its actual cash value in the event of a total loss.</li>
          <li>Dealership GAP insurance typically offers more comprehensive coverage but may be more expensive.</li>
          <li>Insurance company GAP coverage is often less expensive but may have more limitations.</li>
          <li>Always read the terms and conditions of your GAP insurance policy carefully.</li>
        </ul>
        <h3>References:</h3>
        <ul>
          <li><a href="https://www.iii.org/article/what-gap-insurance" target="_blank" rel="noopener noreferrer">Insurance Information Institute: What is GAP insurance?</a></li>
          <li><a href="https://www.consumerfinance.gov/ask-cfpb/what-is-gap-insurance-en-853/" target="_blank" rel="noopener noreferrer">Consumer Financial Protection Bureau: What is GAP insurance?</a></li>
        </ul>
      </div>
      <footer>
        <p>Copyright © {new Date().getFullYear()} Noah Khomer</p>
      </footer>
    </div>
  );
}

ReactDOM.render(<GapInsuranceCalculator />, document.getElementById('root'));
