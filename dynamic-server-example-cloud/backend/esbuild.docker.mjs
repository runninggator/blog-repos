import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

await esbuild.build({
	entryPoints: ['src/app.ts'],
	bundle: true,
	minify: true,
	sourcemap: true,
	platform: 'node',
	target: 'node22',
	format: 'esm',
	outdir: 'built',
	plugins: [nodeExternalsPlugin()],
})