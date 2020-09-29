import { GapCursorExtension } from '@remirror/extension-gap-cursor';

import { createCoreManager } from '../..';

test('it can exclude extensions', () => {
  const manager = createCoreManager([], { core: { excludeExtensions: ['gapCursor'] } });
  expect(() => manager.getExtension(GapCursorExtension)).toThrow();
});
