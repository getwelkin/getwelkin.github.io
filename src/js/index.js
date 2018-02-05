import indexPage from './pages/index';
import playerPage from './pages/player';
import loadingPulser from './components/loading-pulser';

const routes = [
    {path: '/', component: indexPage},
    {path: '/v/:id', component: playerPage}
];

const router = new VueRouter({routes,  mode: 'history'});

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
        this.$root.$on('show-pulser', () => {
            this.showPulser = true;
        });
        this.$root.$on('hide-pulser', () => {
            this.showPulser = false;
        });
    },
    methods: {
    }
});