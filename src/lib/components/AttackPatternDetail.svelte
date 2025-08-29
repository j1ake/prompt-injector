<script lang="ts">
	import type { AttackPattern } from '$lib/types.js';
	import Card from './ui/Card.svelte';
	import Badge from './ui/Badge.svelte';
	import Button from './ui/Button.svelte';

	interface Props {
		pattern: AttackPattern | null;
		onClose: () => void;
		onTest?: (pattern: AttackPattern) => void;
	}

	let { pattern, onClose, onTest }: Props = $props();

	const severityColors = {
		basic: 'info',
		intermediate: 'warning', 
		advanced: 'error',
		expert: 'error'
	} as const;

	const categoryIcons = {
		'jailbreak': '🎭',
		'instruction-hijack': '🔀', 
		'encoding': '🔐',
		'logic-trap': '🧠'
	} as const;
</script>

{#if pattern}
	<!-- Modal Overlay -->
	<div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4" on:click={onClose}>
		<div class="w-full max-w-4xl max-h-[90vh] overflow-auto" on:click|stopPropagation>
			<Card class="max-w-none">
				<!-- Header -->
				<div class="flex items-start justify-between mb-6">
					<div class="flex items-center gap-4">
						<div class="text-3xl">{categoryIcons[pattern.category]}</div>
						<div>
							<h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
								{pattern.name}
							</h2>
							<div class="flex items-center gap-3 mt-2">
								<Badge variant={severityColors[pattern.severity]}>
									{pattern.severity.toUpperCase()}
								</Badge>
								<span class="text-sm text-gray-600 dark:text-gray-400 capitalize">
									{pattern.category.replace('-', ' ')}
								</span>
								<span class="text-sm text-gray-500 dark:text-gray-500">
									ID: {pattern.id}
								</span>
							</div>
						</div>
					</div>
					<Button variant="ghost" size="sm" onclick={onClose}>
						✕
					</Button>
				</div>

				<!-- Description -->
				<div class="mb-6">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
						Description
					</h3>
					<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
						{pattern.description}
					</p>
				</div>

				<!-- Attack Prompt -->
				<div class="mb-6">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
						Attack Prompt Template
					</h3>
					<div class="relative">
						<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-sm overflow-x-auto text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">{pattern.prompt}</pre>
						<button
							class="absolute top-3 right-3 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
							on:click={() => navigator.clipboard.writeText(pattern.prompt)}
							title="Copy to clipboard"
						>
							📋
						</button>
					</div>
				</div>

				<!-- Variables -->
				{#if pattern.variables && Object.keys(pattern.variables).length > 0}
					<div class="mb-6">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
							Template Variables
						</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							{#each Object.entries(pattern.variables) as [key, value]}
								<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
									<div class="font-medium text-blue-900 dark:text-blue-200 text-sm mb-1">
										{`{${key}}`}
									</div>
									<div class="text-sm text-blue-700 dark:text-blue-300">
										{value}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Success Criteria -->
				<div class="mb-6">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
						Success Criteria
					</h3>
					<ul class="space-y-2">
						{#each pattern.successCriteria as criteria, index}
							<li class="flex items-start gap-3">
								<span class="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium flex items-center justify-center mt-0.5">
									{index + 1}
								</span>
								<span class="text-gray-700 dark:text-gray-300">
									{criteria}
								</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Source & Actions -->
				<div class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
					<div class="text-sm text-gray-600 dark:text-gray-400">
						<strong>Source:</strong> {pattern.source}
					</div>
					<div class="flex gap-3">
						<Button variant="secondary" onclick={onClose}>
							Close
						</Button>
						{#if onTest}
							<Button onclick={() => onTest?.(pattern)}>
								Run Test
							</Button>
						{/if}
					</div>
				</div>
			</Card>
		</div>
	</div>
{/if}

<style>
	/* Custom scrollbar for the modal */
	:global(.dark) pre::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	
	:global(.dark) pre::-webkit-scrollbar-track {
		background: #374151;
		border-radius: 4px;
	}
	
	:global(.dark) pre::-webkit-scrollbar-thumb {
		background: #6b7280;
		border-radius: 4px;
	}
	
	:global(.dark) pre::-webkit-scrollbar-thumb:hover {
		background: #9ca3af;
	}

	pre::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	
	pre::-webkit-scrollbar-track {
		background: #e5e7eb;
		border-radius: 4px;
	}
	
	pre::-webkit-scrollbar-thumb {
		background: #d1d5db;
		border-radius: 4px;
	}
	
	pre::-webkit-scrollbar-thumb:hover {
		background: #9ca3af;
	}
</style>