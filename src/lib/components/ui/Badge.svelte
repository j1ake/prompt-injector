<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
		size?: 'sm' | 'md';
		children: Snippet;
		class?: string;
	}

	let {
		variant = 'default',
		size = 'md',
		children,
		class: className = ''
	}: Props = $props();

	const baseClasses = 'inline-flex items-center font-medium rounded-full';

	const variants = {
		default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
		success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
		warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
		error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
		info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
	};

	const sizes = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-sm'
	};
</script>

<span class="{baseClasses} {variants[variant]} {sizes[size]} {className}">
	{@render children()}
</span>