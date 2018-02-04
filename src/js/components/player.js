const component = {
    props: ['streams', 'currentPlaylistIndex'],
    template: `
        <div ref="container">
        
        </div>
    `,
    data() {
        return {
            player: null,
            isPipEnabled: false,
            hasPipComponentRegistered: false,
        };
    },
    watch: {
        'streams': function (streams) {
            this.init(streams);
        },
        'currentPlaylistIndex': function (currentPlaylistItem) {
            this.player.updateSrc(this.player.playlist()[currentPlaylistItem].sources)
        }
    },
    methods: {
        mounted() {
            this.init(this.streams);
        },
        init(streams) {
            if (this.player !== null) {
                try {
                    this.player.dispose();
                } catch(err) {
                    console.error(err);
                }

            }
            if (streams.length < 1) {
                // do nothing if there are no streams
                return;
            }
            this.$refs.container.innerHTML = `<video id="player" ref="player" class="video-js vjs-default-skin vjs-skin-welkin" controls></video>`;
            const $player = document.querySelector('#player');
            this.player = this.initPlayer($player);
            this.registerPipComponent();
            this.attachPlaylist(streams);
            this.player.getChild('controlBar').addChild('pip-button', {});
            this.bindEvents();
            this.player.videoJsResolutionSwitcher();
            this.player.play();
        },
        initPlayer($player) {
            const options = {
                "autoplay": true,
                "dynamicLabel": true,
                "aspectRatio": "16:9",
                "controlBar": {"volumeMenuButton": {"inline": false, "vertical": true}},
            };
            return videojs($player, options);
        },
        attachPlaylist(streams) {
            const playlist = this.buildPlaylist(streams);
            this.player.playlist(playlist);
            this.player.playlist.autoadvance(0);
        },
        bindEvents() {
            this.player.on('playlistitem', () => {
                const currentPlaylistIndex = this.playlistChange();
                this.$emit('playlist-change', currentPlaylistIndex);
            });
            this.player.on('resolutionchange', () => {
                this.resolutionChange();
            });
        },
        registerPipComponent() {
            if (this.hasPipComponentRegistered) {
                return false;
            }
            this.hasPipComponentRegistered = true;
            const vjsButtonComponent = videojs.getComponent('Button');
            const vjsPipButtonComponent = videojs.extend(vjsButtonComponent, {
                constructor: function () {
                    vjsButtonComponent.apply(this, arguments);
                    this.addClass('vjs-welkin-pip');
                    this.el_.innerHTML = '<i class="far fa-reply"></i>';
                },
                handleClick: () => {
                    if (this.isPipEnabled === false) {
                        app.$emit('pip-enable');
                        this.isPipEnabled = true;
                    } else {
                        app.$emit('pip-disable');
                        this.isPipEnabled = false;
                    }
                }
            });
            videojs.registerComponent('pip-button', vjsPipButtonComponent);
        },
        buildPlaylist(streams) {
            let playlist = [];
            for (let i in streams) {
                if (streams.hasOwnProperty(i)) {
                    let playlistItem = {
                        sources: []
                    };
                    for (let j in streams[i].videos) {
                        if (streams[i].videos.hasOwnProperty(j)) {
                            playlistItem.sources.push({
                                src: streams[i].videos[j].url,
                                type: streams[i].videos[j].type,
                                label: streams[i].videos[j].format,
                            });
                        }
                    }
                    playlist.push(playlistItem);
                }
            }
            return playlist;
        },
        playlistChange() {
            const currentIndex = this.player.playlist.currentIndex();
            this.player.updateSrc(this.player.playlist()[currentIndex].sources);
            this.player.videoJsResolutionSwitcher();
            if (this.currentResolution) {
                this.player.currentResolution(this.currentResolution.label);
            }
            return currentIndex;
        },
        resolutionChange() {
            this.currentResolution = this.player.currentResolution();
        },
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    },
};

module.exports = component;