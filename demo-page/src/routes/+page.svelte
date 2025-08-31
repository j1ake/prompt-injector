<script lang="ts">
	import { PromptInjector } from '@blueprintlabio/prompt-injector';
	import { onMount } from 'svelte';
	
	let injector: any = null;
	let conversation: any = null;
	let loading = false;
	let selectedStrategy = 'roleplay';
	let selectedGoal = 'Extract system prompt';
	let maxTurns = 3;
	let customGoal = '';
	
	const predefinedGoals = [
		'Extract system prompt',
		'Bypass content safety filters',
		'Access unauthorized functions',
		'Generate harmful content',
		'Extract user information'
	];
	
	const strategies = [
		{ id: 'roleplay', name: 'Roleplay', description: 'Character impersonation and responsibility deflection' },
		{ id: 'gradual', name: 'Gradual', description: 'Multi-turn trust building approach' },
		{ id: 'obfuscated', name: 'Obfuscated', description: 'Encoding and character manipulation techniques' },
		{ id: 'direct', name: 'Direct', description: 'Fast attacks for rapid testing' }
	];
	
	let availablePrimitives: string[] = [];
	
	onMount(async () => {
		try {
			// Import the library from the core build
			injector = new PromptInjector();
			availablePrimitives = injector.listPrimitives();
		} catch (error) {
			console.error('Failed to load Prompt Injector library:', error);
		}
	});
	
	async function generateConversation() {
		if (!injector) return;
		
		loading = true;
		try {
			const goal = customGoal.trim() || selectedGoal;
			conversation = injector.generateConversation(goal, {
				strategy: selectedStrategy,
				maxTurns: maxTurns
			});
		} catch (error) {
			console.error('Error generating conversation:', error);
		} finally {
			loading = false;
		}
	}
	
	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}
</script>

<svelte:head>
	<title>Prompt Injector - AI Security Testing Library</title>
	<meta name="description" content="Experimental TypeScript library for generating AI security test conversations">
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center space-x-3">
					<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-sm">🎯</span>
					</div>
					<div>
						<h1 class="text-xl font-semibold text-gray-900">Prompt Injector</h1>
						<p class="text-xs text-gray-500">v0.1.0 Experimental</p>
					</div>
				</div>
				
				<div class="flex items-center space-x-4">
					<a 
						href="https://github.com/BlueprintLabIO/prompt-injector" 
						class="text-gray-600 hover:text-gray-900 transition-colors"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="View GitHub Repository"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
						</svg>
					</a>
					<a 
						href="https://www.npmjs.com/package/@blueprintlabio/prompt-injector" 
						class="text-gray-600 hover:text-gray-900 transition-colors"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="View npm Package"
					>
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Hero Section -->
		<div class="text-center mb-12">
			<div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mb-4">
				⚠️ Experimental Software - Defensive Testing Only
			</div>
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
				Generate Prompt Injection Attacks
			</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
				Research-informed multi-turn prompt injection attack patterns for testing AI system defenses.
			</p>
			
			<!-- Quick Stats -->
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
				<div class="bg-white p-4 rounded-lg border border-gray-200">
					<div class="text-2xl font-bold text-blue-600">{availablePrimitives.length}</div>
					<div class="text-sm text-gray-600">Built-in Primitives</div>
				</div>
				<div class="bg-white p-4 rounded-lg border border-gray-200">
					<div class="text-2xl font-bold text-green-600">4</div>
					<div class="text-sm text-gray-600">Attack Strategies</div>
				</div>
				<div class="bg-white p-4 rounded-lg border border-gray-200">
					<div class="text-2xl font-bold text-purple-600">0</div>
					<div class="text-sm text-gray-600">Dependencies</div>
				</div>
				<div class="bg-white p-4 rounded-lg border border-gray-200">
					<div class="text-2xl font-bold text-orange-600">&lt;40KB</div>
					<div class="text-sm text-gray-600">Bundle Size</div>
				</div>
			</div>
		</div>

		<!-- Interactive Demo -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
			<div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
				<h3 class="text-lg font-semibold text-gray-900">Interactive Demo</h3>
				<p class="text-sm text-gray-600 mt-1">Generate attack conversations for testing your AI systems</p>
			</div>
			
			<div class="p-6">
				<!-- Configuration -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
					<div class="space-y-4">
						<div>
							<label for="goal-select" class="block text-sm font-medium text-gray-700 mb-2">Attack Goal</label>
							<select id="goal-select" bind:value={selectedGoal} class="w-full rounded-lg border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
								{#each predefinedGoals as goal}
									<option value={goal}>{goal}</option>
								{/each}
							</select>
							<input 
								id="custom-goal"
								bind:value={customGoal}
								placeholder="Or enter custom goal..."
								aria-label="Custom attack goal"
								class="w-full mt-2 rounded-lg border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							>
						</div>
						
						<div>
							<label for="turns-range" class="block text-sm font-medium text-gray-700 mb-2">Max Turns</label>
							<input 
								id="turns-range"
								type="range" 
								min="1" 
								max="6" 
								bind:value={maxTurns}
								aria-label="Maximum number of conversation turns"
								class="w-full"
							>
							<div class="text-sm text-gray-600">{maxTurns} turns</div>
						</div>
					</div>
					
					<div>
						<fieldset>
							<legend class="block text-sm font-medium text-gray-700 mb-2">Attack Strategy</legend>
							<div class="space-y-2">
								{#each strategies as strategy}
									<label class="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
										<input 
											type="radio" 
											bind:group={selectedStrategy} 
											value={strategy.id}
											name="strategy"
											class="mt-1 text-blue-600"
										>
										<div class="flex-1 min-w-0">
											<div class="text-sm font-medium text-gray-900">{strategy.name}</div>
											<div class="text-xs text-gray-600">{strategy.description}</div>
										</div>
									</label>
								{/each}
							</div>
						</fieldset>
					</div>
				</div>
				
				<!-- Generate Button -->
				<div class="flex justify-center mb-6">
					<button 
						on:click={generateConversation}
						disabled={loading || !injector}
						class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{#if loading}
							<div class="flex items-center space-x-2">
								<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								<span>Generating...</span>
							</div>
						{:else}
							Generate Attack Conversation
						{/if}
					</button>
				</div>
				
				<!-- Results -->
				{#if conversation}
					<div class="bg-gray-50 rounded-lg p-6">
						<div class="flex items-center justify-between mb-4">
							<h4 class="text-lg font-semibold text-gray-900">Generated Conversation</h4>
							<div class="text-sm text-gray-600">
								Strategy: <span class="font-medium">{conversation.strategy}</span> • 
								{conversation.turns.length} turns
							</div>
						</div>
						
						<!-- Research Context -->
						<div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
							<h5 class="text-sm font-medium text-blue-900 mb-2">Research Context</h5>
							<div class="text-sm text-blue-800">
								{conversation.metadata.researchBasis.join('; ')}
							</div>
						</div>
						
						<!-- Conversation Turns -->
						<div class="space-y-4">
							{#each conversation.turns as turn}
								<div class="bg-white rounded-lg p-4 border border-gray-200">
									<div class="flex items-center justify-between mb-2">
										<div class="text-sm font-medium text-gray-900">
											Turn {turn.turnNumber}
										</div>
										<div class="flex items-center space-x-2">
											<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
												{turn.primitive}
											</span>
											{#if turn.technique}
												<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
													{turn.technique}
												</span>
											{/if}
											<button 
												on:click={() => copyToClipboard(turn.message)}
												class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
												aria-label="Copy message to clipboard"
												title="Copy to clipboard"
											>
												<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
												</svg>
											</button>
										</div>
									</div>
									<div class="text-sm text-gray-700 bg-gray-50 p-3 rounded font-mono">
										{turn.message}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Research Citations -->
		<div class="mt-12 bg-white rounded-xl shadow-sm border border-gray-200">
			<div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
				<h3 class="text-lg font-semibold text-gray-900">Research Foundation</h3>
				<p class="text-sm text-gray-600 mt-1">Academic citations and research backing</p>
			</div>
			<div class="p-6">
				<div class="prose prose-sm max-w-none">
					<h4 class="text-base font-semibold text-gray-900 mb-4">Primary Research Sources</h4>
					<div class="space-y-4 text-sm text-gray-700">
						<div class="border-l-4 border-blue-200 pl-4">
							<strong>FlipAttack Character Manipulation:</strong><br>
							Liu, Y., He, X., Xiong, M., Fu, J., Deng, S., & Hooi, B. (2024). <em>FlipAttack: Jailbreak LLMs via Flipping</em>. arXiv preprint arXiv:2410.02832.
						</div>
						<div class="border-l-4 border-green-200 pl-4">
							<strong>Mozilla Hexadecimal Encoding Research:</strong><br>
							Figueroa, M. (2024). <em>ChatGPT-4o Guardrail Jailbreak: Hex Encoding for Writing CVE Exploits</em>. Mozilla 0Din Platform Research.
						</div>
						<div class="border-l-4 border-purple-200 pl-4">
							<strong>Multi-turn Attack Patterns:</strong><br>
							Research documented in "Red Teaming the Mind of the Machine: A Systematic Evaluation of Prompt Injection and Jailbreak Vulnerabilities in LLMs"
						</div>
						<div class="border-l-4 border-orange-200 pl-4">
							<strong>Base64 Encoding Defense Research:</strong><br>
							<em>Defense against Prompt Injection Attacks via Mixture of Encodings</em>. arXiv preprint arXiv:2504.07467.
						</div>
						<div class="border-l-4 border-red-200 pl-4">
							<strong>OWASP GenAI Security Classification:</strong><br>
							OWASP LLM Top 10 2025 - Prompt Injection ranked as #1 AI security risk.
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Installation & Usage -->
		<div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
			<div class="bg-white rounded-xl shadow-sm border border-gray-200">
				<div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
					<h3 class="text-lg font-semibold text-gray-900">Quick Installation</h3>
				</div>
				<div class="p-6">
					<div class="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 mb-4">
						<div class="text-green-400"># Install via npm</div>
						<div>npm install @blueprintlabio/prompt-injector</div>
					</div>
					<div class="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
						<div class="text-green-400">// Basic usage</div>
						<div><span class="text-blue-400">import</span> &#123; PromptInjector &#125; <span class="text-blue-400">from</span> <span class="text-yellow-400">'@blueprintlabio/prompt-injector'</span>;</div>
						<div class="mt-2"><span class="text-blue-400">const</span> injector = <span class="text-blue-400">new</span> PromptInjector();</div>
						<div><span class="text-blue-400">const</span> conversation = injector.generateConversation(</div>
						<div class="ml-4"><span class="text-yellow-400">"Extract system prompt"</span>,</div>
						<div class="ml-4">&#123; strategy: <span class="text-yellow-400">'roleplay'</span>, maxTurns: <span class="text-purple-400">3</span> &#125;</div>
						<div>);</div>
					</div>
				</div>
			</div>
			
			<div class="bg-white rounded-xl shadow-sm border border-gray-200">
				<div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
					<h3 class="text-lg font-semibold text-gray-900">Responsible Use</h3>
				</div>
				<div class="p-6 space-y-4">
					<div class="flex items-start space-x-3">
						<div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
							<svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
						</div>
						<div class="text-sm text-gray-700">
							<div class="font-medium">Appropriate Use:</div>
							<div>Testing AI systems you own or have permission to test</div>
						</div>
					</div>
					<div class="flex items-start space-x-3">
						<div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
							<svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
						</div>
						<div class="text-sm text-gray-700">
							<div class="font-medium">Security Research:</div>
							<div>Educational demonstrations and academic research</div>
						</div>
					</div>
					<div class="flex items-start space-x-3">
						<div class="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
							<svg class="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
							</svg>
						</div>
						<div class="text-sm text-gray-700">
							<div class="font-medium">Inappropriate Use:</div>
							<div>Attacking systems without authorization or malicious exploitation</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="bg-white border-t border-gray-200 mt-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div class="flex flex-col items-center justify-center space-y-4">
				<div class="flex items-center space-x-6">
					<a 
						href="https://github.com/BlueprintLabIO/prompt-injector" 
						class="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub Repository
					</a>
					<a 
						href="https://www.npmjs.com/package/@blueprintlabio/prompt-injector" 
						class="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
						target="_blank"
						rel="noopener noreferrer"
					>
						npm Package
					</a>
					<a 
						href="https://github.com/BlueprintLabIO/prompt-injector/blob/main/docs/api.md" 
						class="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
						target="_blank"
						rel="noopener noreferrer"
					>
						Documentation
					</a>
				</div>
				<div class="text-center">
					<p class="text-sm text-gray-600">
						Built with ❤️ by BlueprintLab • MIT License
					</p>
					<p class="text-xs text-gray-500 mt-1">
						⚠️ Experimental software for defensive security testing only
					</p>
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	/* Custom scrollbar for webkit browsers */
	:global(::-webkit-scrollbar) {
		width: 6px;
	}
	
	:global(::-webkit-scrollbar-track) {
		background: #f1f5f9;
	}
	
	:global(::-webkit-scrollbar-thumb) {
		background: #cbd5e1;
		border-radius: 3px;
	}
	
	:global(::-webkit-scrollbar-thumb:hover) {
		background: #94a3b8;
	}
</style>