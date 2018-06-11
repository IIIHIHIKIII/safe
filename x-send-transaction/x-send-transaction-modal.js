import XSendTransaction from './x-send-transaction.js';
import MixinModal from '../mixin-modal/mixin-modal.js';
import ValidationUtils from '/libraries/secure-utils/validation-utils/validation-utils.js';
import { dashToSpace } from '/libraries/nimiq-utils/parameter-encoding/parameter-encoding.js';

export default class XSendTransactionModal extends MixinModal(XSendTransaction) {
    allowsShow(address) {
        return !address || ValidationUtils.isValidAddress(dashToSpace(address));
    }

    /* mode: sender or recipient */
    onShow(address, mode, amount, message, freeze) {
        this.clear();

        this.$amountInput.maxDecimals = document.body.classList.contains('setting-show-all-decimals') ? 5 : 2;

        if (address && mode === 'sender') {
            this.sender = dashToSpace(address);
        }

        if (address && mode === 'recipient') {
            this.recipient = dashToSpace(address);
        }

        if (amount) {
            this.amount = amount;
        }

        if (message) {
            this.message = message;
        }

        if (freeze) {
            // todo implement
        }

        this.validateAllFields();
    }
}
