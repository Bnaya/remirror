import type { ValueOf } from 'type-fest';

import { pick } from '@remirror/core-helpers';
import type { GetStaticAndDynamic } from '@remirror/core-types';

import { AttributesExtension } from './attributes-extension';
import { CommandsExtension } from './commands-extension';
import { HelpersExtension } from './helpers-extension';
import { HtmlExtension } from './html-extension';
import { InputRulesExtension, InputRulesOptions } from './input-rules-extension';
import { KeymapExtension, KeymapOptions } from './keymap-extension';
import { NodeViewsExtension } from './node-views-extension';
import { PasteRulesExtension } from './paste-rules-extension';
import {
  PersistentSelectionExtension,
  PersistentSelectionOptions,
} from './persistent-selection-extension';
import { PluginsExtension } from './plugins-extension';
import { SchemaExtension } from './schema-extension';
import { SuggestExtension, SuggestOptions } from './suggest-extension';
import { TagsExtension } from './tags-extension';

export interface BuiltinOptions
  extends SuggestOptions,
    KeymapOptions,
    PersistentSelectionOptions,
    InputRulesOptions {}

/**
 * Provides all the builtin extensions to the editor.
 *
 * @remarks
 *
 * This is used automatically and (at the time of writing) can't be removed from
 * the editor. If you feel that there's a compelling reason to override these
 * extensions feel free to create a [discussion
 * here](https://github.com/remirror/remirror/discussions/category_choices) and
 * it can be addressed.
 *
 * @builtin
 *
 * The order of these extension are important.
 *
 * - [[TagsExtension]] is places first because it provides tagging which is
 *   used by the schema extension.
 * - [[SchemeExtension]] goes next because it's super important to the editor
 *   functionality and needs to run before everything else which might depend
 *   on it.
 */
export function builtinPreset(options: GetStaticAndDynamic<BuiltinOptions> = {}): BuiltinPreset[] {
  const defaultOptions = {
    exitMarksOnArrowPress: KeymapExtension.defaultOptions.exitMarksOnArrowPress,
    excludeBaseKeymap: KeymapExtension.defaultOptions.excludeBaseKeymap,
    selectParentNodeOnEscape: KeymapExtension.defaultOptions.selectParentNodeOnEscape,
    undoInputRuleOnBackspace: KeymapExtension.defaultOptions.undoInputRuleOnBackspace,
    persistentSelectionClass: PersistentSelectionExtension.defaultOptions.persistentSelectionClass,
  };

  options = { ...defaultOptions, ...options };

  const keymapOptions = pick(options, [
    'excludeBaseKeymap',
    'selectParentNodeOnEscape',
    'undoInputRuleOnBackspace',
  ]);
  const persistentSelectionOptions = pick(options, ['persistentSelectionClass']);

  return [
    // The order of these extension is important. First come first served.
    new TagsExtension(),
    new SchemaExtension(),
    new AttributesExtension(),
    new HtmlExtension(),
    new PluginsExtension(),
    new InputRulesExtension(),
    new PasteRulesExtension(),
    new NodeViewsExtension(),
    new SuggestExtension(),
    new CommandsExtension(),
    new HelpersExtension(),
    new KeymapExtension(keymapOptions),
    new PersistentSelectionExtension(persistentSelectionOptions),
  ];
}

export type BuiltinPreset =
  | TagsExtension
  | SchemaExtension
  | AttributesExtension
  | HtmlExtension
  | PluginsExtension
  | InputRulesExtension
  | PasteRulesExtension
  | NodeViewsExtension
  | SuggestExtension
  | CommandsExtension
  | HelpersExtension
  | KeymapExtension
  | PersistentSelectionExtension;

declare global {
  namespace Remirror {
    interface ManagerSettings {
      /**
       * The options that can be passed into the built in options.
       */
      builtin?: GetStaticAndDynamic<BuiltinOptions>;
    }

    type Builtin =
      | TagsExtension
      | InputRulesExtension
      | SchemaExtension
      | AttributesExtension
      | PluginsExtension
      | PasteRulesExtension
      | NodeViewsExtension
      | SuggestExtension
      | CommandsExtension
      | HelpersExtension
      | KeymapExtension
      | PersistentSelectionExtension;

    type AllExtensionUnion = ValueOf<AllExtensions>;
  }
}
