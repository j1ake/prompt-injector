<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#3b82f6" />
	
	<!-- Favicon -->
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	
	<!-- SEO Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Prompt Injector - AI Security Testing Library" />
	<meta property="og:description" content="Experimental TypeScript library for generating research-informed AI security test conversations. Built for defensive testing with proper citations." />
	<meta property="og:url" content="https://blueprintlabio.github.io/prompt-injector" />
	<meta property="og:site_name" content="Prompt Injector" />
	
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Prompt Injector - AI Security Testing Library" />
	<meta name="twitter:description" content="Generate research-informed prompt injection attack patterns for testing AI system defenses." />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://blueprintlabio.github.io/prompt-injector" />
	
	<!-- Preconnect to external domains -->
	<link rel="preconnect" href="https://github.com" />
	<link rel="preconnect" href="https://www.npmjs.com" />
</svelte:head>

{@render children?.()}
