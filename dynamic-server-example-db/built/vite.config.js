import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig(() => {
    return {
        plugins: [vue()],
        build: {
            outDir: 'public'
        }
    };
});
//# sourceMappingURL=vite.config.js.map