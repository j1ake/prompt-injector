<script lang="ts">
	import type { AttackPattern } from '$core/types.js';
	import Card from './ui/Card.svelte';
	import Badge from './ui/Badge.svelte';
	import Button from './ui/Button.svelte';

	interface Props {
		pattern: AttackPattern;
		onTest?: (pattern: AttackPattern) => void;
		onViewDetails?: (pattern: AttackPattern) => void;
	}

	let { pattern, onTest, onViewDetails }: Props = $props();

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

<Card hover class="h-full">
	<div class="flex items-start justify-between mb-4">
		<div class="flex items-center gap-3">
			<div class="text-2xl">{categoryIcons[pattern.category]}</div>
			<div>
				<h3 class="font-semibold text-gray-900 dark:text-gray-100 text-lg">
					{pattern.name}
				</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400 capitalize">
					{pattern.category.replace('-', ' ')}
				</p>
			</div>
		</div>
		<Badge variant={severityColors[pattern.severity]} size="sm">
			{pattern.severity}
		</Badge>
	</div>

	<p class="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
		{pattern.description}
	</p>

	<div class="mb-4">
		<div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
			SUCCESS CRITERIA
		</div>
		<ul class="space-y-1">
			{#each pattern.successCriteria.slice(0, 2) as criteria}
				<li class="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
					<span class="text-blue-500 mt-0.5">•</span>
					{criteria}
				</li>
			{/each}
			{#if pattern.successCriteria.length > 2}
				<li class="text-xs text-gray-500 dark:text-gray-500">
					+{pattern.successCriteria.length - 2} more criteria
				</li>
			{/if}
		</ul>
	</div>

	<div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
		<div class="text-xs text-gray-500 dark:text-gray-400">
			Source: {pattern.source}
		</div>
		<div class="flex gap-2">
			<Button variant="ghost" size="sm" onclick={() => onViewDetails?.(pattern)}>
				View
			</Button>
			<Button size="sm" onclick={() => onTest?.(pattern)}>
				Test
			</Button>
		</div>
	</div>
</Card>