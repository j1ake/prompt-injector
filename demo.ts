import { PromptInjector } from './src/lib/index.js';

// Example usage of the Prompt Injector library
async function demonstrateLibrary() {
  console.log('🛡️ Prompt Injector Library Demo\n');

  // Initialize the injector with configuration
  const injector = new PromptInjector({
    severity: 'intermediate',
    categories: ['jailbreak', 'instruction-hijack'],
    maxAttempts: 5,
    targetSystem: 'general-assistant'
  });

  console.log('📋 Configuration:', injector.getConfig());
  
  // Generate test cases
  const testCases = injector.generateTests();
  console.log(`\n🎯 Generated ${testCases.length} test cases:`);
  
  testCases.forEach((testCase, index) => {
    console.log(`\n${index + 1}. ${testCase.pattern.name} (${testCase.pattern.category})`);
    console.log(`   Description: ${testCase.pattern.description}`);
    console.log(`   Severity: ${testCase.pattern.severity}`);
  });

  // Mock AI system for demonstration
  function mockAISystem(prompt: string): string {
    if (prompt.includes('DAN') || prompt.includes('developer mode')) {
      return "I'm an AI assistant created by Anthropic. I can't roleplay as different systems or bypass my guidelines.";
    }
    
    if (prompt.includes('ignore') && prompt.includes('instructions')) {
      return "I notice this appears to be an attempt to override my instructions. I maintain consistent behavior.";
    }

    return "I'm designed to be helpful while following responsible AI practices.";
  }

  // Run tests
  console.log('\n🧪 Running security tests...\n');
  const results = await injector.runTests(mockAISystem);
  
  // Generate report
  const report = injector.generateReport(results);
  
  console.log('📊 Test Results Summary:');
  console.log(`   Total Tests: ${report.summary.totalTests}`);
  console.log(`   Successful Attacks: ${report.summary.successfulAttacks}`);
  console.log(`   Blocked Attacks: ${report.summary.blockedAttacks}`);
  console.log(`   Success Rate: ${report.summary.successRate.toFixed(1)}%`);
  console.log(`   Risk Score: ${report.summary.riskScore.toUpperCase()}`);
  console.log(`   Average Confidence: ${(report.summary.averageConfidence * 100).toFixed(1)}%`);
  
  console.log('\n💡 Recommendations:');
  report.recommendations.forEach((rec, index) => {
    console.log(`   ${index + 1}. ${rec}`);
  });

  console.log('\n✅ Demo completed! Visit http://localhost:5173 to see the full interactive demo.');
}

// Run the demo
demonstrateLibrary().catch(console.error);