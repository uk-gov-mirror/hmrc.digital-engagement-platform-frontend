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

            let animation = $('#webchat-loading-text')
            expect(animation.length).toBe(1);
            expect(animation.css("display")).toBe("block");
        });

//        it("will do show an error if times out with no activity", () => {
//            testListener.startup(window);
//            $(window).trigger('load');
//            expect($('.cui-technical-error').length).toBe(0);
//
//            jest.runOnlyPendingTimers();
//            expect($('.cui-technical-error').length).toBe(1);
//        });

        it("will not show an error if activity and then shown", () => {
            testListener.startup(window);
            $(window).trigger('load');
            expect($('.webchat-technical-error').length).toBe(0);

            testListener.onAnyEvent({});

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();
            expect($('.webchat-technical-error').length).toBe(0);
        });

//        it("will show the Nuance div if activity and then shown", () => {
//            testListener.startup(window);
//            $(window).trigger('load');
//            expect($('#webchat-messaging-container').css("opacity")).toBe("0");
//
//            testListener.onAnyEvent({});
//
//            testListener.onChatLaunched({});
//            testListener.onAnyEvent({});
//
//            testListener.onChatShown({});
//            testListener.onAnyEvent({});
//
//            jest.runOnlyPendingTimers();
//            expect($('#webchat-messaging-container').css("opacity")).toBe("1");
//            expect($('.cui-technical-error').length).toBe(0);
//
//            // Make sure there are no lingering behaviours.
//            jest.runOnlyPendingTimers();
//            jest.runOnlyPendingTimers();
//            jest.runOnlyPendingTimers();
//            expect($('.cui-technical-error').length).toBe(0);
//        });

//        it("will show an error if activity and then not engaged or shown", () => {
//            testListener.startup(window);
//            $(window).trigger('load');
//            expect($('.cui-technical-error').length).toBe(0);
//
//            testListener.onAnyEvent({});
//
//            jest.runOnlyPendingTimers();
//            expect($('.cui-technical-error').length).toBe(1);
//        });

//        it("will not show an error if activity and then shown after timeout", () => {
//            testListener.startup(window);
//            $(window).trigger('load');
//            expect($('.cui-technical-error').length).toBe(0);
//
//            testListener.onAnyEvent({});
//
//            jest.runOnlyPendingTimers();
//
//            expect($('.cui-technical-error').length).toBe(1);
//            expect($('.cui-technical-error').css("display")).toBe("block");
//
//            testListener.onChatLaunched({});
//            testListener.onAnyEvent({});
//
//            testListener.onChatShown({});
//            testListener.onAnyEvent({});
//
//            expect($('.cui-technical-error').length).toBe(1);
//            expect($('.cui-technical-error').css("display")).toBe("none");
//
//            // Make sure there are no lingering behaviours.
//            jest.runOnlyPendingTimers();
//            jest.runOnlyPendingTimers();
//            jest.runOnlyPendingTimers();
//            expect($('.cui-technical-error').length).toBe(1);
//            expect($('.cui-technical-error').css("display")).toBe("none");
//
//        });

//        it("will not show an error if activity and then shown after timeout", () => {
//            testListener.startup(window);
//            $(window).trigger('load');
//            expect($('.cui-technical-error').length).toBe(0);
//
//            jest.runOnlyPendingTimers();
//
//            testListener.onAnyEvent({});
//
//            testListener.onChatLaunched({});
//            testListener.onAnyEvent({});
//
//            testListener.onChatShown({});
//            testListener.onAnyEvent({});
//
//            expect($('.cui-technical-error').length).toBe(1);
//            expect($('.cui-technical-error').css("display")).toBe("none");
//
//            // Make sure there are no lingering behaviours.
//            jest.runOnlyPendingTimers();
//            jest.runOnlyPendingTimers();
//            jest.runOnlyPendingTimers();
//            expect($('.cui-technical-error').length).toBe(1);
//            expect($('.cui-technical-error').css("display")).toBe("none");
//        });

//        it("will not show an error if activity and then shown before any other event", () => {
//            testListener.startup(window);
//            $(window).trigger('load');
//            expect($('.cui-technical-error').length).toBe(0);
//
//            testListener.onChatShown({});
//            testListener.onAnyEvent({});
//
//            jest.runOnlyPendingTimers();
//
//            expect($('.cui-technical-error').length).toBe(0);
//
//            // Make sure there are no lingering behaviours.
//            jest.runOnlyPendingTimers();
//            jest.runOnlyPendingTimers();
//            jest.runOnlyPendingTimers();
//            expect($('.cui-technical-error').length).toBe(0);
//        });
    });
});
