# Unit Test Generator

A powerful web application that automatically generates starter unit tests from function signatures. Supports multiple testing frameworks and programming languages with intelligent test case generation.

## Overview

The Unit Test Generator streamlines the testing process by analyzing function signatures and generating comprehensive test suites. It supports popular testing frameworks across different programming languages and includes intelligent test case generation for various scenarios.

## Features

- **Multi-Framework Support**: Jest, Mocha, Jasmine, Vitest, PyTest, Unittest, JUnit, RSpec
- **Multi-Language Support**: JavaScript, TypeScript, Python, Java, Ruby
- **Intelligent Test Generation**: Automatically creates valid, edge case, and error handling tests
- **Async Support**: Handles async/await functions with proper test structure
- **Mock Integration**: Generates mock tests for functions with dependencies
- **Copy & Download**: Easy export of generated tests
- **Example Templates**: Quick-start examples for common function patterns

## Supported Frameworks

### JavaScript/TypeScript
- **Jest**: Modern testing framework with built-in mocking
- **Mocha**: Flexible testing framework with Chai assertions
- **Jasmine**: Behavior-driven testing framework
- **Vitest**: Fast testing framework for Vite projects

### Python
- **PyTest**: Modern Python testing framework
- **Unittest**: Built-in Python testing framework

### Java
- **JUnit**: Industry-standard Java testing framework

### Ruby
- **RSpec**: Behavior-driven development framework

## How It Works

### Step 1: Select Framework
Choose your preferred testing framework from the dropdown menu. The generator will adapt the test structure and syntax accordingly.

### Step 2: Enter Function Signature
Paste your function signature in the text area. The generator supports various formats:
- JavaScript: `function calculateTotal(price, tax, discount) { }`
- Async: `async function fetchUserData(userId) { }`
- Python: `def process_data(data: list, threshold: int) -> bool:`
- Java: `public int addNumbers(int a, int b) { }`

### Step 3: Configure Options
Choose your testing preferences:
- **Include Edge Cases**: Generate tests for boundary conditions
- **Include Error Handling**: Create tests for invalid inputs
- **Include Async Tests**: Handle asynchronous functions properly
- **Include Mock Tests**: Generate tests with mocked dependencies

### Step 4: Generate Tests
Click "Generate Unit Tests" to create your test suite. The generator will analyze your function signature and create appropriate test cases.

## Generated Test Types

### Basic Functionality Tests
- **Valid Input Tests**: Test with expected valid parameters
- **Return Value Validation**: Verify function returns expected results
- **Type Checking**: Ensure return types match expectations

### Edge Case Tests
- **Boundary Conditions**: Test with minimum/maximum values
- **Empty Inputs**: Test with empty strings, arrays, or objects
- **Null/Undefined**: Test with null or undefined values
- **Zero Values**: Test with zero or falsy values

### Error Handling Tests
- **Invalid Inputs**: Test with wrong data types
- **Exception Testing**: Verify proper error throwing
- **Input Validation**: Test parameter validation logic

### Mock Tests (Async Functions)
- **Dependency Mocking**: Mock external API calls
- **Async/Await Testing**: Proper handling of promises
- **Mock Verification**: Verify mock function calls

## Example Outputs

### Jest Example
```javascript
describe('calculateTotal', () => {
  it('should work with valid inputs', () => {
    // Arrange
    const price = 100;
    const tax = 0.1;
    const discount = 0.05;
    
    // Act
    const result = calculateTotal(price, tax, discount);
    
    // Assert
    expect(result).toBeDefined();
  });
});
```

### PyTest Example
```python
def test_calculate_total_valid_inputs():
    # Arrange
    price = 100
    tax = 0.1
    discount = 0.05
    
    # Act
    result = calculate_total(price, tax, discount)
    
    # Assert
    assert result is not None
```

## Technical Implementation

### Function Signature Parsing
- **Regex Analysis**: Extracts function name, parameters, and types
- **Type Detection**: Identifies parameter types from signatures
- **Language Detection**: Determines programming language from syntax

### Test Generation Logic
- **Template System**: Framework-specific test templates
- **Parameter Analysis**: Generates appropriate test values based on types
- **Scenario Generation**: Creates valid, edge case, and invalid test scenarios

### Code Quality Features
- **Clean Structure**: Well-organized test code with clear sections
- **Comments**: Descriptive comments for each test section
- **Best Practices**: Follows testing best practices for each framework
- **Readability**: Clear, maintainable test code

## File Structure

```
unit-test-generator/
├── index.html          # Main HTML file with interface
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and generators
└── README.md           # This documentation
```

## Use Cases

### Development Teams
- **Rapid Test Creation**: Quickly generate test skeletons
- **Code Review**: Ensure comprehensive test coverage
- **Onboarding**: Help new developers understand testing patterns
- **Standards**: Maintain consistent testing practices

### Individual Developers
- **Learning**: Understand testing patterns for different frameworks
- **Productivity**: Speed up test writing process
- **Best Practices**: Learn proper test structure and organization
- **Exploration**: Experiment with different testing approaches

### Educational
- **Teaching**: Demonstrate testing concepts and patterns
- **Learning**: Practice with different testing frameworks
- **Examples**: Show real-world testing scenarios
- **Templates**: Provide starting points for test development

## Browser Compatibility

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Clipboard API support for copy functionality

## Performance Features

- **Client-Side Generation**: No server required, works offline
- **Fast Processing**: Instant test generation
- **Memory Efficient**: Lightweight JavaScript implementation
- **Responsive Design**: Works on all screen sizes

## Development Notes

This tool was developed as part of an internship program to address the common challenge of writing comprehensive unit tests. The generator reduces the time and effort required to create test suites while ensuring best practices are followed.

## Future Enhancements

- **More Frameworks**: Support for additional testing frameworks
- **Custom Templates**: User-defined test templates
- **Integration**: IDE plugins and extensions
- **Advanced Analysis**: More sophisticated function analysis
- **Test Data Generation**: Automatic test data creation
- **Coverage Analysis**: Integration with coverage tools

## License

Copyright © 2025 Noah Khomer. All rights reserved.

## Contributing

This is a development tool designed to improve testing productivity and quality. For questions or feedback, please contact the developer.

---

*Generate comprehensive unit tests in seconds, not hours. Focus on writing great code while we handle the test scaffolding.*
