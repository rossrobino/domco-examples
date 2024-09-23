<script setup></script>

<template>
	<h1>Vue</h1>
	<nav>
		<ul>
			<li><RouterLink to="/">Home</RouterLink></li>
			<li><RouterLink to="/counter">Counter</RouterLink></li>
		</ul>
	</nav>
	<RouterView />
</template>
