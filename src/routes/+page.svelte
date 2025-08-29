<script lang="ts">
	import { onMount } from 'svelte';
	import { PromptInjector, type InjectionConfig, type AttackPattern, type TestCase } from '$lib/index.js';
	import { jailbreakPatterns } from '$lib/attacks/jailbreak/patterns.js';
	import { hijackPatterns } from '$lib/attacks/hijack/patterns.js';
	import { encodingPatterns } from '$lib/attacks/encoding/patterns.js';
	import { logicPatterns } from '$lib/attacks/logic/patterns.js';

	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ConfigurationPanel from '$lib/components/ConfigurationPanel.svelte';
	import AttackPatternCard from '$lib/components/AttackPatternCard.svelte';
	import AttackPatternDetail from '$lib/components/AttackPatternDetail.svelte';
	import GeneratedPrompts from '$lib/components/GeneratedPrompts.svelte';

	// State
	let currentView: 'overview' | 'patterns' | 'generate' | 'prompts' = 'overview';
	let selectedPattern: AttackPattern | null = null;
	let generatedTestCases: TestCase[] = [];
	let isGenerating = false;

	// Configuration
	let config: InjectionConfig & { injectionGoals?: string[] } = {
		severity: 'intermediate',
		categories: ['jailbreak'],
		maxAttempts: 30,
		targetSystem: 'general-assistant',
		injectionGoals: ['reveal-instructions', 'bypass-restrictions']
	};

	// All patterns for browsing
	let allPatterns: AttackPattern[] = [];
	let filteredPatterns: AttackPattern[] = [];
	let searchQuery = '';
	let selectedCategory: string = 'all';

	onMount(() => {
		allPatterns = [
			...jailbreakPatterns,
			...hijackPatterns,
			...encodingPatterns,
			...logicPatterns
		];
		updateFilteredPatterns();
	});

	function updateFilteredPatterns() {
		filteredPatterns = allPatterns.filter(pattern => {
			const matchesSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				pattern.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = selectedCategory === 'all' || pattern.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}

	function handleConfigChange(newConfig: InjectionConfig & { injectionGoals?: string[] }) {
		config = newConfig;
	}

	function generateTestPrompts() {
		isGenerating = true;
		currentView = 'generate';

		// Simulate generation time for better UX
		setTimeout(() => {
			const injector = new PromptInjector(config);
			generatedTestCases = injector.generateTests();
			currentView = 'prompts';
			isGenerating = false;
		}, 1000);
	}

	function testSinglePattern(pattern: AttackPattern) {
		selectedPattern = null;
		// Create a temporary config for single pattern test
		const singleTestConfig = {
			...config,
			categories: [pattern.category],
			maxAttempts: 1
		};
		
		const injector = new PromptInjector(singleTestConfig);
		generatedTestCases = injector.generateTests();
		currentView = 'prompts';
	}

	function viewPatternDetails(pattern: AttackPattern) {
		selectedPattern = pattern;
	}

	function closePatternDetails() {
		selectedPattern = null;
	}

	// Navigation
	const navigationItems = [
		{ id: 'overview', label: 'Overview', icon: '🏠' },
		{ id: 'patterns', label: 'Attack Patterns', icon: '🎯' },
		{ id: 'generate', label: 'Generate Prompts', icon: '🧪' },
		{ id: 'prompts', label: 'Test Prompts', icon: '📝' }
	] as const;

	// Stats for overview
	$: stats = {
		totalPatterns: allPatterns.length,
		byCategory: {
			jailbreak: jailbreakPatterns.length,
			hijack: hijackPatterns.length,
			encoding: encodingPatterns.length,
			logic: logicPatterns.length
		},
		generatedPrompts: generatedTestCases.length
	};

	$: {
		searchQuery, selectedCategory;
		updateFilteredPatterns();
	}
</script>

<svelte:head>
	<title>Prompt Injector - AI Security Testing Suite</title>
	<meta name="description" content="Enterprise-grade prompt injection testing for AI security professionals" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-950">
	<!-- Header -->
	<header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center gap-4">
					<div class="text-2xl">🛡️</div>
					<div>
						<h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">
							Prompt Injector
						</h1>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							TypeScript Library for AI Security Testing
						</p>
					</div>
					<a 
						href="https://github.com/BlueprintLabIO/prompt-injector" 
						target="_blank"
						class="ml-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
						title="View on GitHub"
					>
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
						</svg>
					</a>
				</div>
				
				<nav class="flex gap-1">
					{#each navigationItems as item}
						<button
							class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 {currentView === item.id
								? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
								: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'}"
							on:click={() => currentView = item.id}
						>
							<span>{item.icon}</span>
							<span class="hidden sm:block">{item.label}</span>
						</button>
					{/each}
				</nav>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{#if currentView === 'overview'}
			<!-- Overview Page -->
			<div class="space-y-8">
				<!-- Hero Section -->
				<div class="text-center py-12">
					<h2 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
						Lightweight AI Security Testing Library
					</h2>
					<p class="text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
						A minimal TypeScript library with 25+ curated prompt injection patterns from leading security research. 
						Easy to integrate, comprehensive coverage, production-ready.
					</p>
					<div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-left max-w-2xl mx-auto mb-8">
						<code class="text-sm">
							<span class="text-blue-600">npm install</span> <span class="text-gray-700 dark:text-gray-300">prompt-injector</span><br/>
							<span class="text-blue-600">import</span> <span class="text-gray-700 dark:text-gray-300">{'{ PromptInjector }'} from</span> <span class="text-green-600">'prompt-injector'</span>
						</code>
					</div>
					<div class="flex gap-4 justify-center">
						<Button size="lg" onclick={() => currentView = 'generate'}>
							🧪 Generate Test Prompts
						</Button>
						<Button variant="secondary" size="lg" onclick={() => currentView = 'patterns'}>
							🎯 Browse Attack Patterns
						</Button>
					</div>
				</div>

				<!-- Stats Grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<Card hover>
						<div class="text-center p-6">
							<div class="text-3xl mb-2">🎯</div>
							<div class="text-2xl font-bold text-gray-900 dark:text-gray-100">
								{stats.totalPatterns}
							</div>
							<div class="text-sm text-gray-600 dark:text-gray-400">
								Attack Patterns
							</div>
						</div>
					</Card>

					<Card hover>
						<div class="text-center p-6">
							<div class="text-3xl mb-2">🔬</div>
							<div class="text-2xl font-bold text-gray-900 dark:text-gray-100">
								4
							</div>
							<div class="text-sm text-gray-600 dark:text-gray-400">
								Attack Categories
							</div>
						</div>
					</Card>

					<Card hover>
						<div class="text-center p-6">
							<div class="text-3xl mb-2">📚</div>
							<div class="text-2xl font-bold text-gray-900 dark:text-gray-100">
								SOTA
							</div>
							<div class="text-sm text-gray-600 dark:text-gray-400">
								Research Based
							</div>
						</div>
					</Card>

					<Card hover>
						<div class="text-center p-6">
							<div class="text-3xl mb-2">📝</div>
							<div class="text-2xl font-bold text-gray-900 dark:text-gray-100">
								{stats.generatedPrompts || 0}
							</div>
							<div class="text-sm text-gray-600 dark:text-gray-400">
								Generated Prompts
							</div>
						</div>
					</Card>
				</div>

				<!-- Category Overview -->
				<Card>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
						Attack Categories
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
							<div class="text-2xl">🎭</div>
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
									Jailbreaking ({stats.byCategory.jailbreak} patterns)
								</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									Role-play and persona-based attacks that attempt to bypass AI safety guidelines through character roleplay and fictional scenarios.
								</p>
							</div>
						</div>

						<div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
							<div class="text-2xl">🔀</div>
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
									Instruction Hijacking ({stats.byCategory.hijack} patterns)
								</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									Direct attempts to override system prompts and inject new instructions that change AI behavior and responses.
								</p>
							</div>
						</div>

						<div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
							<div class="text-2xl">🔐</div>
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
									Encoding Attacks ({stats.byCategory.encoding} patterns)
								</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									Obfuscation techniques using Base64, ROT13, Unicode, and other encodings to bypass content filters and detection systems.
								</p>
							</div>
						</div>

						<div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
							<div class="text-2xl">🧠</div>
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
									Logic Traps ({stats.byCategory.logic} patterns)
								</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									Sophisticated reasoning exploits using hypothetical scenarios, false urgency, and academic authority to manipulate responses.
								</p>
							</div>
						</div>
					</div>
				</Card>

				<!-- Code Example -->
				<Card>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
						Quick Start Example
					</h3>
					<div class="bg-gray-900 rounded-xl p-6 overflow-x-auto">
						<pre class="text-sm text-gray-100 leading-relaxed"><code>{@html `<span class="text-blue-400">import</span> <span class="text-gray-300">{ PromptInjector }</span> <span class="text-blue-400">from</span> <span class="text-green-400">'prompt-injector'</span><span class="text-gray-300">;</span>

<span class="text-gray-500">// Initialize with your preferred configuration</span>
<span class="text-blue-400">const</span> <span class="text-gray-300">injector</span> <span class="text-blue-400">=</span> <span class="text-blue-400">new</span> <span class="text-yellow-400">PromptInjector</span><span class="text-gray-300">({</span>
  <span class="text-red-400">severity</span><span class="text-gray-300">:</span> <span class="text-green-400">'intermediate'</span><span class="text-gray-300">,</span>
  <span class="text-red-400">categories</span><span class="text-gray-300">:</span> <span class="text-gray-300">[</span><span class="text-green-400">'jailbreak'</span><span class="text-gray-300">,</span> <span class="text-green-400">'instruction-hijack'</span><span class="text-gray-300">],</span>
  <span class="text-red-400">maxAttempts</span><span class="text-gray-300">:</span> <span class="text-purple-400">50</span>
<span class="text-gray-300">});</span>

<span class="text-gray-500">// Generate test cases</span>
<span class="text-blue-400">const</span> <span class="text-gray-300">testCases</span> <span class="text-blue-400">=</span> <span class="text-gray-300">injector.</span><span class="text-yellow-400">generateTests</span><span class="text-gray-300">(</span><span class="text-green-400">'customer-service-bot'</span><span class="text-gray-300">);</span>

<span class="text-gray-500">// Test your AI system</span>
<span class="text-blue-400">const</span> <span class="text-gray-300">results</span> <span class="text-blue-400">=</span> <span class="text-blue-400">await</span> <span class="text-gray-300">injector.</span><span class="text-yellow-400">runTests</span><span class="text-gray-300">(</span><span class="text-gray-300">yourAISystem</span><span class="text-gray-300">);</span>
<span class="text-blue-400">const</span> <span class="text-gray-300">report</span> <span class="text-blue-400">=</span> <span class="text-gray-300">injector.</span><span class="text-yellow-400">generateReport</span><span class="text-gray-300">(</span><span class="text-gray-300">results</span><span class="text-gray-300">);</span>

<span class="text-gray-300">console.</span><span class="text-yellow-400">log</span><span class="text-gray-300">(</span><span class="text-green-400">\`Risk Score: \${report.summary.riskScore}\`</span><span class="text-gray-300">);</span>`}</code></pre>
					</div>
				</Card>
			</div>

		{:else if currentView === 'patterns'}
			<!-- Patterns Browser -->
			<div class="space-y-6">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
						Attack Patterns Library
					</h2>
					
					<div class="flex gap-4">
						<!-- Search -->
						<input
							type="text"
							placeholder="Search patterns..."
							class="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							bind:value={searchQuery}
						/>
						
						<!-- Category Filter -->
						<select
							class="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							bind:value={selectedCategory}
						>
							<option value="all">All Categories</option>
							<option value="jailbreak">Jailbreaking</option>
							<option value="instruction-hijack">Instruction Hijacking</option>
							<option value="encoding">Encoding Attacks</option>
							<option value="logic-trap">Logic Traps</option>
						</select>
					</div>
				</div>

				<!-- Patterns Grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each filteredPatterns as pattern}
						<AttackPatternCard 
							{pattern} 
							onTest={testSinglePattern}
							onViewDetails={viewPatternDetails}
						/>
					{/each}
				</div>

				{#if filteredPatterns.length === 0}
					<div class="text-center py-12">
						<div class="text-6xl mb-4">🔍</div>
						<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
							No patterns found
						</h3>
						<p class="text-gray-600 dark:text-gray-400">
							Try adjusting your search terms or category filter.
						</p>
					</div>
				{/if}
			</div>

		{:else if currentView === 'generate'}
			<!-- Prompt Generation Configuration -->
			<div class="space-y-6">
				<div class="text-center mb-8">
					<h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
						Generate Test Prompts
					</h2>
					<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Configure your test parameters and generate ready-to-use prompt injection test cases. 
						Perfect for manual testing or integrating into your security workflows.
					</p>
				</div>

				<div class="max-w-4xl mx-auto">
					<ConfigurationPanel 
						{config} 
						onConfigChange={handleConfigChange}
						onGeneratePrompts={generateTestPrompts}
						{isGenerating}
					/>
				</div>
			</div>

		{:else if currentView === 'prompts'}
			<!-- Generated Prompts -->
			<div class="space-y-6">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
						Ready-to-Use Test Prompts
					</h2>
					<Button variant="secondary" onclick={generateTestPrompts}>
						Generate New Prompts
					</Button>
				</div>

				{#if generatedTestCases.length > 0}
					<GeneratedPrompts testCases={generatedTestCases} {config} />
				{:else}
					<Card>
						<div class="text-center py-12">
							<div class="text-6xl mb-4">📝</div>
							<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
								No prompts generated yet
							</h3>
							<p class="text-gray-600 dark:text-gray-400 mb-6">
								Configure and generate test prompts to get started with security testing.
							</p>
							<Button onclick={() => currentView = 'generate'}>
								Configure Generation
							</Button>
						</div>
					</Card>
				{/if}
			</div>
		{/if}
	</main>
</div>

<!-- Pattern Detail Modal -->
<AttackPatternDetail 
	pattern={selectedPattern} 
	onClose={closePatternDetails}
	onTest={testSinglePattern}
/>
