import indexPage from './pages/index';
import playerPage from './page/player';

const routes = [
    {path: '/', component: indexPage},
    {path: '/broadcasters/:slug', component: playerPage}
];


const app = new Vue({
    el: '#app',
    router,
    data: {
        showPulser: false,
        initialized: false,
    },
    components: {
        'loading-pulser': loadingPulser,
    },
    mounted() {
        this.initialized = true;
    },
    methods: {
    }
});