window.isCUI = false;

var chatListener = {
    downTimeoutDuration: 15000,
    engagementTimeoutDuration: 10000,
    loadingTextSelector: '#webchat-loading-text',
    messagingContainerSelector: '#webchat-messaging-container',
    nuanceDownTimeout: null,
    engageTimeout: null,

    //In console
    onPageLanding: function(evt) {
        console.log("On Page Landing: data=", evt.data, "page=", evt.page, "reinitialized=", evt.reinitialized);
    },
    //In console
    onRuleSatisfied: function(evt) {
        console.log("On Rule Satisfied:", evt);
    },
    //In console
    onExposureQualified: function(evt) {
        console.log("On Exposure Qualified:", evt);
    },
    //Not seen in console
    chatRequestQ: function(evt) {
        console.log("chatRequestQ:", evt);
    },
    //In console
    onServiceInvitation: function(evt) {
        console.log("onServiceInvitation:", evt);
    },
    //In console
    onServiceMissed: function(evt) {
        console.log("onServiceMissed:", evt);
    },
    //In console
    onChatLaunched: function(evt) {
        console.log("Chat Launched: chatID=" +evt.chatID+
            ",customerID=" +evt.customerID + " Chat Type: " + evt.chatType + " Biz Rule Name: " + evt.bizRuleName + " Event Type: " + evt.evtType);

        // Wait for Nuance div to settle. We should get a "shown" event,
        // but if not, then show anyway but later.
        var self = this;
        setTimeout(function() {
            self.chatHasEngaged();
        }, 2000);
    },
    //In console
    onChatShown: function(evt) {
        console.log("Chat shown:", evt);
        this.chatHasEngaged();
    },
    //In console
    onChatEvent: function(evt) {
        console.log("Chat event:", evt);
    },
    //In console
    onBeforeChatClosed: function(evt) {
        console.log("onBeforeChatClosed:", evt);
    },
    //In console
    onAgentMsg: function(evt) {
        console.log("onAgentMsg:", evt);
    },
    //In console
    onCustomerMsg: function(evt) {
        console.log("onCustomerMsg:", evt);
    },
    //In console
    onChatClosed: function(evt){
        console.log("Chat Closed: chatID=" +evt.chatID+ ", chatType="+evt.chatType+ ", evtType=" +evt.evtType + " Biz Rule Name: " + evt.bizRuleName + ",customerID=" +evt.customerID);
    },
    //In console
    onC2CStateChanged: function(evt) {
        console.log("C2C State Changed - rule= "+evt.bizRuleName+", oldstate: " + evt.oldState + ", newstate: "+evt.newState + ",customerID=" +evt.customerID);
    },
    //Not seen in console
    onC2CDisplayed: function(evt) {
        console.log("C2C Displayed - rule= ", evt);
    },
    //In console
    onC2CDisplayed: function(evt) {
        console.log("C2C Displayed: Business Rule Name: " + evt.bizRuleName + " Customer ID: " + evt.customerID );
    },
    //In console
    onC2CClicked: function(evt) {
        console.log("C2C Clicked: Business Rule Name: " + evt.bizRuleName + " Customer ID: " + evt.customerID );
    },
    //Not seen in console
    onChatEngagedEvent: function(evt) {
        console.log("Chat Engaged: chatID=" +evt.chatID+ ", chatType="+evt.chatType+ ", evtType=" +evt.evtType + " Biz Rule Name: " + evt.bizRuleName + ",customerID=" +evt.customerID);
    },
    //In console
    onAnyEvent: function(evt) {
        console.log("Chat any event:", evt);
        if (this.nuanceDownTimeout) {
            clearTimeout(this.nuanceDownTimeout);
            this.nuanceDownTimeout = null;
            this.waitForEngagement();
        }
    },
    waitForEngagement: function() {
        var self = this;
        this.engageTimeout = setTimeout(function() {
            console.log("Chat did not start...");
            self.technicalError();
        }, this.engagementTimeoutDuration);
    },
    chatHasEngaged: function() {
        if (this.engageTimeout) {
            console.log("Chat has engaged...");
            clearTimeout(this.engageTimeout);
            this.engageTimeout = null;
        }
        $('.cui-technical-error').hide();   // If we showed the technical error, clear it.
        this.showNuanceDiv();
    },
    showNuanceDiv: function() {
        var loadingText = $(this.loadingTextSelector)
        var messagingContainer = $(this.messagingContainerSelector)
        console.log("show Nuance Div text...");
        messagingContainer.fadeTo(2000, 1.0);
        loadingText.fadeTo(1500, 0.0);
    },
    showloadingText: function() {
        var loadingText = $(this.loadingTextSelector);
        var messagingContainer = $(this.messagingContainerSelector);
        console.log("show loading text...");
        messagingContainer.fadeTo(0, 0.0);
        loadingText.show();
    },

    technicalError: function() {
        console.log("technicalError");
        this.showNuanceDiv();
        var newDiv = $("<p>", {"class": "cui-technical-error error-message"})
        newDiv.text('There’s a problem with chat. Try again later.')
        $('#nuanMessagingFrame').append(newDiv);
    },
    waitForSignsOfLife: function() {
        var self = this;
        this.nuanceDownTimeout = setTimeout(function() {
            console.log("Nuance is down...");
            self.technicalError();
        }, this.downTimeoutDuration);
    },
    startup: function() {
        localStorage.enableJSLogging = true;
        var self = this;
        console.log("chatListener start...");
        $(window).on("load", function() {
            self.showloadingText();
            console.log("chatListener onLoad");
            self.waitForSignsOfLife();
        });
    }
};

var InqRegistry = {
    listeners: [chatListener]
};

chatListener.startup();

