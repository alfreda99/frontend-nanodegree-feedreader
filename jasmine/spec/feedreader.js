/* feedreader.js
 *
 * This is the spec Jasmine file that test functionality of
 * Udacity Blog Feed Application.
 */
/* All of the tests are within the $() function, since some
 * of these tests require DOM elements. This ensures the tests
 * don't run until the DOM is ready.
 */
$(function() {
    /* This is the RSS Feeds test suite.  It includes tests
     * to ensure that the list of feeds are not empty and that the
     * names and URL's of the feed locations have data.
     */
    describe('RSS Feeds', function() {

        /* This test makes sure that the allFeeds variable has been
         * defined and that it is not empty.          */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds
         * object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are populated with data', function() {
            var feed;
            var isEmpty = false;
            var isNull = false;

            for (var i = 0; i < allFeeds.length; i++) {
                feed = allFeeds[i];
                //checks to see if Feed Url is undefined
                if (typeof feed.url === "undefined") {
                    isNull = true;
                    break;
                }
                //checks to see if Feed Url is empty
                else if (feed.url === "") {
                    isEmpty = true;
                    break;
                }
            }
            expect(isNull).toBe(false);
            expect(isEmpty).toBe(false);
        });


        /* This test loops through each feed in the allFeeds
         * object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are populated with data', function() {
            var feed;
            var isEmpty = false;
            var isNull = false;

            for (var i = 0; i < allFeeds.length; i++) {
                feed = allFeeds[i];
                //checks to see if Feed name is undefined
                if (typeof feed.name === "undefined") {
                    isNull = true;
                    break;
                }
                //checks to see if Feed name is empty
                else if (feed.name === "") {
                    isEmpty = true;
                    break;
                }
            }
            expect(isNull).toBe(false);
            expect(isEmpty).toBe(false);
        });
    });

    /* This is The menu test suite.  It includes tests
     * to ensure that the menu element is displayed as
     * expected.
     */
    describe('The menu', function() {
        var menuBody = $('body');

        /*
         * This test ensures the menu element is hidden by default.
         */
        it('is hidden by default', function() {
            var isHidden = false;

            if (menuBody.is(".menu-hidden"))
                isHidden = true;

            expect(isHidden).toBe(true);
        });

        /* This test ensures the menu changes visibility
         * when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu visibility toggles properly', function() {
            var menuIcon = $('.menu-icon-link');
            var isVisible = false;

            //click the first time, should make menu visible
            menuIcon.click();
            if (!menuBody.is(".menu-hidden"))
                isVisible = true;

            expect(isVisible).toBe(true);

            //2nd click should hide menu
            menuIcon.click();
            if (menuBody.is(".menu-hidden"))
                isVisible = false;

            expect(isVisible).toBe(false);
        });
    });


    /* This is the Initial Entries test suite.  It includes tests
     * to ensure that the initial RSS feed is loaded as expected.
     */
    describe('Initial Entries', function() {

        /* Since the feeds are loaded asyncronously, a call to load the
         * the feed is placed in the beforeEach to ensure the feed is
         * loaded before the tests are run
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensures that when the loadFeed function is
         * called and completes its work, that there is at least a
         * single .entry element within the .feed container
         */
        it('have been loaded', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* This is the New Feed Selection test suite.  It includes tests
     * to ensure that the content in the view changes when the new feed
     * is selected.
     */
    describe('New Feed Selection', function() {
        var firstFeed = "";
        var secondFeed = "";
        var isChanged = false;

        /* Since the feeds are loaded asyncronously, a call to load a
         * different feed is placed in the beforeEach to ensure the feed is
         * loaded before the tests are run
         */
        beforeEach(function(done) {
            firstFeed = $('.header-title').text();
            loadFeed(1, done);
        });

        /* This test ensures that the content in the
         * view changes when the new feed is selected.
         */
        it('changes content in view', function(done) {
            secondFeed = $('.header-title').text();
            if (firstFeed !== secondFeed)
                isChanged = true;
            expect(isChanged).toBe(true);
            done();
        });
    });

}());