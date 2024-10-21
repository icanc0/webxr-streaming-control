<script lang="ts">
	import { T } from '@threlte/core'
	import { HTML, OrbitControls } from '@threlte/extras'
	import { Color, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils.js'
	import { onMount } from 'svelte';
	import Hls from 'hls.js';
	import { Root, Container, Text, Video, Image } from 'threlte-uikit'
	import { stream } from './store';

	const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

	let material = new MeshStandardMaterial({
		color: new Color(getRandomColor())
	})


</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 1.8, 1]}
	on:create={({ ref }) => ref.lookAt(0, 1.8, 0)}
/>

<T.DirectionalLight position={[0, 10, 10]} />

<T.AmbientLight intensity={0.3} />

<T.GridHelper />

<T.Mesh
	position={[0, 1, 1]}
	{material}
>
	<T.SphereGeometry args={[0.1]} />

</T.Mesh>

<T.Group position.z={-1.5} position.y={1}>
	<Root
	backgroundColor="ccc"
	>
		<Container flexDirection="column">

			<Video src={$stream} autoplay />
			<Text text="sdjfijsofdjifsodfjs"></Text>
			<Image src="https://192.168.0.254/stream?topic=/image&type=mjpeg" height={100} />

		</Container>
	</Root>
</T.Group>