import { Extension, ProsemirrorPlugin } from '@remirror/core';
import { NODE_CURSOR_DEFAULTS } from '../../constants';
import { CompositionExtensionOptions } from '../types';
import { createCompositionPlugin } from './plugin';

/**
 * This allow composition events to delete inline nodes using gboard on Android devices.
 */
export class CompositionExtension extends Extension<CompositionExtensionOptions> {
  get name() {
    return 'composition' as const;
  }

  get defaultOptions() {
    return {
      ensureNodeDeletion: NODE_CURSOR_DEFAULTS,
    };
  }

  public plugin(): ProsemirrorPlugin {
    return createCompositionPlugin(this);
  }
}
