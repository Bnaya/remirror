import { AnyExtension, getLazyArray, isRemirrorManager, RemirrorManager } from '@remirror/core';
import { corePreset } from '@remirror/preset-core';
import { reactPreset } from '@remirror/preset-react';

import type { CreateReactManagerOptions, ReactExtensionUnion } from './react-types';

/**
 * Create a React [[`RemirrorManager`]] with all the default react presets and
 * extensions.
 */
export function createReactManager<ExtensionUnion extends AnyExtension>(
  extensions:
    | ExtensionUnion[]
    | (() => ExtensionUnion[])
    | RemirrorManager<ReactExtensionUnion<ExtensionUnion>>,
  options: CreateReactManagerOptions = {},
): RemirrorManager<ReactExtensionUnion<ExtensionUnion>> {
  const { core, react, ...settings } = options;

  if (isRemirrorManager<ReactExtensionUnion<ExtensionUnion>>(extensions)) {
    // Cloning keeps the manager identical but ensures that everything is fresh
    // in case the previous instance had already been associated with an
    // `EditorView`.
    return extensions.clone();
  }

  return RemirrorManager.create(
    () => [...getLazyArray(extensions), ...reactPreset(react), ...corePreset(core)],
    settings,
  );
}
