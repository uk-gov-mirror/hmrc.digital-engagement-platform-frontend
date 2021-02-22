import {chatListener, initChatListener} from '../../app/assets/javascripts/webchatListener.js'

var protoListener = Object.assign({}, chatListener)
protoListener.name = "protoListener";
let index = 0;

describe("Webchat listener", () => {
    describe("initialisation", () => {
        it("will create the InqRegistry", () => {
            initChatListener(window);
            expect(window.InqRegistry).toEqual({ listeners: [chatListener] })
        });
    });
    describe("chat listener", () => {
        let testListener;

        beforeEach(() => {
            testListener = Object.assign({}, protoListener)
            testListener.name = "test listener #" + index++;
            document.body.innerHTML = `
                <div id="webchat-messaging-container">
                    <div id="HMRC_Fixed_1"></div>
                </div>
                <div id="webchat-loading-text" style="display:none">
                    "Checking adviser availability" alt="Chat is loading">
                </div>
            `;
            jest.useFakeTimers();
            $.fx.off = true;
        });
        afterEach(() => {
            jest.clearAllTimers();
            $(window).off("load")
            $.fx.off = false;
        });

        it("will have basic properties", () => {
            expect(testListener.downTimeoutDuration).toBe(15*1000);
            expect(testListener.engagementTimeoutDuration).toBe(10*1000);
            expect(testListener.loadingTextSelector).toBe('#webchat-loading-text');
            expect(testListener.messagingContainerSelector).toBe('#webchat-messaging-container');
        });

        it("will do show the loading text on load after startup is called", () => {
            testListener.startup(window);
            $(window).trigger('load');

            let text = $('#webchat-loading-text')
            expect(text.length).toBe(1);
            expect(text.css("display")).toBe("block");
        });

        it("will not show an error if activity and then shown", () => {
            testListener.startup(window);
            $(window).trigger('load');

            testListener.onAnyEvent({});

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();

            let text = $('#webchat-loading-text')
            expect(text.length).toBe(1);
        });

        it("will show the Nuance div if activity and then shown", () => {

        });

        it("will not show an error if activity and then shown after timeout", () => {

        });

        it("will not show an error if activity and then shown after timeout", () => {

        });

        it("will not show an error if activity and then shown before any other event", () => {

        });
    });
});
