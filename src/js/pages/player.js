import JsonStore from '../services/json-store';

const page = {
    template: `
        <div>
            <h1>Player</h1>
            <pre>{{ data }}</pre>
        </div>
         
    `,
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const id = this.$route.params.id;
            const jsonStore = new JsonStore();
            const playerCallback = (data) => {
                this.data = data;
            };
            jsonStore.get(id, playerCallback)
        }
    },
    watch: {
        '$route': function() {
            this.init();
        }
    },
    data() {
        return {
            data: null
        };
    }

};

export default page;