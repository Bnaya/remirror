import { extensionDecorator, PlainExtension, Static } from '@remirror/core';

import { htmlToMarkdown } from './html-to-markdown';
import { markdownToHtml } from './markdown-to-html';
import { sanitizeHtml } from './markdown-utils';

export interface MarkdownOptions {
  /**
   * Converts the provided html to a markdown string.
   *
   * By default this uses
   */
  htmlToMarkdown?: Static<(html: string) => string>;

  /**
   * Takes a markdown string and outputs html. It is up to you to make sure the
   * markdown is sanitized during this function call by providing the
   * `sanitizeHtml` method.
   */
  markdownToHtml?: Static<(markdown: string) => string>;

  /**
   * Provide a sanitizer to prevent XSS attacks.
   *
   * The default sanitizer has not been tested for security so it's recommended
   * that you provide your own html sanitizer here.
   * If you want to sanitize on the backend as well you will need to override
   * this method.
   */
  sanitizeHtml?: Static<(html: string) => string>;
}

/**
 * This extension adds support for markdown editors using remirror.
 *
 * TODO - when presets are removed automatically include all the supported
 * extensions.
 *
 * This extension adds the following to the `ManagerStore`.
 *
 * - `getMarkdown()` - extract the markdown representation from the editor.
 */
@extensionDecorator<MarkdownOptions>({
  defaultOptions: {
    htmlToMarkdown,
    markdownToHtml,
    sanitizeHtml,
  },
  staticKeys: ['markdownToHtml', 'htmlToMarkdown'],
})
export class MarkdownExtension extends PlainExtension<MarkdownOptions> {
  get name() {
    return 'markdown' as const;
  }
}

declare global {
  namespace Remirror {}
}
