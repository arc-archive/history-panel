/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import '../../@polymer/polymer/lib/utils/render-status.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/iron-icon/iron-icon.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
import '../../@polymer/paper-menu-button/paper-menu-button.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@polymer/paper-listbox/paper-listbox.js';
import '../../@polymer/paper-item/paper-icon-item.js';
import '../../@polymer/paper-progress/paper-progress.js';
import '../../@polymer/paper-toast/paper-toast.js';
import '../../@polymer/paper-dialog/paper-dialog.js';
import '../../@advanced-rest-client/bottom-sheet/bottom-sheet.js';
import '../../@advanced-rest-client/saved-request-detail/saved-request-detail.js';
import '../../@advanced-rest-client/saved-request-editor/saved-request-editor.js';
import {RequestsListMixin} from '../../@advanced-rest-client/requests-list-mixin/requests-list-mixin.js';
import '../../@polymer/paper-fab/paper-fab.js';
import '../../@polymer/paper-input/paper-input.js';
import {HistoryListMixin} from '../../@advanced-rest-client/history-list-mixin/history-list-mixin.js';
import '../../@advanced-rest-client/export-options/export-options.js';
import './history-panel-list.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * History panel screen for Advanced REST Client.
 *
 * ### Styling
 * `<history-panel>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--history-panel` | Mixin applied to the element | `{}`
 * `--arc-font-headline` | Mixin applied to the header | `{}`
 * `--arc-font-subhead` | Mixin applied to the subheader | `{}`
 * `--history-panel-loader` | Mixin applied to the loader element | `{}`
 * `--history-panel-list` | Mixin apllied to the list element | `{}`
 * `--history-panel-toast-revert-button` | Mixin appllied to the rever button | `{}`
 * `--warning-primary-color` | Main color of the warning messages | `#FF7043`
 * `--warning-contrast-color` | Contrast color for the warning color | `#fff`
 * `--error-toast` | Mixin applied to the error toast | `{}`
 * `--empty-info` | Mixin applied to the label rendered when no data is available. | `{}`
 * `--history-panel-fab-background-color` | Bg color of fab button | `--primary-color`
 * `--history-panel-bottom-sheet` | Mixin apllied to the `<bottom-sheet>` elements | `{}`
 * `--context-menu-item-color` | Color of the dropdown menu items | ``
 * `--context-menu-item-background-color` | Background olor of the dropdown menu items | ``
 * `--context-menu-item-color-hover` | Color of the dropdown menu items when hovering | ``
 * `--context-menu-item-background-color-hover` | Background olor of the dropdown menu items when hovering | ``
 * `--bottom-sheet-width` | Width of the `<bottom-sheet>` element | `100%`
 * `--bottom-sheet-max-width` | Max width of the `<bottom-sheet>` element | `700px`
 * `--history-panel-bottom-sheet-right` | Right position of the `<bottom-sheet>` element | `40px`
 * `--history-panel-bottom-sheet-left` | Left position of the `<bottom-sheet>` element | `auto`
 *
 * @polymer
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 * @demo demo/dnd.html Drag and drop
 * @appliesMixin RequestsListMixin
 * @appliesMixin HistoryListMixin
 */
class HistoryPanel extends HistoryListMixin(RequestsListMixin(PolymerElement)) {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      position: relative;
      font-size: var(--arc-font-body1-font-size);
      font-weight: var(--arc-font-body1-font-weight);
      line-height: var(--arc-font-body1-line-height);
      display: flex;
      flex-direction: column;
    }

    [hidden] {
      display: none !important;
    }

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    h2 {
      font-size: var(--arc-font-headline-font-size);
      font-weight: var(--arc-font-headline-font-weight);
      letter-spacing: var(--arc-font-headline-letter-spacing);
      line-height: var(--arc-font-headline-line-height);
      flex: 1;
      flex-basis: 0.000000001px;
    }

    h3 {
      font-size: var(--arc-font-subhead-font-size);
      font-weight: var(--arc-font-subhead-font-weight);
      line-height: var(--arc-font-subhead-line-height);
    }

    .menu-item iron-icon {
      color: var(--context-menu-item-color);
    }

    .menu-item {
      color: var(--context-menu-item-color);
      background-color: var(--context-menu-item-background-color);
      cursor: pointer;
    }

    .menu-item:hover {
      color: var(--context-menu-item-color-hover);
      background-color: var(--context-menu-item-background-color-hover);
    }

    .menu-item:hover iron-icon {
      color: var(--context-menu-item-color-hover);
    }

    paper-progress {
      width: 100%;
    }

    history-panel-list {
      overflow: auto;
    }

    .revert-button {
      height: 38px;
    }

    #dataClearDialog {
      background-color: var(--warning-primary-color, #FF7043);
      color: var(--warning-contrast-color, #fff);
    }

    #dataClearDialog paper-button {
      color: var(--warning-dialog-button-color, #fff);
      background-color: var(--warning-dialog-button-background-color, transparent);
    }

    .error-toast {
      background-color: var(--warning-primary-color, #FF7043);
      color: var(--warning-contrast-color, #fff);
    }

    .empty-info {
      font-size: var(--empty-info-font-size, 16px);
      color: var(--empty-info-color, rgba(0, 0, 0, 0.74));
    }

    #requestDetailsContainer,
    #requestEditorContainer,
    #exportOptionsContainer {
      width: var(--bottom-sheet-width, 100%);
      max-width: var(--bottom-sheet-max-width, 700px);
      right: var(--history-panel-bottom-sheet-right, 40px);
      left: var(--history-panel-bottom-sheet-left, auto);
    }

    #requestDetailsContainer paper-fab {
      position: absolute;
      right: 16px;
      top: -28px;
      --paper-fab-background: var(--history-panel-fab-background-color, var(--primary-color));
    }

    .selection-options {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 56px;
    }

    .spacer {
      flex: 1;
      flex-basis: 0.000000001px;
    }
    </style>
    <div class="header">
      <h2>History</h2>
      <div class="header-actions">
        <paper-menu-button dynamic-align="" id="mainMenu">
          <paper-icon-button icon="arc:more-vert" slot="dropdown-trigger"></paper-icon-button>
          <paper-listbox slot="dropdown-content" id="mainMenuOptions">
            <paper-icon-item class="menu-item" on-click="openExportAll">
              <iron-icon icon="arc:export-variant" slot="item-icon"></iron-icon>Export all
            </paper-icon-item>
            <paper-icon-item class="menu-item" on-click="_deleteAllClick">
              <iron-icon icon="arc:delete" slot="item-icon"></iron-icon>Delete all
            </paper-icon-item>
          </paper-listbox>
        </paper-menu-button>
      </div>
    </div>
    <template is="dom-if" if="[[querying]]">
      <paper-progress indeterminate=""></paper-progress>
    </template>
    <template is="dom-if" if="[[dataUnavailable]]">
      <p class="empty-info">The requests list is empty.</p>
      <p class="empty-info">Send a request from the request panel and it will appear here.</p>
    </template>

    <section class="selection-options" hidden\$="[[listHidden]]">
      <p class="selection-label">Selected: [[selectedItems.length]]</p>
      <template is="dom-if" if="[[hasSelection]]">
        <paper-menu-button dynamic-align="" id="historyListMenu">
          <paper-icon-button icon="arc:more-vert" slot="dropdown-trigger"></paper-icon-button>
          <paper-listbox slot="dropdown-content" id="historyListMenuOptions">
            <paper-icon-item class="menu-item" on-click="_onExportSelected">
              <iron-icon icon="arc:export-variant" slot="item-icon"></iron-icon>Export selected
            </paper-icon-item>
            <paper-icon-item class="menu-item" data-action="delete-all" on-click="_deleteSelected">
              <iron-icon icon="arc:delete" slot="item-icon"></iron-icon>
              Delete selected
            </paper-icon-item>
          </paper-listbox>
        </paper-menu-button>
      </template>
      <div class="spacer"></div>
      <paper-input label="search" type="search" no-label-float=""></paper-input>
    </section>

    <history-panel-list
      hidden\$="[[listHidden]]"
      requests="[[requests]]"
      draggable-enabled="[[draggableEnabled]]"
      list-type\$="[[listType]]"
      has-two-lines="[[_hasTwoLines]]"
      selected-items="{{selectedItems}}"
      on-list-items-threshold="loadNext"
      on-list-item-details="_onDetails"></history-panel-list>

    <bottom-sheet id="requestDetailsContainer" on-iron-overlay-opened="_resizeSheetContent" opened="{{detailsOpened}}">
      <paper-fab
        icon="arc:keyboard-arrow-right"
        data-action="load-request-detail"
        title="Load request"
        on-click="_loadRequestDetails"></paper-fab>
      <saved-request-detail
        id="requestDetails"
        is-history=""
        on-delete-request="_deleteRequestDetails"
        on-edit-request="_editRequestDetails"></saved-request-detail>
    </bottom-sheet>
    <bottom-sheet id="requestEditorContainer" on-iron-overlay-opened="_resizeSheetContent" opened="{{editorOpened}}">
      <h3>Save history request</h3>
      <saved-request-editor
        id="requestEditor"
        is-history=""
        no-auto-projects="[[noAutoProjects]]"
        on-cancel-request-edit="_cancelRequestEdit"
        on-save-request="_saveRequestEdit"></saved-request-editor>
    </bottom-sheet>

    <bottom-sheet id="exportOptionsContainer"
      opened="{{_exportOptionsOpened}}"
      on-iron-overlay-opened="_resizeSheetContent">
      <export-options f
        ile="{{_exportOptions.file}}"
        provider="{{_exportOptions.provider}}"
        provider-options="{{_exportOptions.providerOptions}}"
        on-accept="_acceptExportOptions"
        on-cancel="_cancelExportOptions"></export-options>
    </bottom-sheet>

    <paper-toast id="noModel" class="error-toast" text="Model not found. Please, report an issue."></paper-toast>
    <paper-toast id="errorToast" class="error-toast" duration="5000"></paper-toast>
    <paper-toast id="revertError" class="error-toast"
      text="Unable to revert changes. Please, report an issue."></paper-toast>
    <paper-toast id="noExport" class="error-toast"
      text="Export module not found. Please, report an issue."></paper-toast>
    <paper-toast id="dataClearErrorToast" class="error-toast"
      text="Datasore delete error. Please report an issue"></paper-toast>
    <paper-toast id="driveSaved" text="Requests saved on Google Drive."></paper-toast>
    <paper-toast id="deleteToast" duration="7000">
      <paper-button class="revert-button" on-tap="revertDeleted">Revert</paper-button>
    </paper-toast>

    <paper-dialog id="dataClearDialog" on-iron-overlay-closed="_onClearDialogResult">
      <h2>Danger zone</h2>
      <p>This will remove all data from the data store. Without option to restore it.</p>
      <p>Maybe you should create a backup first?</p>
      <div class="buttons">
        <paper-button on-click="_exportAllFile">Create backup file</paper-button>
        <paper-button dialog-dismiss="" autofocus="">Cancel</paper-button>
        <paper-button dialog-confirm="" class="action-button">Destroy</paper-button>
      </div>
    </paper-dialog>`;
  }

  static get properties() {
    return {
      /**
       * List of requests that has been recently removed
       */
      _latestDeleted: Array,
      /**
       * Computed value, true if the requests lists is hidden.
       */
      listHidden: {
        type: Boolean,
        value: true,
        computed: '_computeListHidden(hasRequests, isSearch)'
      },

      /**
       * Selected items list.
       * @type {Array<Object>}
       */
      selectedItems: Array,
      /**
       * Computed value, true when the user made a selection on the list.
       */
      hasSelection: {type: Boolean, computed: '_computeHasSelection(selectedItems.length)'},
      /**
       * When true the editor panel is rendered
       */
      editorOpened: Boolean,
      /**
       * When true the details panel is rendered
       */
      detailsOpened: Boolean,
      /**
       * Passed to the request editor
       */
      noAutoProjects: Boolean,
      /**
       * Enables the comonent to accept drop action with a request.
       */
      draggableEnabled: {type: Boolean},
      /**
       * Indicates that the export options panel is currently rendered.
       */
      _exportOptionsOpened: Boolean,
      _exportOptions: {
        type: Object,
        value: function() {
          return {
            file: this._generateFileName(),
            provider: 'file',
            providerOptions: {
              parents: ['My Drive']
            }
          };
        }
      }
    };
  }

  constructor() {
    super();
    this._navigateHandler = this._navigateHandler.bind(this);
    this._searchHandler = this._searchHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.type = 'history';
    this.addEventListener('navigate', this._navigateHandler);
    const input = this.shadowRoot.querySelector('paper-input[type="search"]');
    input.inputElement.addEventListener('search', this._searchHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const input = this.shadowRoot.querySelector('paper-input[type="search"]');
    input.inputElement.removeEventListener('search', this._searchHandler);
    this.removeEventListener('navigate', this._navigateHandler);
  }

  /**
   * Notifies the list that the resize event occurred.
   * Should be called whhen content of the list changed but the list wasn't
   * visible at the time.
   */
  notifyResize() {
    const list = this.shadowRoot.querySelector('history-panel-list');
    list.notifyResize();
  }
  /**
   * Computes value of the `listHidden` property.
   * List is hidden when no requests are found and it is not searching.
   * @param {Boolean} hasRequests
   * @param {Boolean} isSearch
   * @return {Boolean}
   */
  _computeListHidden(hasRequests, isSearch) {
    if (isSearch) {
      return false;
    }
    return !hasRequests;
  }
  /**
   * Handler for navigate action from the list
   */
  _navigateHandler() {
    if (this.detailsOpened) {
      this.detailsOpened = false;
    }
  }
  /**
   * Handles items delete event from item click.
   * @return {Promise}
   */
  _deleteSelected() {
    this._closeSelectionMenu();
    const data = this.selectedItems;
    if (!data.length) {
      return;
    }
    return this._delete(data);
  }
  /**
   * Deletes a request from the details panel.
   * @return {Promise}
   */
  _deleteRequestDetails() {
    const data = [this.$.requestDetails.request];
    this.detailsOpened = false;
    return this._delete(data);
  }
  /**
   * Performs a delete action of request items.
   *
   * @param {Array<Object>} deleted List of deleted items.
   * @return {[type]} [description]
   */
  _delete(deleted) {
    const e = this._dispatchDelete(deleted);
    if (!e.defaultPrevented) {
      this.$.noModel.opened = true;
      return Promise.reject(new Error('Model not found'));
    }
    return e.detail.result
    .then((updated) => {
      return Object.keys(updated)
      .map((id) => {
        return {
          _id: id,
          _rev: updated[id]
        };
      });
    })
    .then((deleted) => {
      this._latestDeleted = deleted;
      let msg;
      if (deleted.length === 1) {
        msg = 'The request has been removed.';
      } else {
        msg = deleted.length + ' requests has been removed.';
      }
      this.$.deleteToast.text = msg;
      this.$.deleteToast.opened = true;
    });
  }
  /**
   * Dispatches `request-objects-deleted` event.
   * @param {Array<Object>} deleted List of requests to delete.
   * @return {CustomEvent}
   */
  _dispatchDelete(deleted) {
    const e = new CustomEvent('request-objects-deleted', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        type: this.type,
        items: deleted.map((item) => item._id)
      }
    });
    this.dispatchEvent(e);
    return e;
  }
  /**
   * Restores removed requests.
   * It does nothing if `_latestDeleted` is not set or empty.
   *
   * @return {Promise} A promise resolved when objects were restored
   */
  revertDeleted() {
    this.$.deleteToast.opened = false;
    const deleted = this._latestDeleted;
    if (!deleted || !deleted.length) {
      return Promise.resolve();
    }
    const e = this._dispatchUndelete(deleted);
    if (!e.defaultPrevented) {
      this.$.noModel.opened = true;
      return Promise.reject(new Error('Model not found'));
    }
    return e.detail.result
    .catch((cause) => {
      this.$.revertError.opened = true;
      this._handleError(cause);
    });
  }
  /**
   * Dispatches `request-objects-undeleted` event.
   * @param {Array<Object>} items List of deleted requests. The list
   * contains objects with `_id` and `_rev` properties.
   * @return {CustomEvent}
   */
  _dispatchUndelete(items) {
    const e = new CustomEvent('request-objects-undeleted', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        type: this.type,
        items
      }
    });
    this.dispatchEvent(e);
    return e;
  }
  /**
   * Forces selection menu to close.
   */
  _closeSelectionMenu() {
    const menu = this.shadowRoot.querySelector('#historyListMenu');
    if (!menu) {
      console.warn('Menu not found in the DOM');
      return;
    }
    menu.opened = false;
    const options = this.shadowRoot.querySelector('#historyListMenuOptions');
    options.selected = -1;
  }
  /**
   * Forces main menu to close.
   */
  _closeMainMenu() {
    this.$.mainMenu.opened = false;
    this.$.mainMenuOptions.selected = -1;
  }
  /**
   * Toggles export options panel and sets export items to all currently loaded requests.
   */
  openExportAll() {
    this._closeMainMenu();
    this._exportOptionsOpened = true;
    this._exportItems = true;
  }

  _cancelExportOptions() {
    this._exportOptionsOpened = false;
    this._exportItems = undefined;
  }
  /**
   * Creates export file for all items.
   * @return {Promise} Result of calling `_doExportItems()`
   */
  _exportAllFile() {
    const detail = {
      options: {
        file: this._generateFileName(),
        kind: 'ARC#HistoryExport',
        provider: 'file'
      }
    };
    return this._doExportItems(true, detail);
  }
  /**
   * Handler for `accept` event dispatched by export options element.
   * @param {CustomEvent} e
   * @return {Promise} Result of calling `_doExportItems()`
   */
  _acceptExportOptions(e) {
    this._exportOptionsOpened = false;
    const detail = e.detail;
    return this._doExportItems(this._exportItems, detail);
  }

  /**
   * Calls `_dispatchExportData()` from requests lists mixin with
   * prepared arguments
   *
   * @param {Array<Object>} requests List of request to export with the project.
   * @param {String} detail Export configuration
   * @return {Promise}
   */
  _doExportItems(requests, detail) {
    detail.options.kind = 'ARC#HistoryExport';
    const request = this._dispatchExportData(requests, detail);
    return request.detail.result
    .then(() => {
      if (detail.options.provider === 'drive') {
        // TODO: Render link to the folder
        this.$.driveSaved.opened = true;
      }
      this._exportItems = undefined;
    })
    .catch((cause) => {
      this.$.errorToast.text = cause.message;
      this.$.errorToast.opened = true;
      console.warn(cause);
    });
  }

  _onExportSelected() {
    this._closeSelectionMenu();
    this._exportOptionsOpened = true;
    this._exportItems = this.selectedItems || [];
  }
  /**
   * Opens the request details applet with the request.
   * @param {CustomEvent} e
   */
  _onDetails(e) {
    this.$.requestDetails.request = e.detail.request;
    this.detailsOpened = true;
  }
  /**
   * Fires `navigate` event for currently loaded in the details request.
   */
  _loadRequestDetails() {
    this._openRequest(this.$.requestDetails.request._id);
    this.detailsOpened = false;
  }
  /**
   * Handler for the `search` event on the search input.
   * Calls `query()` with input's value as argument.
   * @param {Event} e
   */
  _searchHandler(e) {
    const {value} = e.target;
    this.query(value);
  }
  /**
   * Handler for delete all menu option click.
   */
  _deleteAllClick() {
    this.$.mainMenu.opened = false;
    this.$.mainMenuOptions.selected = -1;
    this.$.dataClearDialog.opened = true;
  }
  /**
   * Called when delete datastore dialog is closed.
   * @param {CustomEvent} e
   */
  _onClearDialogResult(e) {
    if (!e.detail.confirmed) {
      return;
    }
    this._clearDatastore();
  }
  /**
   * Removes all data from the datastore and then fires
   */
  _clearDatastore() {
    const e = this._dispatchDeleteModel();
    if (!e.detail.result) {
      this.$.dataClearErrorToast.opened = true;
      this._handleError(new Error('Model not found.'));
      return;
    }
    Promise.all(e.detail.result)
    .catch((cause) => {
      this.$.dataClearErrorToast.opened = true;
      this._handleError(cause);
    });
  }
  /**
   * Dispatches `destroy-model` with `saved` on the models list.
   * @return {CustomEvent}
   */
  _dispatchDeleteModel() {
    const e = new CustomEvent('destroy-model', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        models: ['history']
      }
    });
    this.dispatchEvent(e);
    return e;
  }
  /**
   * Opens request details editor in place of the request details applet.
   */
  _editRequestDetails() {
    const request = Object.assign({}, this.$.requestDetails.request);
    this._resetHistoryObject(request);
    this.$.requestEditor.request = request;
    this.$.requestDetails.request = undefined;
    this.detailsOpened = false;
    this.editorOpened = true;
  }
  /**
   * Resizes `bottom-sheet` content by calling `notifyResize()` on each content panel.
   * @param {CustomEvent} e
   */
  _resizeSheetContent(e) {
    const panel = e.target.querySelector(
        'saved-request-editor,saved-request-detail,export-options');
    if (panel && panel.notifyResize) {
      panel.notifyResize();
    }
  }

  _cancelRequestEdit() {
    this.editorOpened = false;
  }
  /**
   * Handler fro save request event from the editor.
   */
  _saveRequestEdit() {
    this.editorOpened = false;
    this.$.requestEditor.request = undefined;
  }
  /**
   * Checks if selection has items.
   * @param {Number} length Current size of selection
   * @return {Boolean} True if there is a selection.
   */
  _computeHasSelection(length) {
    return !!length;
  }
  /**
   * Updates icon size CSS variable and notifies resize on the list when
   * list type changes.
   * @param {?String} type
   */
  _updateListStyles(type) {
    let size;
    switch (type) {
      case 'comfortable': size = 40; break;
      case 'compact': size = 36; break;
      default: size = 56; break;
    }
    const list = this.shadowRoot.querySelector('history-panel-list');
    this._applyListStyles(size, list);
  }
  /**
   * Generates file name for the export options panel.
   * @return {String}
   */
  _generateFileName() {
    return 'arc-history-export.json';
  }
  /**
   * Fired when navigation was requested
   *
   * @event navigate
   * @param {String} base The base route. It's always `request`
   * @param {String} type Type of the request to open. It's always `history`
   * @param {String} id ID of the request to open.
   */
  /**
   * Fired when requests are to be deleted. Informs the model to delete items.
   *
   * @event request-objects-deleted
   * @param {Array} items List of ids to delete
   * @param {String} type Always `history-requests`
   */
  /**
   * Fired when the "revert" delete button has been used.
   * Informs the requests model to restore the data.
   *
   * @event request-objects-undeleted
   * @param {Array} items List of requests to delete
   * @param {String} type Always `history-requests`
   */
  /**
   * Dispatched when the user requested to clear the data.
   * @event destroy-model
   * @param {Array<String>} models
   */
  /**
   * Dispatched to export history data to file / drive
   *
   * @event export-data
   * @param {String} type Depending on user selection it can be `history`
   * to export all history data or `items-export` to export specific items.
   * @param {String} destination Either `drive` or `file`
   * @param {String} file Export file name
   * @param {String} kind For selection export, data kind.
   * @param {Object} items For selection export, data to export.
   */
}
window.customElements.define('history-panel', HistoryPanel);