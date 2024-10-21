<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { ARButton } from '@threlte/xr';
	import { onMount } from 'svelte';
	import Hls from 'hls.js';
	import { stream } from './store';

	let videoElement: HTMLVideoElement;
	// const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
	const videoSrc = 'https://192.168.0.254/stream?topic=/image';
	onMount(() => {
		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(videoSrc);
			hls.attachMedia(videoElement);
			hls.on(Hls.Events.MANIFEST_PARSED, () =>  videoElement.play())

		} else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
			videoElement.crossOrigin = 'anonymous';
			videoElement.src = videoSrc;
			videoElement.play();
		}
		stream.set(videoElement);
	});

	// $: if ($stream) {
	// 	stream.set(videoElement);
	// }
</script>

	<Canvas>
		<Scene />
	</Canvas>

<ARButton />

<video bind:this={videoElement} width="320" height="240" controls autoplay muted>
	Your browser does not support HLS video streaming.
</video>