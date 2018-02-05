const component = {
    props: ['show'],
    template: `
        <div :class="{'loading-pulser': true, 'loading-pulser--hidden': hidden, 'loading-pulser--hidden-opacity': hiddenOpacity }">
            <div class="loading-pulser__wrapper">
                <svg class="loading-pulser__element loading-pulser__outer-circle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="600px" height="600px" viewBox="0 0 600 600" enable-background="new 0 0 600 600" xml:space="preserve">
                    <linearGradient id="color-light-to-dark-1" gradientUnits="userSpaceOnUse" x1="21.0103" y1="301.6182" x2="578.4824" y2="301.6182">
                        <stop  offset="0" style="stop-color:#A17AED;stop-opacity:0.7"/>
                        <stop  offset="1" style="stop-color:#7D4DFE"/>
                        <a:midPointStop  offset="0" style="stop-color:#A17AED;stop-opacity:0.7"/>
                        <a:midPointStop  offset="0.5" style="stop-color:#A17AED;stop-opacity:0.7"/>
                        <a:midPointStop  offset="1" style="stop-color:#7D4DFE"/>
                    </linearGradient>
                    <path opacity="0.1" fill="url(#color-light-to-dark-1)" d="M578.482,301.619c0,153.941-124.792,278.735-278.737,278.735
                        c-153.94,0-278.735-124.794-278.735-278.735c0-153.938,124.795-278.737,278.735-278.737
                        C453.69,22.882,578.482,147.681,578.482,301.619z"/>
                </svg>
                <svg class="loading-pulser__element loading-pulser__middle-circle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="600px" height="600px" viewBox="0 0 600 600" enable-background="new 0 0 600 600" xml:space="preserve">  
                    <linearGradient id="color-light-to-dark-2" gradientUnits="userSpaceOnUse" x1="98.9536" y1="301.9492" x2="502.3525" y2="301.9492">
                        <stop  offset="0" style="stop-color:#A17AED;stop-opacity:0.7"/>
                        <stop  offset="1" style="stop-color:#7D4DFE"/>
                        <a:midPointStop  offset="0" style="stop-color:#A17AED;stop-opacity:0.7"/>
                        <a:midPointStop  offset="0.5" style="stop-color:#A17AED;stop-opacity:0.7"/>
                        <a:midPointStop  offset="1" style="stop-color:#7D4DFE"/>
                    </linearGradient>
                    <path opacity="0.3" fill="url(#color-light-to-dark-2)" d="M502.353,301.947c0,109.322-90.303,197.935-201.7,197.935
                        c-111.396,0-201.699-88.612-201.699-197.935c0-109.312,90.303-197.931,201.699-197.931
                        C412.05,104.017,502.353,192.635,502.353,301.947z"/>
                </svg>
                <svg class="loading-pulser__element loading-pulser__inner-circle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="600px" height="600px" viewBox="0 0 600 600" enable-background="new 0 0 600 600" xml:space="preserve">
                    <linearGradient id="color-light-to-dark-3" gradientUnits="userSpaceOnUse" x1="174.4541" y1="301.9287" x2="420.3408" y2="301.9287">
                        <stop  offset="0" style="stop-color:#A17AED;stop-opacity:0.7"/>
                        <stop  offset="1" style="stop-color:#7D4DFE"/>
                        <a:midPointStop  offset="0" style="stop-color:#A17AED;stop-opacity:0.7"/>
                        <a:midPointStop  offset="0.5" style="stop-color:#A17AED;stop-opacity:0.7"/>
                        <a:midPointStop  offset="1" style="stop-color:#7D4DFE"/>
                    </linearGradient>
                    <circle opacity="0.5" fill="url(#color-light-to-dark-3)" cx="297.397" cy="301.932" r="122.943"/>
                </svg>
                <svg class="loading-pulser__element loading-pulser__logo" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="600px" height="600px" viewBox="0 0 600 600" enable-background="new 0 0 600 600" xml:space="preserve">
                    <image overflow="visible" width="1000" height="1000" xlink:href="/src/images/logo/welkin-logo.png"  transform="matrix(0.096 0 0 0.096 251.3911 253.5962)"></image>
                </svg>
            </div>
        </div>
    `,
    data: function() {
        return {
            'hiddenOpacity': true,
            'hidden': true,
        }
    },
    watch: {
        'show': function(show) {
            if (show) {
                this.hidden = false;
                setTimeout(() => {
                    this.hiddenOpacity = false;
                }, 0);
            } else {
                this.hiddenOpacity = true;
                setTimeout(() => {
                    this.hidden = true;
                }, 500);
            }


        }
    }
};

module.exports = component;