<script lang="ts">
	import type { TestCase } from '$lib/types.js';
	import Card from './ui/Card.svelte';
	import Button from './ui/Button.svelte';

	interface Props {
		testCases: TestCase[];
		config: any & { injectionGoals?: string[] };
	}

	let { testCases, config }: Props = $props();

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			// Could add a toast notification here
		});
	}

	function copyAllPrompts() {
		const allPrompts = testCases.map((tc, index) => 
			`# ${index + 1}. ${tc.pattern.name} (${tc.pattern.category})\n\n${tc.prompt}\n\n---\n`
		).join('\n');
		
		copyToClipboard(allPrompts);
	}

	const categoryIcons = {
		'jailbreak': '🎭',
		'instruction-hijack': '🔀',
		'encoding': '🔐',
		'logic-trap': '🧠'
	} as const;

	const severityColors = {
		basic: 'bg-blue-100 text-blue-800',
		intermediate: 'bg-yellow-100 text-yellow-800', 
		advanced: 'bg-orange-100 text-orange-800',
		expert: 'bg-red-100 text-red-800'
	} as const;
</script>

<div class="space-y-6">
	<!-- Header -->
	<Card>
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
				Generated Test Prompts
			</h2>
			<Button onclick={copyAllPrompts}>
				📋 Copy All Prompts
			</Button>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
			<div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
				<div class="font-semibold text-gray-900 dark:text-gray-100">
					{testCases.length}
				</div>
				<div class="text-gray-600 dark:text-gray-400">
					Total Prompts
				</div>
			</div>
			<div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
				<div class="font-semibold text-gray-900 dark:text-gray-100">
					{config.severity}
				</div>
				<div class="text-gray-600 dark:text-gray-400">
					Max Severity
				</div>
			</div>
			<div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
				<div class="font-semibold text-gray-900 dark:text-gray-100">
					{config.categories.length}
				</div>
				<div class="text-gray-600 dark:text-gray-400">
					Categories
				</div>
			</div>
			<div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
				<div class="font-semibold text-gray-900 dark:text-gray-100">
					{(config.injectionGoals || []).length}
				</div>
				<div class="text-gray-600 dark:text-gray-400">
					Injection Goals
				</div>
			</div>
		</div>
	</Card>

	<!-- Usage Instructions -->
	<Card class="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
		<div class="flex items-start gap-4">
			<div class="text-2xl">💡</div>
			<div>
				<h4 class="font-semibold text-blue-900 dark:text-blue-200 mb-2">
					How to Use These Prompts
				</h4>
				<div class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
					<p>• <strong>Copy individual prompts</strong> using the copy button on each card</p>
					<p>• <strong>Test against your AI system</strong> to evaluate security responses</p>
					<p>• <strong>Monitor for signs of injection success</strong> listed in each pattern's criteria</p>
					{#if (config.injectionGoals || []).length > 0}
						<p>• <strong>Check for goal-specific responses</strong> - prompts include {(config.injectionGoals || []).length} injection goals</p>
					{/if}
					<p>• <strong>Use responsibly</strong> - only test systems you own or have permission to test</p>
				</div>
			</div>
		</div>
	</Card>

	<!-- Generated Prompts -->
	<div class="grid gap-4">
		{#each testCases as testCase, index}
			<Card>
				<div class="space-y-4">
					<!-- Header -->
					<div class="flex items-start justify-between">
						<div class="flex items-center gap-3">
							<div class="text-2xl">{categoryIcons[testCase.pattern.category]}</div>
							<div>
								<h3 class="font-semibold text-gray-900 dark:text-gray-100 text-lg">
									{index + 1}. {testCase.pattern.name}
								</h3>
								<div class="flex items-center gap-2 mt-1">
									<span class="text-sm text-gray-600 dark:text-gray-400 capitalize">
										{testCase.pattern.category.replace('-', ' ')}
									</span>
									<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium {severityColors[testCase.pattern.severity]}">
										{testCase.pattern.severity}
									</span>
								</div>
							</div>
						</div>
						<Button variant="ghost" size="sm" onclick={() => copyToClipboard(testCase.prompt)}>
							📋
						</Button>
					</div>

					<!-- Description -->
					<p class="text-sm text-gray-600 dark:text-gray-400">
						{testCase.pattern.description}
					</p>

					<!-- Prompt -->
					<div class="relative">
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
							<pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">{testCase.prompt}</pre>
						</div>
					</div>

					<!-- Success Criteria -->
					<div>
						<div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
							WATCH FOR THESE SIGNS OF SUCCESSFUL INJECTION:
						</div>
						<div class="flex flex-wrap gap-2">
							{#each testCase.pattern.successCriteria as criteria}
								<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
									{criteria}
								</span>
							{/each}
						</div>
					</div>
				</div>
			</Card>
		{/each}
	</div>
</div>

<style>
	pre::-webkit-scrollbar {
		height: 6px;
	}
	
	pre::-webkit-scrollbar-track {
		background: #e5e7eb;
		border-radius: 3px;
	}
	
	pre::-webkit-scrollbar-thumb {
		background: #d1d5db;
		border-radius: 3px;
	}
	
	:global(.dark) pre::-webkit-scrollbar-track {
		background: #374151;
	}
	
	:global(.dark) pre::-webkit-scrollbar-thumb {
		background: #6b7280;
	}
</style>