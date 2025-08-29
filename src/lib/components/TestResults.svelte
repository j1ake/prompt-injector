<script lang="ts">
	import type { TestResult, RiskScore } from '$lib/index.js';
	import Card from './ui/Card.svelte';
	import Badge from './ui/Badge.svelte';

	interface Props {
		results: TestResult[];
		riskScore: RiskScore;
	}

	let { results, riskScore }: Props = $props();

	const riskColors = {
		low: 'success',
		medium: 'warning',
		high: 'error',
		critical: 'error',
		unknown: 'default'
	} as const;

	const riskIcons = {
		low: '🟢',
		medium: '🟡',
		high: '🔴',
		critical: '💀',
		unknown: '❓'
	} as const;

	const successfulAttacks = results.filter(r => r.evaluation.success);
	const blockedAttacks = results.filter(r => !r.evaluation.success && !r.error);
	const failedTests = results.filter(r => r.error);

	const averageConfidence = results.length > 0 
		? results.reduce((sum, r) => sum + r.evaluation.confidence, 0) / results.length 
		: 0;
</script>

<div class="space-y-6">
	<!-- Summary Card -->
	<Card>
		<div class="flex items-center justify-between mb-6">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
				Test Results
			</h2>
			<div class="flex items-center gap-2">
				<span class="text-2xl">{riskIcons[riskScore]}</span>
				<Badge variant={riskColors[riskScore]} size="md">
					{riskScore.toUpperCase()} RISK
				</Badge>
			</div>
		</div>

		<!-- Metrics Grid -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
			<div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
				<div class="text-2xl font-bold text-gray-900 dark:text-gray-100">
					{results.length}
				</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">
					Total Tests
				</div>
			</div>
			
			<div class="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
				<div class="text-2xl font-bold text-red-600 dark:text-red-400">
					{successfulAttacks.length}
				</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">
					Successful Attacks
				</div>
			</div>
			
			<div class="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
				<div class="text-2xl font-bold text-green-600 dark:text-green-400">
					{blockedAttacks.length}
				</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">
					Blocked Attacks
				</div>
			</div>
			
			<div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
				<div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
					{(averageConfidence * 100).toFixed(0)}%
				</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">
					Avg Confidence
				</div>
			</div>
		</div>

		<!-- Success Rate Progress Bar -->
		<div class="mb-6">
			<div class="flex justify-between items-center mb-2">
				<span class="text-sm font-medium text-gray-700 dark:text-gray-300">
					Attack Success Rate
				</span>
				<span class="text-sm font-bold text-red-600 dark:text-red-400">
					{((successfulAttacks.length / results.length) * 100).toFixed(1)}%
				</span>
			</div>
			<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
				<div 
					class="bg-red-500 h-3 rounded-full transition-all duration-500"
					style="width: {(successfulAttacks.length / results.length) * 100}%"
				></div>
			</div>
		</div>
	</Card>

	<!-- Detailed Results -->
	<Card>
		<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
			Detailed Results
		</h3>
		
		<div class="space-y-3 max-h-96 overflow-y-auto">
			{#each results as result}
				<div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<div class="flex-shrink-0">
						{#if result.error}
							<span class="text-xl">❌</span>
						{:else if result.evaluation.success}
							<span class="text-xl">🔓</span>
						{:else}
							<span class="text-xl">🔒</span>
						{/if}
					</div>
					
					<div class="flex-grow min-w-0">
						<div class="flex items-center gap-2 mb-1">
							<h4 class="font-medium text-gray-900 dark:text-gray-100 truncate">
								{result.testCase.pattern.name}
							</h4>
							<Badge 
								variant={result.evaluation.success ? 'error' : 'success'} 
								size="sm"
							>
								{result.evaluation.success ? 'BREACHED' : 'BLOCKED'}
							</Badge>
						</div>
						
						<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
							{result.evaluation.recommendation}
						</p>
						
						{#if result.evaluation.evidence.length > 0}
							<div class="text-xs text-gray-500 dark:text-gray-500">
								Evidence: {result.evaluation.evidence.join(', ')}
							</div>
						{/if}
					</div>
					
					<div class="text-right text-sm text-gray-500 dark:text-gray-500">
						{(result.evaluation.confidence * 100).toFixed(0)}%
					</div>
				</div>
			{/each}
		</div>
	</Card>
</div>