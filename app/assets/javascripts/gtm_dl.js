import * as nuanceWatcher from './waitForChanges'
import * as chatListener from './cuiChatListener'
import * as webchatListener from './webchatListener'

if (!window.isCUI) {
    nuanceWatcher.waitForChanges(window, document);
    webchatListener.initChatListener(window)
} else {
    chatListener.initChatListener(window)
}
