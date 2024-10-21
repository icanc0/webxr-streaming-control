<script lang="ts">
	import { T } from '@threlte/core'
	import { XR, Controller, Hand } from '@threlte/xr'
	import VideoStream from './VideoStream.svelte';

</script>

<VideoStream />

<!--<XR />-->

<Controller left />
<Controller right />
<Hand left />
<Hand right />