import * as SUT from '../../app/assets/javascripts/statusObserver'
import * as dataLayerUpdater from '../../app/assets/javascripts/updateDatalayer'

describe("The status observer", function() {
    var isObserved = false;
    global.MutationObserver = class {
        constructor(callback) {}
        disconnect() {}
        observe(element, initObject) {isObserved = true;}
    };

    let updateDataLayerMock;

    beforeEach(() => {
        updateDataLayerMock = jest.spyOn(
            dataLayerUpdater,
            'updateDataLayer'
        ).mockImplementation(jest.fn());
    });

    afterEach(() => {
        updateDataLayerMock.mockRestore();
    });

  xit("will execute callback method", () => {
		SUT.observeStatus("test","test","test");

        expect(updateDataLayerMock).toHaveBeenCalled();
    });
    
    it('will observe the element', () => {
		SUT.observeStatus("test","test","test");

        expect(isObserved).toBe(true);
    });
});