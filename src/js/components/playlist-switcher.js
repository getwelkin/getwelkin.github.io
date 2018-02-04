const component = {
    props: ['streams', 'currentIndex'],
    template: `
        <div class="player__playlist playlist"  v-if="this.streams.length > 1">
            <li v-for="i in range(0, streams.length-1)" :class="{ 'playlist__item--active': currentIndex == i, 'playlist__item': true }" @click="playlistChange(i)">
                <h3 class="playlist__item-title">{{ streams[i].title }}</h3>
                <div class="playlist__item-description" v-show="streams[i].description !== null && streams[i].description.hasOwnProperty('length') ? streams[i].description.length > 0 : false">
                    {{ streams[i].description }}
                </div>                        
            </li>
        </div>
    `,
    methods: {
        playlistChange(index) {
            this.$emit('playlist-change', index);
        },
        range(min, max) {
            let array = [], j = 0;
            for (let i = min; i <= max; i++) {
                array[j] = i;
                j++;
            }
            return array;
        },
    }
};

module.exports = component;