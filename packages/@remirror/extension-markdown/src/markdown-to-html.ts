/**
 * @packageDocumentation
 *
 * Provides the main method used to convert markdown to html.
 */

import marked from 'marked';

/**
 * Converts the provided markdown to HTML.
 */
export function markdownToHtml(markdown: string): string {
  return marked(markdown, { gfm: true, smartLists: true, xhtml: true });
}
