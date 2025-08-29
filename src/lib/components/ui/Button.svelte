<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		onclick?: () => void;
		children: Snippet;
		class?: string;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		onclick,
		children,
		class: className = ''
	}: Props = $props();

	const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

	const variants = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
		secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 active:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
		destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
		ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm h-8',
		md: 'px-4 py-2 text-sm h-10',
		lg: 'px-6 py-3 text-base h-12'
	};
</script>

<button
	class="{baseClasses} {variants[variant]} {sizes[size]} {className}"
	{disabled}
	on:click={onclick}
>
	{#if loading}
		<svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	{/if}
	{@render children()}
</button>