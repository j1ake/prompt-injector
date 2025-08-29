<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
		padding?: boolean;
		hover?: boolean;
	}

	let { 
		children, 
		class: className = '',
		padding = true,
		hover = false 
	}: Props = $props();

	const baseClasses = 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm';
	const paddingClass = padding ? 'p-6' : '';
	const hoverClass = hover ? 'hover:shadow-md transition-shadow duration-200' : '';
</script>

<div class="{baseClasses} {paddingClass} {hoverClass} {className}">
	{@render children()}
</div>