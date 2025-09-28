# GAP Insurance Calculator

A comprehensive web application that helps users calculate their GAP insurance coverage based on their loan value, settlement amount, and insurance provider type.

## Overview

GAP (Guaranteed Asset Protection) insurance covers the difference between what you owe on your car and its actual cash value in the event of a total loss. This calculator helps users understand their coverage options and potential financial protection.

## Features

- **Interactive Calculator**: Input loan value and settlement amount to calculate coverage
- **Insurance Type Detection**: Differentiates between dealership and insurance company GAP coverage
- **Real-time Calculations**: Instant results based on user inputs
- **Educational Content**: Comprehensive information about GAP insurance
- **Responsive Design**: Works on desktop and mobile devices

## How It Works

1. **Input Values**: Enter your car's market value settlement amount and loan value
2. **Insurance Status**: Indicate whether you have GAP insurance
3. **Provider Type**: If you have GAP insurance, specify whether it's through a dealership or insurance company
4. **Calculate**: Get instant coverage calculations and explanations

## Coverage Calculations

- **No GAP Insurance**: Shows the uncovered difference between loan value and settlement amount
- **Dealership GAP**: Covers 100% of the difference between loan value and settlement amount
- **Insurance Company GAP**: Covers 25% of the settlement amount

## Technical Details

- **Frontend**: React.js with functional components and hooks
- **Styling**: Custom CSS with responsive design
- **Dependencies**: React, ReactDOM, Babel for JSX transformation
- **Browser Support**: Modern browsers with ES6+ support

## Usage

1. Open `index.html` in a web browser
2. Fill in the required information
3. Click "Calculate Coverage" to see your results
4. Review the additional information section for educational content

## File Structure

```
gap-insurance-calculator/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # React component logic
└── README.md           # This documentation
```

## Educational Resources

The application includes links to authoritative sources:
- [Insurance Information Institute: What is GAP insurance?](https://www.iii.org/article/what-gap-insurance)
- [Consumer Financial Protection Bureau: What is GAP insurance?](https://www.consumerfinance.gov/ask-cfpb/what-is-gap-insurance-en-853/)

## Development

This tool was developed as part of an internship program to help users make informed decisions about GAP insurance coverage. The calculator provides both practical calculations and educational content to enhance user understanding.

## License

Copyright © 2025 Noah Khomer. All rights reserved.
