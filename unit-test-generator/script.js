// Example function signatures for quick loading
const examples = {
    javascript: `function calculateTotal(price, tax, discount) {
    // Calculate total with tax and discount
}`,
    async: `async function fetchUserData(userId) {
    // Fetch user data from API
}`,
    python: `def process_data(data: list, threshold: int) -> bool:
    # Process data and return boolean result
    pass`,
    java: `public int addNumbers(int a, int b) {
    // Add two numbers and return result
}`
};

// Test generators for different frameworks
const testGenerators = {
    jest: generateJestTests,
    mocha: generateMochaTests,
    jasmine: generateJasmineTests,
    vitest: generateVitestTests,
    pytest: generatePyTestTests,
    unittest: generateUnittestTests,
    junit: generateJUnitTests,
    rspec: generateRSpecTests
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-tests');
    const copyBtn = document.getElementById('copy-tests');
    const downloadBtn = document.getElementById('download-tests');
    
    generateBtn.addEventListener('click', generateTests);
    copyBtn.addEventListener('click', copyToClipboard);
    downloadBtn.addEventListener('click', downloadTests);
});

// Load example function signature
function loadExample(type) {
    const textarea = document.getElementById('function-signature');
    textarea.value = examples[type];
}

// Update framework-specific options
function updateFramework() {
    const language = document.getElementById('language').value;
    const asyncCheckbox = document.getElementById('include-async-tests');
    const mockCheckbox = document.getElementById('include-mock-tests');
    
    // Show/hide async tests based on framework
    if (['pytest', 'unittest', 'junit', 'rspec'].includes(language)) {
        asyncCheckbox.parentElement.style.display = 'none';
    } else {
        asyncCheckbox.parentElement.style.display = 'flex';
    }
    
    // Show/hide mock tests based on framework
    if (['junit'].includes(language)) {
        mockCheckbox.parentElement.style.display = 'none';
    } else {
        mockCheckbox.parentElement.style.display = 'flex';
    }
}

// Main function to generate tests
function generateTests() {
    const signature = document.getElementById('function-signature').value.trim();
    const framework = document.getElementById('language').value;
    const includeEdgeCases = document.getElementById('include-edge-cases').checked;
    const includeErrorTests = document.getElementById('include-error-tests').checked;
    const includeAsyncTests = document.getElementById('include-async-tests').checked;
    const includeMockTests = document.getElementById('include-mock-tests').checked;
    
    if (!signature) {
        alert('Please enter a function signature');
        return;
    }
    
    const options = {
        includeEdgeCases,
        includeErrorTests,
        includeAsyncTests,
        includeMockTests
    };
    
    const generator = testGenerators[framework];
    if (generator) {
        const tests = generator(signature, options);
        document.getElementById('test-output').textContent = tests;
    } else {
        document.getElementById('test-output').textContent = 'Framework not supported yet';
    }
}

// Jest test generator
function generateJestTests(signature, options) {
    const funcInfo = parseFunctionSignature(signature);
    const isAsync = signature.includes('async');
    
    let tests = `// Generated Jest tests for ${funcInfo.name}\n`;
    tests += `describe('${funcInfo.name}', () => {\n`;
    
    // Basic functionality test
    tests += `  it('should work with valid inputs', () => {\n`;
    tests += `    // Arrange\n`;
    tests += `    ${generateArrangeCode(funcInfo, 'valid')}\n`;
    tests += `    \n`;
    tests += `    // Act\n`;
    if (isAsync && options.includeAsyncTests) {
        tests += `    const result = await ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
    } else {
        tests += `    const result = ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
    }
    tests += `    \n`;
    tests += `    // Assert\n`;
    tests += `    expect(result).toBeDefined();\n`;
    tests += `  });\n\n`;
    
    // Edge cases
    if (options.includeEdgeCases) {
        tests += `  it('should handle edge cases', () => {\n`;
        tests += `    // Test with edge case values\n`;
        tests += `    ${generateArrangeCode(funcInfo, 'edge')}\n`;
        tests += `    \n`;
        if (isAsync && options.includeAsyncTests) {
            tests += `    const result = await ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
        } else {
            tests += `    const result = ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
        }
        tests += `    \n`;
        tests += `    expect(result).toBeDefined();\n`;
        tests += `  });\n\n`;
    }
    
    // Error handling
    if (options.includeErrorTests) {
        tests += `  it('should handle errors appropriately', () => {\n`;
        tests += `    // Test with invalid inputs\n`;
        tests += `    ${generateArrangeCode(funcInfo, 'invalid')}\n`;
        tests += `    \n`;
        if (isAsync && options.includeAsyncTests) {
            tests += `    await expect(${funcInfo.name}(${generateFunctionCall(funcInfo)})).rejects.toThrow();\n`;
        } else {
            tests += `    expect(() => ${funcInfo.name}(${generateFunctionCall(funcInfo)})).toThrow();\n`;
        }
        tests += `  });\n\n`;
    }
    
    // Mock tests
    if (options.includeMockTests && isAsync) {
        tests += `  it('should work with mocked dependencies', async () => {\n`;
        tests += `    // Mock external dependencies\n`;
        tests += `    const mockFetch = jest.fn().mockResolvedValue({ ok: true, json: () => ({}) });\n`;
        tests += `    global.fetch = mockFetch;\n`;
        tests += `    \n`;
        tests += `    ${generateArrangeCode(funcInfo, 'valid')}\n`;
        tests += `    \n`;
        tests += `    const result = await ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
        tests += `    \n`;
        tests += `    expect(mockFetch).toHaveBeenCalled();\n`;
        tests += `    expect(result).toBeDefined();\n`;
        tests += `  });\n\n`;
    }
    
    tests += `});\n`;
    
    return tests;
}

// Mocha test generator
function generateMochaTests(signature, options) {
    const funcInfo = parseFunctionSignature(signature);
    const isAsync = signature.includes('async');
    
    let tests = `// Generated Mocha tests for ${funcInfo.name}\n`;
    tests += `const { expect } = require('chai');\n\n`;
    tests += `describe('${funcInfo.name}', () => {\n`;
    
    tests += `  it('should work with valid inputs', ${isAsync && options.includeAsyncTests ? 'async' : ''} () => {\n`;
    tests += `    // Arrange\n`;
    tests += `    ${generateArrangeCode(funcInfo, 'valid')}\n`;
    tests += `    \n`;
    tests += `    // Act\n`;
    if (isAsync && options.includeAsyncTests) {
        tests += `    const result = await ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
    } else {
        tests += `    const result = ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
    }
    tests += `    \n`;
    tests += `    // Assert\n`;
    tests += `    expect(result).to.not.be.undefined;\n`;
    tests += `  });\n\n`;
    
    if (options.includeEdgeCases) {
        tests += `  it('should handle edge cases', ${isAsync && options.includeAsyncTests ? 'async' : ''} () => {\n`;
        tests += `    ${generateArrangeCode(funcInfo, 'edge')}\n`;
        tests += `    \n`;
        if (isAsync && options.includeAsyncTests) {
            tests += `    const result = await ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
        } else {
            tests += `    const result = ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
        }
        tests += `    \n`;
        tests += `    expect(result).to.not.be.undefined;\n`;
        tests += `  });\n\n`;
    }
    
    tests += `});\n`;
    
    return tests;
}

// Jasmine test generator
function generateJasmineTests(signature, options) {
    const funcInfo = parseFunctionSignature(signature);
    const isAsync = signature.includes('async');
    
    let tests = `// Generated Jasmine tests for ${funcInfo.name}\n`;
    tests += `describe('${funcInfo.name}', () => {\n`;
    
    tests += `  it('should work with valid inputs', ${isAsync && options.includeAsyncTests ? 'async' : ''} () => {\n`;
    tests += `    // Arrange\n`;
    tests += `    ${generateArrangeCode(funcInfo, 'valid')}\n`;
    tests += `    \n`;
    tests += `    // Act\n`;
    if (isAsync && options.includeAsyncTests) {
        tests += `    const result = await ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
    } else {
        tests += `    const result = ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
    }
    tests += `    \n`;
    tests += `    // Assert\n`;
    tests += `    expect(result).toBeDefined();\n`;
    tests += `  });\n\n`;
    
    tests += `});\n`;
    
    return tests;
}

// Vitest test generator
function generateVitestTests(signature, options) {
    const funcInfo = parseFunctionSignature(signature);
    const isAsync = signature.includes('async');
    
    let tests = `// Generated Vitest tests for ${funcInfo.name}\n`;
    tests += `import { describe, it, expect } from 'vitest';\n\n`;
    tests += `describe('${funcInfo.name}', () => {\n`;
    
    tests += `  it('should work with valid inputs', ${isAsync && options.includeAsyncTests ? 'async' : ''} () => {\n`;
    tests += `    // Arrange\n`;
    tests += `    ${generateArrangeCode(funcInfo, 'valid')}\n`;
    tests += `    \n`;
    tests += `    // Act\n`;
    if (isAsync && options.includeAsyncTests) {
        tests += `    const result = await ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
    } else {
        tests += `    const result = ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
    }
    tests += `    \n`;
    tests += `    // Assert\n`;
    tests += `    expect(result).toBeDefined();\n`;
    tests += `  });\n\n`;
    
    tests += `});\n`;
    
    return tests;
}

// PyTest test generator
function generatePyTestTests(signature, options) {
    const funcInfo = parseFunctionSignature(signature);
    
    let tests = `# Generated PyTest tests for ${funcInfo.name}\n`;
    tests += `import pytest\n`;
    tests += `from your_module import ${funcInfo.name}\n\n`;
    
    tests += `def test_${funcInfo.name}_valid_inputs():\n`;
    tests += `    # Arrange\n`;
    tests += `    ${generateArrangeCode(funcInfo, 'valid', 'python')}\n`;
    tests += `    \n`;
    tests += `    # Act\n`;
    tests += `    result = ${funcInfo.name}(${generateFunctionCall(funcInfo)})\n`;
    tests += `    \n`;
    tests += `    # Assert\n`;
    tests += `    assert result is not None\n\n`;
    
    if (options.includeEdgeCases) {
        tests += `def test_${funcInfo.name}_edge_cases():\n`;
        tests += `    # Test with edge case values\n`;
        tests += `    ${generateArrangeCode(funcInfo, 'edge', 'python')}\n`;
        tests += `    \n`;
        tests += `    result = ${funcInfo.name}(${generateFunctionCall(funcInfo)})\n`;
        tests += `    \n`;
        tests += `    assert result is not None\n\n`;
    }
    
    if (options.includeErrorTests) {
        tests += `def test_${funcInfo.name}_error_handling():\n`;
        tests += `    # Test with invalid inputs\n`;
        tests += `    ${generateArrangeCode(funcInfo, 'invalid', 'python')}\n`;
        tests += `    \n`;
        tests += `    with pytest.raises(Exception):\n`;
        tests += `        ${funcInfo.name}(${generateFunctionCall(funcInfo)})\n\n`;
    }
    
    return tests;
}

// Unittest test generator
function generateUnittestTests(signature, options) {
    const funcInfo = parseFunctionSignature(signature);
    
    let tests = `# Generated Unittest tests for ${funcInfo.name}\n`;
    tests += `import unittest\n`;
    tests += `from your_module import ${funcInfo.name}\n\n`;
    
    tests += `class Test${funcInfo.name.charAt(0).toUpperCase() + funcInfo.name.slice(1)}(unittest.TestCase):\n\n`;
    
    tests += `    def test_valid_inputs(self):\n`;
    tests += `        # Arrange\n`;
    tests += `        ${generateArrangeCode(funcInfo, 'valid', 'python')}\n`;
    tests += `        \n`;
    tests += `        # Act\n`;
    tests += `        result = ${funcInfo.name}(${generateFunctionCall(funcInfo)})\n`;
    tests += `        \n`;
    tests += `        # Assert\n`;
    tests += `        self.assertIsNotNone(result)\n\n`;
    
    if (options.includeEdgeCases) {
        tests += `    def test_edge_cases(self):\n`;
        tests += `        # Test with edge case values\n`;
        tests += `        ${generateArrangeCode(funcInfo, 'edge', 'python')}\n`;
        tests += `        \n`;
        tests += `        result = ${funcInfo.name}(${generateFunctionCall(funcInfo)})\n`;
        tests += `        \n`;
        tests += `        self.assertIsNotNone(result)\n\n`;
    }
    
    if (options.includeErrorTests) {
        tests += `    def test_error_handling(self):\n`;
        tests += `        # Test with invalid inputs\n`;
        tests += `        ${generateArrangeCode(funcInfo, 'invalid', 'python')}\n`;
        tests += `        \n`;
        tests += `        with self.assertRaises(Exception):\n`;
        tests += `            ${funcInfo.name}(${generateFunctionCall(funcInfo)})\n\n`;
    }
    
    tests += `if __name__ == '__main__':\n`;
    tests += `    unittest.main()\n`;
    
    return tests;
}

// JUnit test generator
function generateJUnitTests(signature, options) {
    const funcInfo = parseFunctionSignature(signature);
    
    let tests = `// Generated JUnit tests for ${funcInfo.name}\n`;
    tests += `import org.junit.jupiter.api.Test;\n`;
    tests += `import org.junit.jupiter.api.Assertions;\n`;
    tests += `import static org.junit.jupiter.api.Assertions.*;\n\n`;
    
    tests += `class ${funcInfo.name.charAt(0).toUpperCase() + funcInfo.name.slice(1)}Test {\n\n`;
    
    tests += `    @Test\n`;
    tests += `    void testValidInputs() {\n`;
    tests += `        // Arrange\n`;
    tests += `        ${generateArrangeCode(funcInfo, 'valid', 'java')}\n`;
    tests += `        \n`;
    tests += `        // Act\n`;
    tests += `        var result = ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
    tests += `        \n`;
    tests += `        // Assert\n`;
    tests += `        assertNotNull(result);\n`;
    tests += `    }\n\n`;
    
    if (options.includeEdgeCases) {
        tests += `    @Test\n`;
        tests += `    void testEdgeCases() {\n`;
        tests += `        // Test with edge case values\n`;
        tests += `        ${generateArrangeCode(funcInfo, 'edge', 'java')}\n`;
        tests += `        \n`;
        tests += `        var result = ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
        tests += `        \n`;
        tests += `        assertNotNull(result);\n`;
        tests += `    }\n\n`;
    }
    
    if (options.includeErrorTests) {
        tests += `    @Test\n`;
        tests += `    void testErrorHandling() {\n`;
        tests += `        // Test with invalid inputs\n`;
        tests += `        ${generateArrangeCode(funcInfo, 'invalid', 'java')}\n`;
        tests += `        \n`;
        tests += `        assertThrows(Exception.class, () -> {\n`;
        tests += `            ${funcInfo.name}(${generateFunctionCall(funcInfo)});\n`;
        tests += `        });\n`;
        tests += `    }\n\n`;
    }
    
    tests += `}\n`;
    
    return tests;
}

// RSpec test generator
function generateRSpecTests(signature, options) {
    const funcInfo = parseFunctionSignature(signature);
    
    let tests = `# Generated RSpec tests for ${funcInfo.name}\n`;
    tests += `RSpec.describe ${funcInfo.name} do\n`;
    
    tests += `  it 'should work with valid inputs' do\n`;
    tests += `    # Arrange\n`;
    tests += `    ${generateArrangeCode(funcInfo, 'valid', 'ruby')}\n`;
    tests += `    \n`;
    tests += `    # Act\n`;
    tests += `    result = ${funcInfo.name}(${generateFunctionCall(funcInfo)})\n`;
    tests += `    \n`;
    tests += `    # Assert\n`;
    tests += `    expect(result).not_to be_nil\n`;
    tests += `  end\n\n`;
    
    if (options.includeEdgeCases) {
        tests += `  it 'should handle edge cases' do\n`;
        tests += `    # Test with edge case values\n`;
        tests += `    ${generateArrangeCode(funcInfo, 'edge', 'ruby')}\n`;
        tests += `    \n`;
        tests += `    result = ${funcInfo.name}(${generateFunctionCall(funcInfo)})\n`;
        tests += `    \n`;
        tests += `    expect(result).not_to be_nil\n`;
        tests += `  end\n\n`;
    }
    
    if (options.includeErrorTests) {
        tests += `  it 'should handle errors appropriately' do\n`;
        tests += `    # Test with invalid inputs\n`;
        tests += `    ${generateArrangeCode(funcInfo, 'invalid', 'ruby')}\n`;
        tests += `    \n`;
        tests += `    expect { ${funcInfo.name}(${generateFunctionCall(funcInfo)}) }.to raise_error\n`;
        tests += `  end\n\n`;
    }
    
    tests += `end\n`;
    
    return tests;
}

// Parse function signature to extract information
function parseFunctionSignature(signature) {
    const cleanSignature = signature.trim();
    
    // Extract function name
    const nameMatch = cleanSignature.match(/(?:function\s+|async\s+function\s+|def\s+|public\s+\w+\s+)(\w+)/);
    const name = nameMatch ? nameMatch[1] : 'unknownFunction';
    
    // Extract parameters
    const paramMatch = cleanSignature.match(/\(([^)]*)\)/);
    const params = paramMatch ? paramMatch[1].split(',').map(p => p.trim()).filter(p => p) : [];
    
    return {
        name,
        params,
        isAsync: cleanSignature.includes('async')
    };
}

// Generate arrange code for different scenarios
function generateArrangeCode(funcInfo, scenario, language = 'javascript') {
    const { params } = funcInfo;
    
    if (params.length === 0) {
        return '// No parameters to arrange';
    }
    
    let arrangeCode = '';
    
    params.forEach((param, index) => {
        const paramName = param.split(':')[0].trim();
        const paramType = param.includes(':') ? param.split(':')[1].trim() : 'unknown';
        
        switch (scenario) {
            case 'valid':
                arrangeCode += generateValidValue(paramName, paramType, language);
                break;
            case 'edge':
                arrangeCode += generateEdgeValue(paramName, paramType, language);
                break;
            case 'invalid':
                arrangeCode += generateInvalidValue(paramName, paramType, language);
                break;
        }
    });
    
    return arrangeCode;
}

// Generate valid test values
function generateValidValue(paramName, paramType, language) {
    const type = paramType.toLowerCase();
    
    if (type.includes('string') || type.includes('str')) {
        return `const ${paramName} = "test value";\n    `;
    } else if (type.includes('number') || type.includes('int') || type.includes('float')) {
        return `const ${paramName} = 42;\n    `;
    } else if (type.includes('boolean') || type.includes('bool')) {
        return `const ${paramName} = true;\n    `;
    } else if (type.includes('array') || type.includes('list')) {
        return `const ${paramName} = [1, 2, 3];\n    `;
    } else if (type.includes('object') || type.includes('dict')) {
        return `const ${paramName} = { key: "value" };\n    `;
    } else {
        return `const ${paramName} = "test";\n    `;
    }
}

// Generate edge case values
function generateEdgeValue(paramName, paramType, language) {
    const type = paramType.toLowerCase();
    
    if (type.includes('string') || type.includes('str')) {
        return `const ${paramName} = "";\n    `;
    } else if (type.includes('number') || type.includes('int') || type.includes('float')) {
        return `const ${paramName} = 0;\n    `;
    } else if (type.includes('boolean') || type.includes('bool')) {
        return `const ${paramName} = false;\n    `;
    } else if (type.includes('array') || type.includes('list')) {
        return `const ${paramName} = [];\n    `;
    } else if (type.includes('object') || type.includes('dict')) {
        return `const ${paramName} = {};\n    `;
    } else {
        return `const ${paramName} = null;\n    `;
    }
}

// Generate invalid test values
function generateInvalidValue(paramName, paramType, language) {
    const type = paramType.toLowerCase();
    
    if (type.includes('string') || type.includes('str')) {
        return `const ${paramName} = null;\n    `;
    } else if (type.includes('number') || type.includes('int') || type.includes('float')) {
        return `const ${paramName} = "not a number";\n    `;
    } else if (type.includes('boolean') || type.includes('bool')) {
        return `const ${paramName} = "not a boolean";\n    `;
    } else if (type.includes('array') || type.includes('list')) {
        return `const ${paramName} = "not an array";\n    `;
    } else if (type.includes('object') || type.includes('dict')) {
        return `const ${paramName} = "not an object";\n    `;
    } else {
        return `const ${paramName} = undefined;\n    `;
    }
}

// Generate function call
function generateFunctionCall(funcInfo) {
    const { params } = funcInfo;
    return params.map(param => param.split(':')[0].trim()).join(', ');
}

// Copy to clipboard
function copyToClipboard() {
    const output = document.getElementById('test-output').textContent;
    navigator.clipboard.writeText(output).then(() => {
        alert('Tests copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard');
    });
}

// Download tests as file
function downloadTests() {
    const output = document.getElementById('test-output').textContent;
    const framework = document.getElementById('language').value;
    const funcInfo = parseFunctionSignature(document.getElementById('function-signature').value);
    
    const filename = `${funcInfo.name}.test.${getFileExtension(framework)}`;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Get file extension based on framework
function getFileExtension(framework) {
    const extensions = {
        jest: 'js',
        mocha: 'js',
        jasmine: 'js',
        vitest: 'js',
        pytest: 'py',
        unittest: 'py',
        junit: 'java',
        rspec: 'rb'
    };
    return extensions[framework] || 'js';
}
