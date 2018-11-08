/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   history-panel-list.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer/types/lib/utils/render-status.d.ts" />
/// <reference path="../paper-item/paper-icon-item.d.ts" />
/// <reference path="../paper-item/paper-item-body.d.ts" />
/// <reference path="../paper-ripple/paper-ripple.d.ts" />
/// <reference path="../requests-list-mixin/requests-list-styles.d.ts" />
/// <reference path="../iron-list/iron-list.d.ts" />
/// <reference path="../http-method-label/http-method-label.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../iron-scroll-threshold/iron-scroll-threshold.d.ts" />
/// <reference path="../paper-button/paper-button.d.ts" />
/// <reference path="../paper-checkbox/paper-checkbox.d.ts" />

declare namespace ApiElements {

  /**
   * `history-panel-list`
   *
   * ## Styling
   *
   * `<history-panel-list>` provides the following custom properties and mixins for styling:
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--history-panel-list` | Mixin applied to this elment | `{}`
   */
  class HistoryPanelList extends Polymer.Element {
    requests: any[]|null|undefined;

    /**
     * Changes information density of list items.
     * By default it uses material's peper item with two lines (72px heigth)
     * Possible values are:
     *
     * - `default` or empty - regular list view
     * - `comfortable` - enables MD single line list item vie (52px heigth)
     * - `compact` - enables list that has 40px heigth (touch recommended)
     */
    listType: string|null|undefined;

    /**
     * A list lower treshold when the `history-list-threshold` will be
     * fired. It should informa the app that the user nearly reached
     * the end of the list and new items should be loaded.
     */
    threshold: number|null|undefined;

    /**
     * Scroll target for `iron-scroll-threshold`.
     * This is set in connectedCallback as the DOM has to be initialized
     * before setting this property.
     */
    _scrollTarget: Element|null;

    /**
     * List of selected items on the list.
     */
    selectedItems: any[]|null|undefined;
    hasTwoLines: boolean|null|undefined;
    connectedCallback(): void;
    disconnectedCallback(): void;

    /**
     * Notifies the list that the resize event occurred.
     * Should be called whhen content of the list changed but the list wasn't
     * visible at the time.
     */
    notifyResize(): void;
    _updateListStyles(type: any): void;
    _thresholdHandler(e: any): void;
    _requestsChanged(record: any): void;
    _requestDetails(e: any): void;
    _navigateItem(e: any): void;
    _toggleSelection(e: any): void;
  }
}

interface HTMLElementTagNameMap {
  "history-panel-list": ApiElements.HistoryPanelList;
}
