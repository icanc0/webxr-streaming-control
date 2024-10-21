<script lang="ts">
	import { T } from '@threlte/core'
	import { HTML, OrbitControls } from '@threlte/extras'
	import { Color, MeshStandardMaterial, Texture } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils.js'
	import { onMount } from 'svelte';
	import Hls from 'hls.js';
	import { Root, Container, Text, Video, Image } from 'threlte-uikit'
	import { useTexture } from '@threlte/extras';
	import { useLoader } from '@threlte/core'
	const { load } = useLoader(TextureLoader)

	import { stream } from './store';
	import { TextureLoader } from 'three'

	const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
	let picture: Texture;
	let material = new MeshStandardMaterial({
		color: new Color(getRandomColor())
	})


		setInterval(async () => {
			console.log("Reloading picture");
			try {
				picture = await load(`https://192.168.0.254/snapshot?topic=/image&t=${Date.now()}`);
			} catch (error) {
				console.error("Error loading texture:", error);
			}
		}, 33.33);


</script>



<T.PerspectiveCamera
	makeDefault
	position={[0, 1.8, 1]}
	on:create={({ ref }) => ref.lookAt(0, 1.8, 0)}
>
	<OrbitControls
		target.y={0.75}
		maxPolarAngle={85 * DEG2RAD}
		minPolarAngle={20 * DEG2RAD}
		maxAzimuthAngle={45 * DEG2RAD}
		minAzimuthAngle={-45 * DEG2RAD}
		enableZoom={false}
	/>
</T.PerspectiveCamera>


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

<!--			<Video src={$stream} autoplay />-->
<!--			<Video src="https://192.168.0.254/stream?topic=/image&type=mjpeg" autoplay />-->
				<Image bind:src={picture} height={100} />
			<Text text="sdjfijsofdjifsodfjs"></Text>

		</Container>
	</Root>
</T.Group>