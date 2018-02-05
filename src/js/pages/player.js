import JsonStore from '../services/json-store';
import playerComponent from '../components/player';
import playlistSwitcherComponent from '../components/playlist-switcher';

const page = {
    template: `
        <div>
            <h1 v-if="invalidUrl">URL is invalid!</h1>
            <div v-if="broadcaster !== null">
                <div class="search-form">
                    <div class="search-form__static search-form__static--broadcaster" data-badge="Channel" v-if="broadcaster.meta.slug !== 'generic'">
                        <span class="search-form__static-content">
                            {{ broadcaster.meta.name }}
                        </span>
                    </div>
                    <div class="search-form__static search-form__static--show" data-badge="Series" v-if="broadcaster.meta.slug !== 'generic'">
                        <span class="search-form__static-content">
                            {{ show.name }}
                        </span>
                    </div>
                    <div class="search-form__static search-form__static--date" data-badge="Date">
                        <span class="search-form__static-content">
                            {{ formatDateTime(show.date)}}
                        </span>
                    </div>
                    <img src="/src/images/confetti.svg" class="search-form__background">
                </div>
                
                <div class="divider" data-text="watch the stream"></div>
               
                <div class="player">
                    <div class="player__video">
                        <player :streams="streams" :currentPlaylistIndex="currentPlaylistItem" @playlist-change="playerPlaylistChange" @resolutionChange="playerResolutionChange"></player>
                    </div>
                    <div v-if="streams.length > 1">
                        <div class="divider" data-text="or choose a sequence of it"></div>
                        <playlist-switcher :streams="streams" :currentIndex="currentPlaylistItem" @playlist-change="playerPlaylistChange"></playlist-switcher>
                    </div>
                </div>
                <div class="t-heading" v-if="this.streams.length === 1 && this.streams[0].hasOwnProperty('description') && this.streams[0].description != null &&  this.streams[0].description.length > 0">
                    <p>{{ this.streams[0].description }}</p>
                </div>
            </div>
        </div>
    `,
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$root.$emit('show-pulser');
            const id = this.$route.params.id;
            const jsonStore = new JsonStore();
            const playerCallback = (data) => {
                if (!data.hasOwnProperty('broadcaster') || !data.hasOwnProperty('show') || !data.hasOwnProperty('streams')) {
                    this.invalidUrl = true;
                    return;
                }
                this.broadcaster = data.broadcaster;
                this.show = data.show;
                this.streams = data.streams;
            };
            jsonStore.get(id, playerCallback)
        },
        formatDateTime: function (date) {
            return moment(date).format('llll');
        },
        formatDate: function(date) {
            return moment(date).format('llll');
        },
        playerPlaylistChange(currentPlaylistItem) {
            this.currentPlaylistItem = currentPlaylistItem;
        },
        playerResolutionChange(currentResolution) {
            this.currentResolution = currentResolution;
        },
        isPlayerReady() {
            return this.streams.hasOwnProperty('length') && this.streams.length > 0;
        }
    },
    watch: {
        '$route': function() {
            this.init();
        }
    },
    data() {
        return {
            streams: [],
            show: null,
            currentPlaylistItem: 0,
            currentResolution: {},
            broadcaster: null,
            player: null,
            isLoading: true,
            invalidUrl: false
        };
    },
    components: {
        'player': playerComponent,
        'playlist-switcher': playlistSwitcherComponent,
    }
};

export default page;